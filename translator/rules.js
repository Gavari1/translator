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
  }
};
