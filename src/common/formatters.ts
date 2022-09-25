export const capitalized = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)

export const cameCaseToTitleCase = (text: string) =>
  capitalized(text.replace(/([A-Z])/g, " $1"))