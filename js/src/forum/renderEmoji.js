/*global s9e*/

import twemoji from 'twemoji';

import { override } from 'flarum/extend';
import Post from 'flarum/models/Post';

export default function renderEmoji() {
  override(Post.prototype, 'contentHtml', function(original) {
    const contentHtml = original();

    if (this.oldContentHtml !== contentHtml) {
      const buildUrl = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@13.0.0/assets/';
      this.emojifiedContentHtml = twemoji.parse(contentHtml, { base: buildUrl });
      this.oldContentHtml = contentHtml;
    }

    return this.emojifiedContentHtml;
  });

  override(s9e.TextFormatter, 'preview', (original, text, element) => {
    original(text, element);

    const buildUrl = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@13.0.0/assets/';
    twemoji.parse(element, { base: buildUrl });
  });
}
