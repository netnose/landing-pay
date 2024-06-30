export const validButtonVerbs = ['Pay', 'Donate', 'Send'];
const completionVerbs: { [key: string]: string } = { 'Pay': 'paid', 'Donate': 'donated', 'Send': 'sent' };

export function isValidButtonVerb(verb?: string): boolean {
  if (!verb) return false;
  return validButtonVerbs.indexOf(verb) !== -1;
}

export function getCompletionVerb(buttonVerb?: string): string {
  if (!buttonVerb || !(buttonVerb in completionVerbs)) return 'payed';
  return completionVerbs[buttonVerb];
}
