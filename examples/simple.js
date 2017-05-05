'use strict';

var colors = require('ansi-colors');
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('sort', require('..'));
enquirer.question('colors', {
  type: 'sort',
  name: 'colors',
  message: 'Put the colors in order of most preferred to least.',
  choices: [
    'black',
    'blue',
    'green',
    'red',
    'white',
    'yellow'
  ]
});

enquirer.ask('colors')
  .then(function(answers) {
    console.log('You\'re preferred order of colors is:');
    console.log(answers.colors.map(function(color) {
      return colors[color](color);
    }).join('\n'));
  })
  .catch(function(err) {
    console.log(err);
  });
