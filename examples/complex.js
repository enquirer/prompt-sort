// 'use strict';

// /**
//  * Sort prompt example
//  */

// var Enquirer = require('enquirer');
// var enquirer = new Enquirer();
// enquirer.register('sort', require('..'));
// enquirer.question('colors', 'What are your favorite colors?', {
//   type: 'checkbox',
//   default: 'red',
//   pointer: '♥',
//   choices: [
//     'red',
//     'blue',
//     'yellow'
//   ]
// });

// enquirer.ask('colors')
//   .then(function(answers) {
//     console.log(answers)
//   })
//   .catch(function(err) {
//     console.log(err)
//   })

// var initialQuestions = [
//   {
//     name: 'theme',
//     message: 'Sort the themes into the order you prefer.',
//     choices: [
//       'Order a pizza',
//       'Make a reservation',
//       new inquirer.Separator(),
//       'Ask opening hours',
//       'Talk to the receptionnist'
//     ]
//   },
//   {
//     name: 'size',
//     message: 'Sort the sizes into the order you prefer.',
//     choices: [ 'Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro' ]
//   }
// ];

// // first sort the choices in each question
// sortChoices(initialQuestions, function(sortedAnswers) {

//   // build new questions based on the sorted answers
//   var questions = [];
//   questions.push({
//     name: 'theme',
//     message: 'What do you want to do?',
//     choices: sortedAnswers.theme
//   });

//   questions.push({
//     name: 'size',
//     message: 'What size do you need',
//     choices: sortedAnswers.size
//   });

//   // ask the questions using the sorted lists
//   displayChoices(questions, function(answers) {
//     console.log(JSON.stringify(answers, null, '  '));
//   });
// });

// // set the question type to `sort` on each question and prompt the user to sort the choices.
// function sortChoices(questions, cb) {
//   inquirer.prompt(questions.map(function(question) {
//     question.type = 'sort';
//     return question;
//   }), cb);
// }

// // set the question type to `list` on each question and prompt the user to pick a choice.
// function displayChoices(questions, cb) {
//   inquirer.prompt(questions.map(function(question) {
//     question.type = 'list';
//     return question;
//   }), cb);
// }
