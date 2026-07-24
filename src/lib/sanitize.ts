import sanitizeHtml from 'sanitize-html';

export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
      'ul', 'ol', 'li', 'a', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      table: ['class'],
      th: ['colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
}
