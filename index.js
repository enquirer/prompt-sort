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
var swap = require('arr-swap');

/**
 * Create a new prompt:
 *
 * ```js
 * var Prompt = require('prompt-sort');
 * var prompt([
 *   {
 *     type: 'sort',
 *     name: 'menu',
 *     message: 'Sort the menu items in the order you prefer.',
 *     choices: [
 *       'Home',
 *       new inquirer.Seperator(),
 *       'About',
 *       'FAQ'
 *     ]
 *   }
 * ], function(answers) {
 *   console.log(JSON.stringify(answers, null, 2));
 * });
 *
 * // results in:
 * // {
 * //   "menu": [
 * //     "Home",
 * //     "------------",
 * //     "About",
 * //     "FAQ"
 * //   ]
 * // }
 * ```
 */

function Prompt() {
  debug('initializing from <%s>', __filename);
  List.apply(this, arguments);
  this.options.expandHeight = false;
  this.choices.check();
  this.overrideActions();
}

/**
 * Inherit `List`
 */

List.extend(Prompt);

/**
 * Override built-in actions methods
 */

Prompt.prototype.overrideActions = function() {
  var down = this.actions.down;
  var up = this.actions.up;

  this.choices.swap = function(a, b) {
    var choices = this.choices.slice();
    this.keymap = {};
    this.choices = [];
    this.items = [];
    this.keys = [];
    this.addChoices(swap(choices, a, b));
  };

  this.action('up', function(pos, key) {
    if (key && key.shift === true) {
      this.moveUp(this.position(pos));
    }
    return up.call(this, pos, key);
  });

  this.action('down', function(pos, key) {
    if (key && key.shift === true) {
      this.moveDown(this.position(pos));
    }
    return down.call(this, pos, key);
  });

  /**
   * Move the currently selected item up.
   */

  this.action('moveUp', function(pos) {
    var len = this.choices.length;
    if (pos > 0) {
      this.choices.swap(pos - 1, pos);
      return;
    }
    this.choices.swap(pos, len - 1);
  });

  /**
   * Move the currently selected item down.
   */

  this.action('moveDown', function(pos) {
    var len = this.choices.length;
    if (pos < len - 1) {
      this.choices.swap(pos + 1, pos);
      return;
    }
    this.choices.swap(pos, 0);
  });
};

Prompt.prototype.renderAnswer = function() {
  return cyan(this.choices.checked.join(', '));
};

Prompt.prototype.getAnswer = function() {
  return this.choices.checked;
};

/**
 * Expose `Prompt`
 */

module.exports = Prompt;
