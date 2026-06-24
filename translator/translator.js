/*
  translator.js
  -------------
  This is the translator engine. It reads:
    window.DEFAULT_VOCAB_TEXT from vocab.js
    window.ELEFEN_RULES from rules.js
*/

const inText = document.getElementById("inText");
const outText = document.getElementById("outText");
const btnTranslate = document.getElementById("btnTranslate");
const btnCopy = document.getElementById("btnCopy");
const btnClear = document.getElementById("btnClear");

const RULES = window.ELEFEN_RULES || {};
const DET_TRANSLATIONS = RULES.DET_TRANSLATIONS || {};
const SUBJECT_TRANSLATIONS = RULES.SUBJECT_TRANSLATIONS || {};
const YES_NO_AUX_MAP = RULES.YES_NO_AUX_MAP || {};
const NEGATION_CONTRACTIONS = RULES.NEGATION_CONTRACTIONS || {};
const NEGATION_AUX_MAP = RULES.NEGATION_AUX_MAP || {};

let dictionary = {};
let vocabTags = {};
let phraseList = [];

function tokenize(text) {
  return text.match(/[A-Za-z']+|\s+|[^A-Za-z'\s]+/g) || [];
}

function isWordToken(token) {
  return /^[A-Za-z']+$/.test(token);
}

function isSpaceToken(token) {
  return /^\s+$/.test(token);
}

function normalizeWord(word) {
  return word.toLowerCase().replace(/^'+|'+$/g, "");
}

function capitalizeFirst(text) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function isSentenceStart(tokens, index) {
  let j = index - 1;

  while (j >= 0 && isSpaceToken(tokens[j])) {
    j--;
  }

  if (j < 0) return true;
  return /[.!?]$/.test(tokens[j]);
}

function shouldCapitalize(tokens, index) {
  return isSentenceStart(tokens, index) && /^[A-Z]/.test(tokens[index] || "");
}

function maybeCapitalize(text, tokens, index) {
  return shouldCapitalize(tokens, index) ? capitalizeFirst(text) : text;
}

function parseVocab(text) {
  const dict = {};
  const tags = {};
  const lines = text.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) continue;
    if (line.startsWith("#")) continue;

    const match = line.match(/^(.+?)\s*(=|-|:|→)\s*(.+)$/);
    if (!match) continue;

    const english = match[1].trim().toLowerCase();

    let elefenAndTag = match[3].trim();
    let elefen = elefenAndTag;
    let tag = "";

    if (elefenAndTag.includes("|")) {
      const parts = elefenAndTag.split("|");
      elefen = parts[0].trim();
      tag = parts.slice(1).join("|").trim().toLowerCase();
    }

    if (!english || !elefen) continue;

    // Later duplicates intentionally overwrite earlier ones.
    dict[english] = elefen;

    if (tag) {
      tags[english] = tag;
    }
  }

  return { dict, tags };
}

function rebuildDictionary() {
  const parsed = parseVocab(window.DEFAULT_VOCAB_TEXT || "");

  dictionary = parsed.dict;
  vocabTags = parsed.tags;

  phraseList = Object.keys(dictionary)
    .map(key => ({
      english: key,
      elefen: dictionary[key],
      words: key.split(/\s+/).filter(Boolean)
    }))
    .sort((a, b) => b.words.length - a.words.length);
}

function getTag(word) {
  return vocabTags[normalizeWord(word)] || "";
}

function hasTag(word, wantedTag) {
  const tag = getTag(word);
  if (!tag) return false;
  return tag.split(/[,\s]+/).includes(wantedTag);
}

function translateWord(word) {
  const clean = normalizeWord(word);
  return dictionary[clean] || word;
}

function skipSpaces(tokens, index) {
  while (index < tokens.length && isSpaceToken(tokens[index])) {
    index++;
  }

  return index;
}

/*
  YES/NO QUESTION RULE

  English:
    Do you understand me?
    Did you eat?
    Can you help her?
    Are you happy?

  Elefen:
    Esce tu comprende me?
    Esce tu ia come?
    Esce tu pote aida el?
    Esce tu es felis?
*/
function tryYesNoQuestionRule(tokens, startIndex) {
  if (!isWordToken(tokens[startIndex])) return null;
  if (!isSentenceStart(tokens, startIndex)) return null;

  const aux = normalizeWord(tokens[startIndex]);
  if (!(aux in YES_NO_AUX_MAP)) return null;

  let subjectIndex = skipSpaces(tokens, startIndex + 1);

  if (subjectIndex >= tokens.length || !isWordToken(tokens[subjectIndex])) {
    return null;
  }

  let subjectWord = normalizeWord(tokens[subjectIndex]);
  let subject = SUBJECT_TRANSLATIONS[subjectWord];

  if (!subject) return null;

  let restStart = subjectIndex + 1;

  // Handle "you all"
  if (subjectWord === "you") {
    const possibleAllIndex = skipSpaces(tokens, subjectIndex + 1);

    if (
      possibleAllIndex < tokens.length &&
      isWordToken(tokens[possibleAllIndex]) &&
      normalizeWord(tokens[possibleAllIndex]) === "all"
    ) {
      subject = "vos";
      restStart = possibleAllIndex + 1;
    }
  }

  restStart = skipSpaces(tokens, restStart);

  let isNegative = false;

  if (
    restStart < tokens.length &&
    isWordToken(tokens[restStart]) &&
    normalizeWord(tokens[restStart]) === "not"
  ) {
    isNegative = true;
    restStart = skipSpaces(tokens, restStart + 1);
  }

  let sentenceEnd = restStart;

  while (
    sentenceEnd < tokens.length &&
    !/[.!?]/.test(tokens[sentenceEnd])
  ) {
    sentenceEnd++;
  }

  const restSource = tokens.slice(restStart, sentenceEnd).join("").trim();
  const translatedRest = restSource ? translateText(restSource, false).trim() : "";

  let marker = YES_NO_AUX_MAP[aux];

  if (isNegative) {
    marker = marker ? "no " + marker : "no";
  }

  const parts = ["Esce", subject];

  if (marker) parts.push(marker);
  if (translatedRest) parts.push(translatedRest);

  return {
    text: parts.join(" "),
    nextIndex: sentenceEnd
  };
}

/*
  NEGATION RULE

  English:
    is not, are not, was not, will not, would not,
    do not, does not, did not,
    can not, cannot, should not, must not.

  Elefen:
    no goes before the verb / tense marker.
*/
function tryNegationRule(tokens, startIndex) {
  if (!isWordToken(tokens[startIndex])) return null;

  const word = normalizeWord(tokens[startIndex]);

  const nextIndex = skipSpaces(tokens, startIndex + 1);
  const nextWord =
    nextIndex < tokens.length && isWordToken(tokens[nextIndex])
      ? normalizeWord(tokens[nextIndex])
      : "";

  if (NEGATION_CONTRACTIONS[word]) {
    return {
      text: maybeCapitalize(NEGATION_CONTRACTIONS[word], tokens, startIndex),
      nextIndex: startIndex + 1
    };
  }

  if (nextWord === "not" && NEGATION_AUX_MAP[word]) {
    return {
      text: maybeCapitalize(NEGATION_AUX_MAP[word], tokens, startIndex),
      nextIndex: nextIndex + 1
    };
  }

  return null;
}

function isDeterminer(word) {
  const clean = normalizeWord(word);
  return !!DET_TRANSLATIONS[clean] || hasTag(clean, "det");
}

function translateDeterminer(word) {
  const clean = normalizeWord(word);
  return DET_TRANSLATIONS[clean] || translateWord(word);
}

function tryMatchPhrase(tokens, startIndex, phrase, multiWordOnly = false) {
  if (multiWordOnly && phrase.words.length < 2) return null;

  let tokenIndex = startIndex;

  for (let wordIndex = 0; wordIndex < phrase.words.length; wordIndex++) {
    if (wordIndex > 0) {
      let sawSpace = false;

      while (tokenIndex < tokens.length && isSpaceToken(tokens[tokenIndex])) {
        sawSpace = true;
        tokenIndex++;
      }

      if (!sawSpace) return null;
    }

    if (tokenIndex >= tokens.length) return null;
    if (!isWordToken(tokens[tokenIndex])) return null;

    const currentWord = normalizeWord(tokens[tokenIndex]);
    const neededWord = phrase.words[wordIndex];

    if (currentWord !== neededWord) return null;

    tokenIndex++;
  }

  return {
    text: maybeCapitalize(phrase.elefen, tokens, startIndex),
    nextIndex: tokenIndex
  };
}

function tryAnyPhrase(tokens, startIndex, multiWordOnly = false) {
  for (const phrase of phraseList) {
    const matched = tryMatchPhrase(tokens, startIndex, phrase, multiWordOnly);
    if (matched) return matched;
  }

  return null;
}

/*
  ADJECTIVE + NOUN RULE

  English:
    my blue car
    your very old house

  Elefen:
    mea auto blu
    tua casa multe vea
*/
function tryAdjectiveNounRule(tokens, startIndex) {
  if (!isWordToken(tokens[startIndex])) return null;

  let i = startIndex;
  let determiner = "";
  let hasDeterminer = false;

  const firstWord = normalizeWord(tokens[i]);

  if (isDeterminer(firstWord)) {
    hasDeterminer = true;
    determiner = translateDeterminer(firstWord);

    i++;
    i = skipSpaces(tokens, i);
  }

  const modifiers = [];

  while (i < tokens.length && isWordToken(tokens[i])) {
    const current = normalizeWord(tokens[i]);

    if (hasTag(current, "adv")) {
      const advToken = tokens[i];
      let nextIndex = skipSpaces(tokens, i + 1);

      if (nextIndex < tokens.length && isWordToken(tokens[nextIndex])) {
        const nextWord = normalizeWord(tokens[nextIndex]);

        if (hasTag(nextWord, "adj")) {
          modifiers.push(translateWord(advToken) + " " + translateWord(tokens[nextIndex]));
          i = nextIndex + 1;
          i = skipSpaces(tokens, i);
          continue;
        }
      }
    }

    if (hasTag(current, "adj")) {
      modifiers.push(translateWord(tokens[i]));
      i++;
      i = skipSpaces(tokens, i);
      continue;
    }

    break;
  }

  if (i >= tokens.length || !isWordToken(tokens[i])) return null;

  const possibleNoun = normalizeWord(tokens[i]);
  if (!hasTag(possibleNoun, "noun")) return null;

  if (!hasDeterminer && modifiers.length === 0) return null;

  const noun = translateWord(tokens[i]);
  const parts = [];

  if (hasDeterminer) parts.push(determiner);
  parts.push(noun);

  for (const modifier of modifiers) {
    parts.push(modifier);
  }

  return {
    text: maybeCapitalize(parts.join(" "), tokens, startIndex),
    nextIndex: i + 1
  };
}

function translateText(source, allowQuestionRule = true) {
  let tokens = tokenize(source);
tokens = window.ELEFEN_RULES.resolveAcelThat(tokens);
  const output = [];

  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (!isWordToken(token)) {
      output.push(token);
      i++;
      continue;
    }

    /*
      Order matters:

      1. Yes/no question rule:
         "Do you understand me?" -> "Esce tu comprende me?"

      2. Negation rule:
         "are not" -> "no es"
         "did not" -> "no ia"

      3. Long phrase traps:
         "if you wanted to", "i think that", "you have to"

      4. Adjective+noun rule:
         "my blue car" -> "mea auto blu"

      5. Single word lookup.
    */

    const yesNoQuestion = allowQuestionRule
      ? tryYesNoQuestionRule(tokens, i)
      : null;

    if (yesNoQuestion) {
      output.push(yesNoQuestion.text);
      i = yesNoQuestion.nextIndex;
      continue;
    }

    const negationRule = tryNegationRule(tokens, i);

    if (negationRule) {
      output.push(negationRule.text);
      i = negationRule.nextIndex;
      continue;
    }

    const multiPhrase = tryAnyPhrase(tokens, i, true);

    if (multiPhrase) {
      output.push(multiPhrase.text);
      i = multiPhrase.nextIndex;
      continue;
    }

    const adjectiveNoun = tryAdjectiveNounRule(tokens, i);

    if (adjectiveNoun) {
      output.push(adjectiveNoun.text);
      i = adjectiveNoun.nextIndex;
      continue;
    }

    const singlePhrase = tryAnyPhrase(tokens, i, false);

    if (singlePhrase) {
      output.push(singlePhrase.text);
      i = singlePhrase.nextIndex;
      continue;
    }

    output.push(token);
    i++;
  }

  return output.join("");
}

function translateNow() {
  const source = inText.value || "";
  outText.value = translateText(source);
}

async function copyOutput() {
  const text = outText.value || "";
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    outText.focus();
    outText.select();
    document.execCommand("copy");
  }

  btnCopy.textContent = "COPIED!";

  setTimeout(() => {
    btnCopy.textContent = "COPY OUTPUT";
  }, 900);
}

function clearAll() {
  inText.value = "";
  outText.value = "";
  inText.focus();
}

rebuildDictionary();

inText.addEventListener("input", translateNow);
btnTranslate.addEventListener("click", translateNow);
btnCopy.addEventListener("click", copyOutput);
btnClear.addEventListener("click", clearAll);

translateNow();
