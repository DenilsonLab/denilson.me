import { test } from 'node:test';
import assert from 'node:assert/strict';
import { draftText, mailtoUrl } from '../src/utils/contact.ts';
import { escapeHtml, serializeJson } from '../scripts/html.mjs';
test('draft links preserve accents and isolate all user input inside the body', () => {
  const draft = {
    name: '  Ana & José  ',
    email: 'ana@example.com',
    message: 'Hola\n&bcc=another@example.com\n¿Un sitio con café? #1',
  };
  const link = mailtoUrl('hello@denilson.me', 'Consulta desde denilson.me', draft);
  const url = new URL(link);
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'hello@denilson.me');
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
  assert.equal(url.searchParams.get('body'), draftText(draft));
  assert.match(draftText(draft), /^Ana & José/);
});
test('HTML metadata and JSON-LD cannot break out into script markup', () => {
  assert.equal(
    escapeHtml('"><img src=x onerror=alert(1)>'),
    '&quot;&gt;&lt;img src=x onerror=alert(1)&gt;',
  );
  const source = { name: '</script><script>alert(1)</script>&' };
  const json = serializeJson(source);
  assert.ok(!json.includes('<'));
  assert.deepEqual(JSON.parse(json), source);
});
