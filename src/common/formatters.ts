export const capitalized = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const camelCaseToTitleCase = (text: string) =>
  capitalized(text.replace(/([A-Z])/g, ' $1'));

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
