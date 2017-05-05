var isNumber = require('is-number');

// var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function swap(arr, a, b) {
  var idxa = isNumber(a) ? a : arr.indexOf(a);
  var idxb = isNumber(b) ? b : arr.indexOf(b);
  var vala = arr[idxa];
  var valb = arr[idxb];
  arr[idxa] = valb;
  arr[idxb] = vala;
  return arr;
};

// console.log(swap(arr, 'c', 'd'))
module.exports = swap;
