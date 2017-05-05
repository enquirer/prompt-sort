/*!
 * sort-prompt <https://github.com/doowb/sort-prompt>
 *
 * Copyright (c) 2015, 2017, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

var cyan = require('ansi-cyan');
var bold = require('ansi-bold');
var isNumber = require('is-number');
var List = require('prompt-list');
var isWindows = require('is-windows');
var Paginator = require('terminal-paginator');
var utils = require('readline-utils');
var symbol = isWindows() ? '>' : '❯';
var swap = require('./swap');

/**
 * Sort prompt constructor. Register with [inquirer2][] to use.
 *
 * ```js
 * var inquirer = require('inquirer2');
 * inquirer.registerPrompt('sort', require('sort-prompt'));
 * inquirer.prompt([
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
 * //=> {
 * //=>   "menu": [
 * //=>     "Home",
 * //=>     "------------",
 * //=>     "About",
 * //=>     "FAQ"
 * //=>   ]
 * //=> }
 * ```
 */

function Prompt() {
  if (!(this instanceof List)) {
    return new List(question, answers, ui);
  }

  debug('initializing from <%s>', __filename);
  List.apply(this, arguments);
  this.decorateChoices();
}

/**
 * Inherit `List`
 */

List.extend(Prompt);

/**
 * Add convience methods to `this.choices`
 */

Prompt.prototype.decorateChoices = function() {

  /**
   * Swap 2 items in the `choices` array and ensure
   * the `realChoices` array is updated.
   */

  this.choices.swap = function(a, b) {
    // this.choices.splice(b, 0, this.choices.splice(a, 1)[0]);
    // this.realChoices = this.choices.filter(Separator.exclude);
    return swap(this.choices, a, b);
  };

  /**
   * Map over the `choices` array.
   */

  this.choices.map = function(fn) {
    return this.choices.map(fn);
  };
};

/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

// Prompt.prototype._run = function(cb) {
//   this.done = cb;

//   var events = observe(this.rl);
//   events.normalizedUpKey.takeUntil(events.line).forEach(this.onUpKey.bind(this));
//   events.normalizedDownKey.takeUntil(events.line).forEach(this.onDownKey.bind(this));
//   events.numberKey.takeUntil(events.line).forEach(this.onNumberKey.bind(this));
//   events.line.take(1).forEach(this.onSubmit.bind(this));

//   // Init the prompt
//   utils.hideCursor();
//   this.render();
//   return this;
// };

/**
 * Render the prompt
 * @return {Object} Returns the Prompt instance
 */

Prompt.prototype.render = function() {
  // Render question
  var message = this.message;

  // Render choices or answer depending on the state
  if (this.status === 'answered') {
    message += cyan(this.checked.join(', '));
  } else {
    var choicesStr = listRender(this.choices, this.selected);
    message += '\n' + bold('  (Use arrow keys to move. Hold down Shift to move item.)');
    message += '\n' + this.paginator.paginate(choicesStr, this.selected, this.options.pageSize);
  }

  this.ui.render(message);
  return this;
};

/**
 * When user press `enter` key
 */

Prompt.prototype.onSubmit = function() {
  this.answer = this.filterSelected();
  this.status = 'answered';
  var self = this;

  this.once('answer', function() {
    utils.showCursor(self.rl);
  });

  // removes listeners
  this.only();
  this.submitAnswer();
};

/**
 * Get selected choices (can be overridden)
 */

Prompt.prototype.filterSelected = function() {
  return this.choices.checked.filter(function(ele) {
    return ele !== 'all' && ele !== 'none';
  });
};

/**
 * When user presses Up key
 */

Prompt.prototype.onUpKey = function(e) {
  // if `shift` key is pressed, move the up
  if (e.key.shift === true) {
    this.moveUp();
  }
  var len = this.choices.length;
  this.selected = (this.selected > 0) ? this.selected - 1 : len - 1;
  this.render();
};

/**
 * Move the currently selected item up.
 */

Prompt.prototype.moveUp = function() {
  var idx = this.selected;
  var len = this.choices.length;
  if (idx > 0) {
    this.choices.swap(idx - 1, idx);
  } else {
    this.choices.swap(idx, len - 1);
  }
};

/**
 * When user presses Down key
 */

Prompt.prototype.onDownKey = function(e) {
  // if `shift` key is pressed, move the down
  if (e.key.shift === true) {
    this.moveDown();
  }
  var len = this.choices.length;
  this.selected = (this.selected < len - 1) ? this.selected + 1 : 0;
  this.render();
};

/**
 * Move the currently selected item down.
 */

Prompt.prototype.moveDown = function() {
  var idx = this.selected;
  var len = this.choices.length;
  if (idx < len - 1) {
    this.choices.swap(idx + 1, idx);
  } else {
    this.choices.swap(idx, 0);
  }
};

/**
 * Jump to an item in the list
 */

Prompt.prototype.onNumberKey = function(input) {
  if (input <= this.choices.length) {
    this.selected = input - 1;
  }
  this.render();
};

/**
 * Function for rendering list choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */

function listRender(choices, pointer) {
  var output = '';

  choices.forEach(function(choice, i) {
    var isSelected = (i === pointer);
    var line = (isSelected ? (symbol + ' ') : '  ')
      + (choice.type === 'separator' ? choice : choice.name);

    if (isSelected) {
      line = cyan(line);
    }
    output += line + ' \n';
  });

  return output.replace(/\n$/, '');
}

/**
 * Expose `Prompt`
 */

module.exports = Prompt;
