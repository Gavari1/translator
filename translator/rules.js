/*
  rules.js
  --------
  This file is for grammar commands / special handling.
  Keep vocabulary pairs in vocab.js.
*/

window.ELEFEN_RULES = {
  DET_TRANSLATIONS: {
    "a": "un",
    "an": "un",
    "the": "la",
    "this": "esta",
    "that": "acel",
    "my": "mea",
    "your": "tua",
    "his": "sua",
    "her": "sua",
    "its": "sua",
    "our": "nosa",
    "their": "lor"
  },

  SUBJECT_TRANSLATIONS: {
    "i": "me",
    "me": "me",
    "you": "tu",
    "he": "el",
    "him": "el",
    "she": "el",
    "her": "el",
    "it": "lo",
    "we": "nos",
    "us": "nos",
    "they": "los",
    "them": "los"
  },

  YES_NO_AUX_MAP: {
    "do": "",
    "does": "",
    "did": "ia",

    "can": "pote",
    "could": "ta pote",
    "should": "debe",
    "must": "debe",

    "will": "va",
    "would": "ta",

    "am": "es",
    "are": "es",
    "is": "es",
    "was": "ia es",
    "were": "ia es"
  },

  NEGATION_CONTRACTIONS: {
    "isn't": "no es",
    "aren't": "no es",
    "wasn't": "no ia es",
    "weren't": "no ia es",

    "won't": "no va",
    "wouldn't": "no ta",

    "don't": "no",
    "doesn't": "no",
    "didn't": "no ia",

    "can't": "no pote",
    "cannot": "no pote",
    "couldn't": "no ta pote",
    "shouldn't": "no debe",
    "mustn't": "no debe"
  },

  NEGATION_AUX_MAP: {
    "am": "no es",
    "is": "no es",
    "are": "no es",
    "was": "no ia es",
    "were": "no ia es",

    "will": "no va",
    "would": "no ta",

    "do": "no",
    "does": "no",
    "did": "no ia",

    "can": "no pote",
    "could": "no ta pote",
    "should": "no debe",
    "must": "no debe"
  },

  ACEL_THAT_NOUNS: [
    "car", "house", "thing", "language", "person", "river", "train",
    "bus", "bicycle", "bike", "plane", "boat", "food", "water",
    "day", "night", "work", "job", "street", "store", "school",
    "city", "country", "world", "word", "sentence", "time", "year",
    "month", "week", "hour", "minute", "morning", "church", "evening",
    "room", "door", "window", "book", "phone", "name", "family",
    "mother", "father", "child", "baby", "woman", "man", "people",
    "body", "head", "hand", "eye", "mouth", "heart", "coffee",
    "bread", "fruit", "animal", "dog", "cat", "tree", "flower",
    "sun", "moon", "place", "problem", "cage", "home",
    "translation", "translations", "translator"
  ],

  ACEL_THAT_ADJECTIVES: [
    "good", "bad", "happy", "cheerful", "sad", "big", "large",
    "small", "little", "long", "short", "high", "low", "near",
    "far", "full", "empty", "open", "closed", "heavy", "light",
    "wide", "narrow", "straight", "round", "clean", "dirty",
    "easy", "difficult", "hard", "soft", "hot", "warm", "cold",
    "cool", "wet", "dry", "new", "old", "fast", "slow", "late",
    "ready", "important", "interesting", "correct", "wrong", "true",
    "false", "possible", "impossible", "necessary", "sure",
    "beautiful", "pretty", "ugly", "cheap", "expensive", "safe",
    "dangerous", "strange", "special", "useful", "usual", "strong",
    "weak", "healthy", "sick", "hungry", "thirsty", "tired",
    "busy", "free", "friendly", "honest", "jealous", "angry",
    "curious", "comfortable", "uncomfortable", "simple", "logical",
    "clear", "dark", "real", "personal", "local", "public",
    "private", "common", "different", "same", "young", "black",
    "white", "red", "blue", "green", "yellow", "gray", "brown",
    "orange", "pink", "purple"
  ],

  THAT_CLAUSE_VERBS: [
    "think", "thinks", "thought",
    "believe", "believes", "believed",
    "know", "knows", "knew",
    "say", "says", "said",
    "tell", "tells", "told",
    "hope", "hopes", "hoped",
    "feel", "feels", "felt",
    "understand", "understands", "understood",
    "remember", "remembers", "remembered",
    "forget", "forgets", "forgot"
  ],

  RELATIVE_HUMAN_NOUNS: [
    "person", "people", "man", "woman", "child", "baby",
    "mother", "father", "friend"
  ],

  RELATIVE_THAT_SUBJECTS: [
    "i", "me", "you", "he", "him", "she", "her", "it",
    "we", "us", "they", "them"
  ],

  RELATIVE_THAT_AUX_OR_BE: [
    "am", "are", "is", "was", "were",
    "do", "does", "did",
    "can", "could", "should", "must",
    "will", "would"
  ],

  RELATIVE_THAT_VERB_STARTERS: [
    "bought", "helped", "made", "did", "said", "saw", "heard",
    "ate", "drank", "went", "came", "wrote", "read", "found",
    "gave", "took", "used", "wanted", "needed", "liked", "loved",
    "worked", "lived", "spoke", "translated", "created", "opened",
    "closed", "broke", "started", "finished", "changed", "cleaned",
    "repaired", "showed", "sent", "received", "met", "arrived",
    "waited", "looked", "moved"
  ],

  cleanToken(word) {
    return String(word || "")
      .toLowerCase()
      .replace(/^[^\w']+|[^\w']+$/g, "");
  },

  previousWord(tokens, index) {
    for (let i = index - 1; i >= 0; i--) {
      const word = this.cleanToken(tokens[i]);
      if (word) return word;
    }
    return "";
  },

  nextWordIndex(tokens, index) {
    for (let i = index + 1; i < tokens.length; i++) {
      const word = this.cleanToken(tokens[i]);
      if (word) return i;
    }
    return -1;
  },

  isLikelyNoun(word) {
    return this.ACEL_THAT_NOUNS.includes(this.cleanToken(word));
  },

  isHumanNoun(word) {
    return this.RELATIVE_HUMAN_NOUNS.includes(this.cleanToken(word));
  },

  isClauseVerbBeforeThat(tokens, index) {
    const prev = this.previousWord(tokens, index);
    return this.THAT_CLAUSE_VERBS.includes(prev);
  },

  hasVerbSoon(tokens, startIndex, maxWords = 6) {
    let wordsSeen = 0;

    for (let i = startIndex; i < tokens.length && wordsSeen < maxWords; i++) {
      const word = this.cleanToken(tokens[i]);
      if (!word) continue;

      wordsSeen++;

      if (this.RELATIVE_THAT_AUX_OR_BE.includes(word)) return true;
      if (this.RELATIVE_THAT_VERB_STARTERS.includes(word)) return true;
      if (this.THAT_CLAUSE_VERBS.includes(word)) return true;
      if (word.endsWith("ed")) return true;
    }

    return false;
  },

  looksLikeRelativeThat(tokens, index) {
    const prev = this.previousWord(tokens, index);
    const nextIndex = this.nextWordIndex(tokens, index);
    const next = nextIndex >= 0 ? this.cleanToken(tokens[nextIndex]) : "";

    // Must be noun + that + ...
    // the dog that...
    // the man that...
    if (!this.isLikelyNoun(prev)) return false;

    // the dog that I saw
    if (this.RELATIVE_THAT_SUBJECTS.includes(next)) {
      return this.hasVerbSoon(tokens, nextIndex);
    }

    // the dog that is happy
    if (this.RELATIVE_THAT_AUX_OR_BE.includes(next)) {
      return true;
    }

    // the man that helped me
    if (this.RELATIVE_THAT_VERB_STARTERS.includes(next)) {
      return true;
    }

    // fallback for simple -ed verbs
    if (next.endsWith("ed")) {
      return true;
    }

    return false;
  },

  isAcelThat(tokens, index) {
    const nextIndex = this.nextWordIndex(tokens, index);
    const next = nextIndex >= 0 ? this.cleanToken(tokens[nextIndex]) : "";

    // Do NOT touch relative that:
    // the man that helped me
    // the dog that I saw
    if (this.looksLikeRelativeThat(tokens, index)) {
      return false;
    }

    // Do NOT change:
    // I think that / I know that / I believe that
    if (this.isClauseVerbBeforeThat(tokens, index)) {
      return false;
    }

    // I want that.
    if (!next) return true;

    // that dog / that car / that house
    if (this.ACEL_THAT_NOUNS.includes(next)) return true;

    // that happy dog / that old blue car
    let checkIndex = nextIndex;

    while (checkIndex >= 0 && this.ACEL_THAT_ADJECTIVES.includes(this.cleanToken(tokens[checkIndex]))) {
      checkIndex = this.nextWordIndex(tokens, checkIndex);

      if (checkIndex < 0) return false;

      const possibleNoun = this.cleanToken(tokens[checkIndex]);

      if (this.ACEL_THAT_NOUNS.includes(possibleNoun)) {
        return true;
      }
    }

    return false;
  },

  resolveAcelThat(tokens) {
    return tokens.map((token, index) => {
      const clean = this.cleanToken(token);

      if (clean === "that" && this.isAcelThat(tokens, index)) {
        return "acel";
      }

      return token;
    });
  },

  resolveRelativeThat(tokens) {
    return tokens.map((token, index) => {
      const clean = this.cleanToken(token);

      if (clean === "that" && this.looksLikeRelativeThat(tokens, index)) {
        const prev = this.previousWord(tokens, index);
        return this.isHumanNoun(prev) ? "ci" : "cual";
      }

      return token;
    });
  },

  resolveDetAdjNounOrder(tokens) {
    const output = [];

    for (let i = 0; i < tokens.length; i++) {
      const current = this.cleanToken(tokens[i]);
      const nextIndex = this.nextWordIndex(tokens, i);
      const next = nextIndex >= 0 ? this.cleanToken(tokens[nextIndex]) : "";
      const next2Index = nextIndex >= 0 ? this.nextWordIndex(tokens, nextIndex) : -1;
      const next2 = next2Index >= 0 ? this.cleanToken(tokens[next2Index]) : "";

      const isDet =
        current === "a" ||
        current === "an" ||
        current === "the" ||
        current === "this" ||
        current === "that" ||
        current === "acel" ||
        current === "my" ||
        current === "your" ||
        current === "his" ||
        current === "her" ||
        current === "our" ||
        current === "their";

      if (
        isDet &&
        this.ACEL_THAT_ADJECTIVES.includes(next) &&
        this.ACEL_THAT_NOUNS.includes(next2)
      ) {
        output.push(tokens[i]);

        // preserve the original space pattern enough to avoid smashed words
        if (tokens[i + 1] && /^\s+$/.test(tokens[i + 1])) output.push(tokens[i + 1]);

        output.push(tokens[next2Index]);

        if (tokens[nextIndex + 1] && /^\s+$/.test(tokens[nextIndex + 1])) output.push(tokens[nextIndex + 1]);

        output.push(tokens[nextIndex]);

        i = next2Index;
        continue;
      }

      output.push(tokens[i]);
    }

    return output;
  }
};