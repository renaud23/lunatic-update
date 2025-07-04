const dictionary = {
  DEFAULT_BUTTON_ADD: { fr: 'Ajouter une ligne', en: 'Add row' },
  DEFAULT_BUTTON_REMOVE: { fr: 'Supprimer une ligne', en: 'Remove row' },
  MODAL_IGNORE: { fr: 'Poursuivre', en: 'Ignore' },
  MODAL_CORRECT: { fr: 'Corriger ma réponse', en: 'Correct' },
  DK: { fr: 'Ne sais pas', en: "Don't know" },
  RF: { fr: 'Refus', en: 'Refused' },
  PLACEHOLDER: { fr: 'Commencez votre saisie...', en: 'Start typing...' },
} as const

export default dictionary
export type Dictionary = typeof dictionary
export type DictionaryLang = 'fr' | 'en'

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export type AbstractDictionary<T> = {
  [Key in keyof T]: {
    [Lang in DictionaryLang]: string
  }
}
