export const validButtonVerbs = ['Pay', 'Donate', 'Send'];

export function isValidButtonVerb(verb?: string): boolean {
  if (!verb) return false;
  return validButtonVerbs.indexOf(verb) !== -1;
}
