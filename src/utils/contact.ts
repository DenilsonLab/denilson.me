export interface ContactDraft {
  name: string;
  email: string;
  message: string;
}
export function draftText(draft: ContactDraft): string {
  return draft.name.trim() + ' <' + draft.email.trim() + '>\n\n' + draft.message.trim();
}
export function mailtoUrl(recipient: string, subject: string, draft: ContactDraft): string {
  return (
    'mailto:' +
    recipient +
    '?subject=' +
    encodeURIComponent(subject) +
    '&body=' +
    encodeURIComponent(draftText(draft))
  );
}
