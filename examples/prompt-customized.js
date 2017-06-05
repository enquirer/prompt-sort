var colors = require('ansi-colors');
var Prompt = require('..');
var prompt = new Prompt({
  name: 'colors',
  message: 'Sort colors from most to least favorite',
  choices: [
    'green',
    'red',
    'yellow'
  ]
});

var keys = prompt.choices.keys.slice();
prompt.choices.options.format = function(line) {
  var name = /\w+/.exec(line);
  return name ? colors[name[0]](line) : line;
};

prompt.run()
  .then(function(answer) {
    if (!answer) return;
    console.log(colors.underline('Preferred colors'));
    console.log(answer.map(function(color, i) {
      var idx = keys.indexOf(color) + 1;
      return (i + 1) + '. ' + colors[color](color) + ' (' + idx + ')';
    }).join('\n'));
  })
  .catch(function(err) {
    console.log(err);
  });
