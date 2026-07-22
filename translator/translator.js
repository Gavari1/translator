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
  return String(word || "")
    .toLowerCase()
    .replace(/^'+|'+$/g, "");
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
  return (
    isSentenceStart(tokens, index) &&
    /^[A-Z]/.test(tokens[index] || "")
  );
}

function maybeCapitalize(text, tokens, index) {
  return shouldCapitalize(tokens, index)
    ? capitalizeFirst(text)
    : text;
}

/*
  VOCABULARY PARSING
*/

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
      tag = parts
        .slice(1)
        .join("|")
        .trim()
        .toLowerCase();
    }

    if (!english || !elefen) continue;

    dict[english] = elefen;

    if (tag) {
      tags[english] = tag;
    }
  }

  return {
    dict,
    tags
  };
}

function rebuildDictionary() {
  const parsed = parseVocab(
    window.DEFAULT_VOCAB_TEXT || ""
  );

  dictionary = parsed.dict;
  vocabTags = parsed.tags;

  phraseList = Object.keys(dictionary)
    .map((key) => ({
      english: key,
      elefen: dictionary[key],
      words: key
        .split(/\s+/)
        .filter(Boolean)
    }))
    .sort((a, b) => b.words.length - a.words.length);
}

function getTag(word) {
  return vocabTags[normalizeWord(word)] || "";
}

function hasTag(word, wantedTag) {
  const tag = getTag(word);

  if (!tag) return false;

  return tag
    .split(/[,\s]+/)
    .includes(wantedTag);
}

function translateWord(word) {
  const clean = normalizeWord(word);

  return dictionary[clean] || word;
}

function skipSpaces(tokens, index) {
  while (
    index < tokens.length &&
    isSpaceToken(tokens[index])
  ) {
    index++;
  }

  return index;
}

/*
  GENERAL TOKEN HELPERS
*/

function previousWordToken(tokens, index) {
  for (let i = index - 1; i >= 0; i--) {
    if (isWordToken(tokens[i])) {
      return normalizeWord(tokens[i]);
    }
  }

  return "";
}

function nextWordTokenIndex(tokens, index) {
  for (let i = index + 1; i < tokens.length; i++) {
    if (isWordToken(tokens[i])) {
      return i;
    }

    if (!isSpaceToken(tokens[i])) {
      return -1;
    }
  }

  return -1;
}

/*
  RELATIVE THAT SAFETY RULE
*/

function isHumanRelativeNoun(word) {
  return [
    "person",
    "people",
    "man",
    "woman",
    "child",
    "baby",
    "mother",
    "father",
    "friend"
  ].includes(normalizeWord(word));
}

function isLikelyRelativeNoun(word) {
  const clean = normalizeWord(word);

  if (hasTag(clean, "noun")) return true;

  return [
    "car",
    "house",
    "thing",
    "language",
    "person",
    "river",
    "train",
    "bus",
    "bicycle",
    "bike",
    "plane",
    "boat",
    "food",
    "water",
    "day",
    "night",
    "work",
    "job",
    "street",
    "store",
    "school",
    "city",
    "country",
    "world",
    "word",
    "sentence",
    "time",
    "year",
    "month",
    "week",
    "hour",
    "minute",
    "morning",
    "church",
    "evening",
    "room",
    "door",
    "window",
    "book",
    "phone",
    "name",
    "family",
    "mother",
    "father",
    "child",
    "baby",
    "woman",
    "man",
    "people",
    "body",
    "head",
    "hand",
    "eye",
    "mouth",
    "heart",
    "coffee",
    "bread",
    "fruit",
    "animal",
    "dog",
    "cat",
    "tree",
    "flower",
    "sun",
    "moon",
    "place",
    "problem",
    "cage",
    "home",
    "translation",
    "translations",
    "translator"
  ].includes(clean);
}

function isLikelyVerbWord(word) {
  const clean = normalizeWord(word);

  if (!clean) return false;

  if (hasTag(clean, "verb")) {
    return true;
  }

  if (
    [
      "be",
      "am",
      "are",
      "is",
      "was",
      "were",

      "do",
      "does",
      "did",

      "can",
      "could",
      "should",
      "must",

      "will",
      "would",

      "go",
      "goes",
      "went",

      "come",
      "comes",
      "came",

      "see",
      "sees",
      "saw",

      "hear",
      "hears",
      "heard",

      "help",
      "helps",
      "helped",

      "buy",
      "buys",
      "bought",

      "make",
      "makes",
      "made",

      "say",
      "says",
      "said",

      "tell",
      "tells",
      "told",

      "eat",
      "eats",
      "ate",

      "drink",
      "drinks",
      "drank",

      "write",
      "writes",
      "wrote",

      "read",
      "reads",

      "find",
      "finds",
      "found",

      "give",
      "gives",
      "gave",

      "take",
      "takes",
      "took",

      "use",
      "uses",
      "used",

      "want",
      "wants",
      "wanted",

      "need",
      "needs",
      "needed",

      "like",
      "likes",
      "liked",

      "love",
      "loves",
      "loved",

      "work",
      "works",
      "worked",

      "live",
      "lives",
      "lived",

      "speak",
      "speaks",
      "spoke",

      "translate",
      "translates",
      "translated",

      "create",
      "creates",
      "created",

      "open",
      "opens",
      "opened",

      "close",
      "closes",
      "closed",

      "start",
      "starts",
      "started",

      "begin",
      "begins",
      "began",

      "finish",
      "finishes",
      "finished",

      "change",
      "changes",
      "changed",

      "clean",
      "cleans",
      "cleaned",

      "repair",
      "repairs",
      "repaired",

      "think",
      "thinks",
      "thought",

      "believe",
      "believes",
      "believed",

      "know",
      "knows",
      "knew",

      "understand",
      "understands",
      "understood",

      "remember",
      "remembers",
      "remembered",

      "forget",
      "forgets",
      "forgot",

      "hope",
      "hopes",
      "hoped",

      "feel",
      "feels",
      "felt"
    ].includes(clean)
  ) {
    return true;
  }

  if (clean.endsWith("ed")) {
    return true;
  }

  if (
    dictionary[clean] &&
    !hasTag(clean, "noun") &&
    !hasTag(clean, "adj") &&
    !hasTag(clean, "det") &&
    !hasTag(clean, "adv")
  ) {
    return true;
  }

  return false;
}

function hasVerbSoonAfter(
  tokens,
  startIndex,
  maxWords = 6
) {
  let wordsSeen = 0;

  for (
    let i = startIndex;
    i < tokens.length && wordsSeen < maxWords;
    i++
  ) {
    if (!isWordToken(tokens[i])) continue;

    const word = normalizeWord(tokens[i]);

    wordsSeen++;

    if (isLikelyVerbWord(word)) {
      return true;
    }
  }

  return false;
}

function looksLikeRelativeThatLocal(tokens, index) {
  const current = normalizeWord(tokens[index]);

  if (current !== "that") return false;

  const prev = previousWordToken(tokens, index);

  if (!isLikelyRelativeNoun(prev)) {
    return false;
  }

  const nextIndex = nextWordTokenIndex(tokens, index);

  if (nextIndex < 0) return false;

  const next = normalizeWord(tokens[nextIndex]);

  if (
    [
      "i",
      "me",
      "you",
      "he",
      "him",
      "she",
      "her",
      "it",
      "we",
      "us",
      "they",
      "them"
    ].includes(next)
  ) {
    return hasVerbSoonAfter(tokens, nextIndex);
  }

  if (
    [
      "am",
      "are",
      "is",
      "was",
      "were",
      "do",
      "does",
      "did",
      "can",
      "could",
      "should",
      "must",
      "will",
      "would"
    ].includes(next)
  ) {
    return true;
  }

  if (isLikelyVerbWord(next)) {
    return true;
  }

  return false;
}

function resolveRelativeThatLocal(tokens) {
  return tokens.map((token, index) => {
    if (
      isWordToken(token) &&
      looksLikeRelativeThatLocal(tokens, index)
    ) {
      const prev = previousWordToken(tokens, index);

      return isHumanRelativeNoun(prev)
        ? "ci"
        : "cual";
    }

    return token;
  });
}

/*
  CLAUSE THAT RULE

  Examples:
    I think that he came.
    -> Me pensa ce el ia veni.

    I am happy that you came.
    -> Me es felis ce tu ia veni.

    I know that.
    -> Me sabe acel.

  A clause "that" must introduce
  a real clause containing a verb.
*/

function isClauseTriggerWord(word) {
  const clean = normalizeWord(word);

  /*
    Any word tagged as an adjective can
    potentially introduce a clause:

      happy that...
      sad that...
      certain that...
      surprised that...
  */

  if (hasTag(clean, "adj")) {
    return true;
  }

  return [
    /*
      Thinking and knowing
    */

    "think",
    "thinks",
    "thought",

    "believe",
    "believes",
    "believed",

    "know",
    "knows",
    "knew",

    "understand",
    "understands",
    "understood",

    "remember",
    "remembers",
    "remembered",

    "forget",
    "forgets",
    "forgot",

    /*
      Speaking
    */

    "say",
    "says",
    "said",

    "tell",
    "tells",
    "told",

    /*
      Feelings and opinions
    */

    "hope",
    "hopes",
    "hoped",

    "feel",
    "feels",
    "felt",

    "like",
    "likes",
    "liked",

    "love",
    "loves",
    "loved",

    "hate",
    "hates",
    "hated",

    /*
      Common adjective fallbacks.
      These help when vocab tags
      are missing.
    */

    "happy",
    "glad",
    "sad",
    "sorry",
    "sure",
    "certain",
    "afraid",
    "surprised",
    "angry",
    "pleased",
    "excited",
    "worried"
  ].includes(clean);
}

function hasClauseVerbAfterThat(
  tokens,
  thatIndex,
  maxWords = 8
) {
  /*
    Find the first word after "that."

    In a clause, this is usually
    the subject:

      that YOU came
      that JOHN came
      that THE DOG came
  */

  const subjectIndex = nextWordTokenIndex(
    tokens,
    thatIndex
  );

  if (subjectIndex < 0) {
    return false;
  }

  let wordsSeen = 0;

  /*
    Start searching after the probable
    subject. This prevents a subject
    pronoun or proper name from being
    mistaken for a verb.
  */

  for (
    let i = subjectIndex + 1;
    i < tokens.length &&
    wordsSeen < maxWords;
    i++
  ) {
    const token = tokens[i];

    /*
      Do not search into another sentence.
    */

    if (
      !isWordToken(token) &&
      /[.!?]/.test(token)
    ) {
      break;
    }

    if (!isWordToken(token)) {
      continue;
    }

    wordsSeen++;

    if (isLikelyVerbWord(token)) {
      return true;
    }
  }

  return false;
}

function isClauseThatLocal(tokens, index) {
  if (!isWordToken(tokens[index])) {
    return false;
  }

  if (
    normalizeWord(tokens[index]) !== "that"
  ) {
    return false;
  }

  const prev = previousWordToken(
    tokens,
    index
  );

  if (!isClauseTriggerWord(prev)) {
    return false;
  }

  /*
    Requiring a following verb prevents:

      I know that.
      I like that.
      I want that car.

    from incorrectly using "ce."
  */

  return hasClauseVerbAfterThat(
    tokens,
    index
  );
}

function resolveClauseThatLocal(tokens) {
  return tokens.map((token, index) => {
    if (isClauseThatLocal(tokens, index)) {
      return maybeCapitalize(
        "ce",
        tokens,
        index
      );
    }

    return token;
  });
}

/*
  ACEL THAT FALLBACK RULE
*/

function resolveAcelThatLocal(tokens) {
  return tokens.map((token) => {
    if (
      isWordToken(token) &&
      normalizeWord(token) === "that"
    ) {
      return "acel";
    }

    return token;
  });
}

/*
  DESTINATION HELPERS

  New destination words can be tagged like:
    restaurant = restorante | noun place
*/

function isDestinationWord(word) {
  const clean = normalizeWord(word);

  if (hasTag(clean, "place")) {
    return true;
  }

  if (hasTag(clean, "destination")) {
    return true;
  }

  return [
    "home",
    "house",
    "work",
    "job",
    "school",
    "store",
    "church",
    "city",
    "country",
    "room",
    "place",
    "street",
    "river",
    "car",
    "bus",
    "train",
    "plane",
    "boat",
    "airport",
    "station",
    "hotel",
    "restaurant",
    "office",
    "park",
    "beach",
    "mountain",
    "lake",
    "door"
  ].includes(clean);
}

/*
  GO + DESTINATION RULE

  English:
    go home
    go school
    went church
    to go home

  Internal:
    go to home
    go to school
    went to church
    to go to home

  Elefen:
    vade a casa
    vade a scola
    ia vade a eglesa
    vade a casa
*/

function isGoMotionWord(word) {
  return [
    "go",
    "goes",
    "went"
  ].includes(normalizeWord(word));
}

function isBlockedGoDestinationWord(word) {
  return [
    "to",
    "into",
    "onto",
    "toward",
    "towards",
    "from",
    "in",
    "on",
    "at",
    "with",
    "without",
    "for",
    "by",

    "today",
    "tomorrow",
    "yesterday",
    "now",
    "later",
    "soon",
    "there",
    "here",
    "back",
    "again",

    "crazy"
  ].includes(normalizeWord(word));
}

function looksLikeGoDestination(
  tokens,
  startIndex
) {
  if (
    startIndex < 0 ||
    startIndex >= tokens.length
  ) {
    return false;
  }

  if (!isWordToken(tokens[startIndex])) {
    return false;
  }

  const firstWord = normalizeWord(
    tokens[startIndex]
  );

  if (
    isBlockedGoDestinationWord(firstWord)
  ) {
    return false;
  }

  /*
    go the house
    go my house
    go your school
  */

  if (isDeterminer(firstWord)) {
    const nounIndex = nextWordTokenIndex(
      tokens,
      startIndex
    );

    if (
      nounIndex >= 0 &&
      isWordToken(tokens[nounIndex]) &&
      isDestinationWord(tokens[nounIndex])
    ) {
      return true;
    }

    return false;
  }

  /*
    go home
    go school
    go work
    go church
  */

  if (isDestinationWord(firstWord)) {
    return true;
  }

  return false;
}

function insertToBeforeGoDestinations(tokens) {
  const result = [...tokens];
  const insertIndexes = [];

  for (let i = 0; i < tokens.length; i++) {
    if (!isWordToken(tokens[i])) continue;
    if (!isGoMotionWord(tokens[i])) continue;

    const nextIndex = nextWordTokenIndex(
      tokens,
      i
    );

    if (nextIndex < 0) continue;

    if (
      looksLikeGoDestination(
        tokens,
        nextIndex
      )
    ) {
      insertIndexes.push(nextIndex);
    }
  }

  for (
    let i = insertIndexes.length - 1;
    i >= 0;
    i--
  ) {
    result.splice(
      insertIndexes[i],
      0,
      "to",
      " "
    );
  }

  return result;
}

/*
  PURPOSE "TO" AFTER DESTINATION RULE

  English:
    went to the store to buy food
    go home to sleep
    went to school to study

  Internal:
    went to the store for buy food
    go to home for sleep
    went to school for study

  Elefen:
    ia vade a la boteca per compra comeda
    vade a casa per dormi
    ia vade a scola per studia
*/

function isPurposeToAfterDestination(
  tokens,
  index
) {
  if (!isWordToken(tokens[index])) {
    return false;
  }

  if (
    normalizeWord(tokens[index]) !== "to"
  ) {
    return false;
  }

  const nextIndex = nextWordTokenIndex(
    tokens,
    index
  );

  if (nextIndex < 0) return false;

  const nextWord = normalizeWord(
    tokens[nextIndex]
  );

  if (!isLikelyVerbWord(nextWord)) {
    return false;
  }

  const prevWord = previousWordToken(
    tokens,
    index
  );

  if (!prevWord) return false;

  if (isDestinationWord(prevWord)) {
    return true;
  }

  return false;
}

function convertPurposeToAfterDestinations(
  tokens
) {
  return tokens.map((token, index) => {
    if (
      isPurposeToAfterDestination(
        tokens,
        index
      )
    ) {
      return "for";
    }

    return token;
  });
}

function negateTranslatedVerbPhrase(phrase) {
  if (!phrase) return phrase;

  return "no " + phrase;
}

/*
  GOING TO QUESTION RULE
*/

function tryGoingToQuestionRest(
  tokens,
  aux,
  restStart,
  sentenceEnd
) {
  if (restStart >= sentenceEnd) {
    return null;
  }

  if (!isWordToken(tokens[restStart])) {
    return null;
  }

  const first = normalizeWord(
    tokens[restStart]
  );

  if (first !== "going") {
    return null;
  }

  const toIndex = skipSpaces(
    tokens,
    restStart + 1
  );

  if (
    toIndex >= sentenceEnd ||
    !isWordToken(tokens[toIndex]) ||
    normalizeWord(tokens[toIndex]) !== "to"
  ) {
    return null;
  }

  const afterToIndex = skipSpaces(
    tokens,
    toIndex + 1
  );

  if (
    afterToIndex >= sentenceEnd ||
    !isWordToken(tokens[afterToIndex])
  ) {
    return null;
  }

  const afterToWord = normalizeWord(
    tokens[afterToIndex]
  );

  const tailSource = tokens
    .slice(afterToIndex, sentenceEnd)
    .join("")
    .trim();

  const isPastGoingTo =
    aux === "was" ||
    aux === "were";

  /*
    Are you going to buy?
    -> Esce tu va compra?

    Was he going to buy?
    -> Esce el ia intende compra?
  */

  if (isLikelyVerbWord(afterToWord)) {
    const translatedTail = tailSource
      ? translateText(tailSource, false).trim()
      : "";

    const marker = isPastGoingTo
      ? "ia intende"
      : "va";

    return translatedTail
      ? marker + " " + translatedTail
      : marker;
  }

  /*
    Are you going to the store?
    -> Esce tu vade a la boteca?

    Was he going to the store?
    -> Esce el ia vade a la boteca?
  */

  const destinationSource = tokens
    .slice(afterToIndex, sentenceEnd)
    .join("")
    .trim();

  const motionSource =
    "go to " + destinationSource;

  let translatedMotion = translateText(
    motionSource,
    false
  ).trim();

  if (isPastGoingTo) {
    if (translatedMotion === "vade") {
      translatedMotion = "ia vade";
    } else if (
      translatedMotion.startsWith("vade ")
    ) {
      translatedMotion =
        "ia " + translatedMotion;
    }
  }

  return translatedMotion;
}

/*
  YES/NO QUESTION RULE
*/

function tryYesNoQuestionRule(
  tokens,
  startIndex
) {
  if (!isWordToken(tokens[startIndex])) {
    return null;
  }

  if (
    !isSentenceStart(tokens, startIndex)
  ) {
    return null;
  }

  const aux = normalizeWord(
    tokens[startIndex]
  );

  if (!(aux in YES_NO_AUX_MAP)) {
    return null;
  }

  let subjectIndex = skipSpaces(
    tokens,
    startIndex + 1
  );

  if (
    subjectIndex >= tokens.length ||
    !isWordToken(tokens[subjectIndex])
  ) {
    return null;
  }

  const subjectWord = normalizeWord(
    tokens[subjectIndex]
  );

  let subject =
    SUBJECT_TRANSLATIONS[subjectWord];

  if (!subject) {
    return null;
  }

  let restStart = subjectIndex + 1;

  if (subjectWord === "you") {
    const possibleAllIndex = skipSpaces(
      tokens,
      subjectIndex + 1
    );

    if (
      possibleAllIndex < tokens.length &&
      isWordToken(tokens[possibleAllIndex]) &&
      normalizeWord(
        tokens[possibleAllIndex]
      ) === "all"
    ) {
      subject = "vos";
      restStart = possibleAllIndex + 1;
    }
  }

  restStart = skipSpaces(
    tokens,
    restStart
  );

  let isNegative = false;

  if (
    restStart < tokens.length &&
    isWordToken(tokens[restStart]) &&
    normalizeWord(tokens[restStart]) === "not"
  ) {
    isNegative = true;

    restStart = skipSpaces(
      tokens,
      restStart + 1
    );
  }

  let sentenceEnd = restStart;

  while (
    sentenceEnd < tokens.length &&
    !/[.!?]/.test(tokens[sentenceEnd])
  ) {
    sentenceEnd++;
  }

  const goingToRest =
    tryGoingToQuestionRest(
      tokens,
      aux,
      restStart,
      sentenceEnd
    );

  if (goingToRest) {
    const parts = [
      "Esce",
      subject
    ];

    parts.push(
      isNegative
        ? negateTranslatedVerbPhrase(
            goingToRest
          )
        : goingToRest
    );

    return {
      text: parts.join(" "),
      nextIndex: sentenceEnd
    };
  }

  const restSource = tokens
    .slice(restStart, sentenceEnd)
    .join("")
    .trim();

  const translatedRest = restSource
    ? translateText(
        restSource,
        false
      ).trim()
    : "";

  let marker = YES_NO_AUX_MAP[aux];

  if (isNegative) {
    marker = marker
      ? "no " + marker
      : "no";
  }

  const parts = [
    "Esce",
    subject
  ];

  if (marker) {
    parts.push(marker);
  }

  if (translatedRest) {
    parts.push(translatedRest);
  }

  return {
    text: parts.join(" "),
    nextIndex: sentenceEnd
  };
}

/*
  NEGATION RULE
*/

function tryNegationRule(
  tokens,
  startIndex
) {
  if (!isWordToken(tokens[startIndex])) {
    return null;
  }

  const word = normalizeWord(
    tokens[startIndex]
  );

  const nextIndex = skipSpaces(
    tokens,
    startIndex + 1
  );

  const nextWord =
    nextIndex < tokens.length &&
    isWordToken(tokens[nextIndex])
      ? normalizeWord(tokens[nextIndex])
      : "";

  if (NEGATION_CONTRACTIONS[word]) {
    return {
      text: maybeCapitalize(
        NEGATION_CONTRACTIONS[word],
        tokens,
        startIndex
      ),
      nextIndex: startIndex + 1
    };
  }

  if (
    nextWord === "not" &&
    NEGATION_AUX_MAP[word]
  ) {
    return {
      text: maybeCapitalize(
        NEGATION_AUX_MAP[word],
        tokens,
        startIndex
      ),
      nextIndex: nextIndex + 1
    };
  }

  return null;
}

/*
  DETERMINERS
*/

function isDeterminer(word) {
  const clean = normalizeWord(word);

  return (
    !!DET_TRANSLATIONS[clean] ||
    hasTag(clean, "det")
  );
}

function translateDeterminer(word) {
  const clean = normalizeWord(word);

  return (
    DET_TRANSLATIONS[clean] ||
    translateWord(word)
  );
}

/*
  PHRASE MATCHING
*/

function tryMatchPhrase(
  tokens,
  startIndex,
  phrase,
  multiWordOnly = false
) {
  if (
    multiWordOnly &&
    phrase.words.length < 2
  ) {
    return null;
  }

  let tokenIndex = startIndex;

  for (
    let wordIndex = 0;
    wordIndex < phrase.words.length;
    wordIndex++
  ) {
    if (wordIndex > 0) {
      let sawSpace = false;

      while (
        tokenIndex < tokens.length &&
        isSpaceToken(tokens[tokenIndex])
      ) {
        sawSpace = true;
        tokenIndex++;
      }

      if (!sawSpace) {
        return null;
      }
    }

    if (tokenIndex >= tokens.length) {
      return null;
    }

    if (!isWordToken(tokens[tokenIndex])) {
      return null;
    }

    const currentWord = normalizeWord(
      tokens[tokenIndex]
    );

    const neededWord =
      phrase.words[wordIndex];

    if (currentWord !== neededWord) {
      return null;
    }

    tokenIndex++;
  }

  return {
    text: maybeCapitalize(
      phrase.elefen,
      tokens,
      startIndex
    ),
    nextIndex: tokenIndex
  };
}

function tryAnyPhrase(
  tokens,
  startIndex,
  multiWordOnly = false
) {
  for (const phrase of phraseList) {
    const matched = tryMatchPhrase(
      tokens,
      startIndex,
      phrase,
      multiWordOnly
    );

    if (matched) {
      return matched;
    }
  }

  return null;
}

/*
  MAKE + PERSON + ADJECTIVE RULE

  make you happy
  -> fa ce tu es felis

  makes him sad
  -> fa ce el es triste

  made them angry
  -> ia fa ce los es coler

  make you very happy
  -> fa ce tu es multe felis
*/

function tryMakePersonAdjectiveRule(
  tokens,
  startIndex
) {
  if (!isWordToken(tokens[startIndex])) {
    return null;
  }

  const makeForms = {
    make: "fa",
    makes: "fa",
    made: "ia fa"
  };

  const objectTranslations = {
    me: "me",
    you: "tu",
    him: "el",
    her: "el",
    it: "lo",
    us: "nos",
    them: "los"
  };

  const makeWord = normalizeWord(
    tokens[startIndex]
  );

  const translatedMake =
    makeForms[makeWord];

  if (!translatedMake) {
    return null;
  }

  let objectIndex = skipSpaces(
    tokens,
    startIndex + 1
  );

  if (
    objectIndex >= tokens.length ||
    !isWordToken(tokens[objectIndex])
  ) {
    return null;
  }

  const objectWord = normalizeWord(
    tokens[objectIndex]
  );

  let translatedObject =
    objectTranslations[objectWord];

  if (!translatedObject) {
    return null;
  }

  let adjectiveIndex = skipSpaces(
    tokens,
    objectIndex + 1
  );

  /*
    make you all happy
    -> fa ce vos es felis
  */

  if (
    objectWord === "you" &&
    adjectiveIndex < tokens.length &&
    isWordToken(tokens[adjectiveIndex]) &&
    normalizeWord(
      tokens[adjectiveIndex]
    ) === "all"
  ) {
    translatedObject = "vos";

    adjectiveIndex = skipSpaces(
      tokens,
      adjectiveIndex + 1
    );
  }

  if (
    adjectiveIndex >= tokens.length ||
    !isWordToken(tokens[adjectiveIndex])
  ) {
    return null;
  }

  let adjectiveText = "";
  let finalIndex = adjectiveIndex;

  const possibleModifier = normalizeWord(
    tokens[adjectiveIndex]
  );

  /*
    make you very happy
    make him extremely angry

    This works whenever the modifier
    is tagged as an adverb and the next
    word is tagged as an adjective.
  */

  if (hasTag(possibleModifier, "adv")) {
    const nextIndex = skipSpaces(
      tokens,
      adjectiveIndex + 1
    );

    if (
      nextIndex >= tokens.length ||
      !isWordToken(tokens[nextIndex]) ||
      !hasTag(tokens[nextIndex], "adj")
    ) {
      return null;
    }

    adjectiveText =
      translateWord(tokens[adjectiveIndex]) +
      " " +
      translateWord(tokens[nextIndex]);

    finalIndex = nextIndex;
  } else {
    if (
      !hasTag(possibleModifier, "adj")
    ) {
      return null;
    }

    adjectiveText = translateWord(
      tokens[adjectiveIndex]
    );
  }

  const translation = [
    translatedMake,
    "ce",
    translatedObject,
    "es",
    adjectiveText
  ].join(" ");

  return {
    text: maybeCapitalize(
      translation,
      tokens,
      startIndex
    ),
    nextIndex: finalIndex + 1
  };
}

/*
  ADJECTIVE + NOUN RULE
*/

function tryAdjectiveNounRule(
  tokens,
  startIndex
) {
  if (!isWordToken(tokens[startIndex])) {
    return null;
  }

  let i = startIndex;
  let determiner = "";
  let hasDeterminer = false;

  const firstWord = normalizeWord(
    tokens[i]
  );

  if (isDeterminer(firstWord)) {
    hasDeterminer = true;

    determiner = translateDeterminer(
      firstWord
    );

    i++;
    i = skipSpaces(tokens, i);
  }

  const modifiers = [];

  while (
    i < tokens.length &&
    isWordToken(tokens[i])
  ) {
    const current = normalizeWord(
      tokens[i]
    );

    if (hasTag(current, "adv")) {
      const advToken = tokens[i];

      const nextIndex = skipSpaces(
        tokens,
        i + 1
      );

      if (
        nextIndex < tokens.length &&
        isWordToken(tokens[nextIndex])
      ) {
        const nextWord = normalizeWord(
          tokens[nextIndex]
        );

        if (hasTag(nextWord, "adj")) {
          modifiers.push(
            translateWord(advToken) +
            " " +
            translateWord(
              tokens[nextIndex]
            )
          );

          i = nextIndex + 1;
          i = skipSpaces(tokens, i);

          continue;
        }
      }
    }

    if (hasTag(current, "adj")) {
      modifiers.push(
        translateWord(tokens[i])
      );

      i++;
      i = skipSpaces(tokens, i);

      continue;
    }

    break;
  }

  if (
    i >= tokens.length ||
    !isWordToken(tokens[i])
  ) {
    return null;
  }

  const possibleNoun = normalizeWord(
    tokens[i]
  );

  if (!hasTag(possibleNoun, "noun")) {
    return null;
  }

  if (
    !hasDeterminer &&
    modifiers.length === 0
  ) {
    return null;
  }

  const noun = translateWord(tokens[i]);
  const parts = [];

  if (hasDeterminer) {
    parts.push(determiner);
  }

  parts.push(noun);

  for (const modifier of modifiers) {
    parts.push(modifier);
  }

  return {
    text: maybeCapitalize(
      parts.join(" "),
      tokens,
      startIndex
    ),
    nextIndex: i + 1
  };
}

/*
  MAIN TRANSLATION ENGINE
*/

function translateText(
  source,
  allowQuestionRule = true
) {
  let tokens = tokenize(source);

  /*
    Order matters:

    1. Relative that:
       the dog that eats -> cual
       the man that sees -> ci

    2. Clause that:
       know that he came -> ce
       happy that you came -> ce

    3. Go + destination:
       go home
       -> go to home
       -> vade a casa

    4. Purpose to after destination:
       store to buy
       -> store for buy
       -> boteca per compra

    5. Acel that:
       that dog
       I want that
       eat that
       -> acel
  */

  tokens = resolveRelativeThatLocal(tokens);
  tokens = resolveClauseThatLocal(tokens);
  tokens = insertToBeforeGoDestinations(tokens);

  tokens =
    convertPurposeToAfterDestinations(tokens);

  if (
    typeof RULES.resolveRelativeThat ===
    "function"
  ) {
    tokens =
      RULES.resolveRelativeThat(tokens);
  }

  tokens = resolveAcelThatLocal(tokens);

  if (
    typeof RULES.resolveAcelThat ===
    "function"
  ) {
    tokens =
      RULES.resolveAcelThat(tokens);
  }

  const output = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (!isWordToken(token)) {
      output.push(token);
      i++;

      continue;
    }

    const yesNoQuestion =
      allowQuestionRule
        ? tryYesNoQuestionRule(tokens, i)
        : null;

    if (yesNoQuestion) {
      output.push(yesNoQuestion.text);
      i = yesNoQuestion.nextIndex;

      continue;
    }

    const negationRule =
      tryNegationRule(tokens, i);

    if (negationRule) {
      output.push(negationRule.text);
      i = negationRule.nextIndex;

      continue;
    }

    /*
      This rule must run before ordinary
      phrase matching so that:

      make you happy

      is understood as:

      fa ce tu es felis
    */

    const makePersonAdjective =
      tryMakePersonAdjectiveRule(
        tokens,
        i
      );

    if (makePersonAdjective) {
      output.push(
        makePersonAdjective.text
      );

      i =
        makePersonAdjective.nextIndex;

      continue;
    }

    const multiPhrase = tryAnyPhrase(
      tokens,
      i,
      true
    );

    if (multiPhrase) {
      output.push(multiPhrase.text);
      i = multiPhrase.nextIndex;

      continue;
    }

    const adjectiveNoun =
      tryAdjectiveNounRule(tokens, i);

    if (adjectiveNoun) {
      output.push(adjectiveNoun.text);
      i = adjectiveNoun.nextIndex;

      continue;
    }

    const singlePhrase = tryAnyPhrase(
      tokens,
      i,
      false
    );

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

/*
  PAGE CONTROLS
*/

function translateNow() {
  const source = inText.value || "";

  outText.value =
    translateText(source);
}

async function copyOutput() {
  const text = outText.value || "";

  if (!text) return;

  try {
    await navigator.clipboard.writeText(
      text
    );
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

/*
  STARTUP
*/

rebuildDictionary();

inText.addEventListener(
  "input",
  translateNow
);

btnTranslate.addEventListener(
  "click",
  translateNow
);

btnCopy.addEventListener(
  "click",
  copyOutput
);

btnClear.addEventListener(
  "click",
  clearAll
);

translateNow();