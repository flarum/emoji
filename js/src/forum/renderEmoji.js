/*global s9e*/

import twemoji from 'twemoji';

import { override } from 'flarum/extend';
import Post from 'flarum/models/Post';

export default function renderEmoji() {
  const ver = /[0-9]+.[0-9]+.[0-9]+/g.exec(twemoji.base);
  override(Post.prototype, 'contentHtml', function(original) {
    const contentHtml = original();

    if (this.oldContentHtml !== contentHtml) {
      this.emojifiedContentHtml = twemoji.parse(contentHtml, { base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@' + ver + '/assets/' });
      this.oldContentHtml = contentHtml;
    }

    return this.emojifiedContentHtml;
  });

  override(s9e.TextFormatter, 'preview', (original, text, element) => {
    original(text, element);

    twemoji.parse(element, { base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@' + ver + '/assets/' });
  });
}
