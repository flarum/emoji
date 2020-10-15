/*global s9e*/

import twemoji from 'twemoji';

import { override } from 'flarum/extend';
import Post from 'flarum/models/Post';

import cdn from './cdn';

const parseOptions = { base: `${cdn}/assets/` };

export default function renderEmoji() {
  override(Post.prototype, 'contentHtml', function(original) {
    const contentHtml = original();

    if (this.oldContentHtml !== contentHtml) {
      this.emojifiedContentHtml = twemoji.parse(contentHtml, parseOptions);
      this.oldContentHtml = contentHtml;
    }

    return this.emojifiedContentHtml;
  });

  override(s9e.TextFormatter, 'preview', (original, text, element) => {
    original(text, element);

    twemoji.parse(element, parseOptions);
  });
}
