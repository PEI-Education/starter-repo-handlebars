module.exports = function (grade) {
   return grade == '' ? grade : isNaN(grade) ? grade : Math.round(parseFloat(grade));
 };