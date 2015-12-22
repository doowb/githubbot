'use strict';
var fs = require('fs');

module.exports = function(fp) {
  try {
    var contents = fs.readFileSync(fp, 'utf8');
    return [
      '\n````js',
      contents,
      '````'
    ].join('\n');
  } catch (err) {
    return '';
  }
};
