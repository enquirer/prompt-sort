/*!
 * prompt-sort <https://github.com/enquirer/prompt-sort>
 *
 * Copyright (c) 2015-2017, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

var debug = require('debug')('prompt-sort');
var List = require('prompt-list');
var cyan = require('ansi-cyan');

/**
 * Create a new prompt:
 *
 * ```js
 * var Prompt = require('prompt-sort');
 * var prompt = new Prompt({
 *   name: 'colors',
 *   message: 'Sort colors from most to least favorite',
 *   choices: [
 *     'green',
 *     'red',
 *     'yellow'
 *   ]
 * });
 *
 * prompt.run()
 *   .then(function(answer) {
 *     console.log(answer);
 *   })
 * ```
 */

function Prompt() {
  debug('initializing from <%s>', __filename);
  List.apply(this, arguments);
  // disable "expand" behavior on up/down keypresses
  this.options.expandChoices = false;
  this.choices.check();
  this.action('space', function(pos) {
    return pos;
  });
  this.action('number', function(pos) {
    return pos;
  });
}

/**
 * Inherit `List`
 */

List.extend(Prompt);

/**
 * Override built-in `.renderAnswer` method
 */

Prompt.prototype.renderAnswer = function() {
  return cyan(this.choices.checked.join(', '));
};

/**
 * Override built-in `.getAnswer` method
 */

Prompt.prototype.getAnswer = function() {
  return this.choices.checked;
};

/**
 * Expose `Prompt`
 */

module.exports = Prompt;
