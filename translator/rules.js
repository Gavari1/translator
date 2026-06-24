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

  // If an English sentence starts with one of these helpers, Elefen uses Esce.
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

  // English contraction -> Elefen negation chunk.
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

  // English helper + not -> Elefen negation chunk.
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

  cleanToken(word) {
    return String(word || "")
      .toLowerCase()
      .replace(/^[^\w']+|[^\w']+$/g, "");
  },

  isAcelThat(tokens, index) {
    let nextIndex = index + 1;
    let next = this.cleanToken(tokens[nextIndex]);

    // I want that.
    if (!next) return true;

    // that dog / that car / that house
    if (this.ACEL_THAT_NOUNS.includes(next)) return true;

    // that big dog / that old car / that beautiful house
    while (this.ACEL_THAT_ADJECTIVES.includes(next)) {
      nextIndex++;
      next = this.cleanToken(tokens[nextIndex]);

      if (!next) return true;
      if (this.ACEL_THAT_NOUNS.includes(next)) return true;
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
  }
};
