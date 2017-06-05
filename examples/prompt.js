var Prompt = require('..');
var prompt = new Prompt({
  name: 'letters',
  message: 'Sort letters',
  choices: ['AAA', 'BBB', 'CCC']
});

prompt.run()
  .then(function(answer) {
    console.log({letters: answer});
  })
  .catch(function(err) {
    console.log(err);
  });
