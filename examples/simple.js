'use strict';

var colors = require('ansi-colors');
var Prompt = require('..');
var prompt = new Prompt({
  name: 'colors',
  message: 'Put the colors in order of most preferred to least.',
  choices: [
    'cyan',
    'gray',
    'blue',
    'green',
    'red',
    'white',
    'magenta',
    'dim',
    'yellow'
  ]
});

prompt.run()
  .then(function(answer) {
    console.log(answer)
    if (!answer) return;
    console.log('You\'re preferred order of colors is:');
    console.log(answer.map(function(color) {
      return colors[color](color);
    }).join('\n'));
  })
  .catch(function(err) {
    console.log(err);
  });
