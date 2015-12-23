'use strict';
var fs = require('fs');
var jscomments = require('js-comments');

module.exports = function(fp) {
  try {
    var contents = fs.readFileSync(fp, 'utf8');
    var comments = jscomments.parse(contents);
    return filter(comments).map(function(item) {
      return [
        (item.name ? '### ' + item.name + '\n' : '') + '\n' + item.lead + item.description,
        (item.name ? '\n' + makeExample(item.name) : ''),
      ].join('\n');
    }).join('\n');
  } catch (err) {
    console.log('ERROR:', err);
    return '';
  }
};

/**
 * Filter out Copyright comments (this code is from `helper-apidocs`)
 */

function filter(arr) {
  return arr.filter(function(ele, i) {
    var comment = ele.comment;
    if (/Copyright/.test(comment.content) && i === 0) {
      return false;
    }
    return true;
  });
}

function makeExample(name) {
  return [
    '```js',
    '// listen for ' + name + ' events.',
    'bot.on' + namify(name) + '(function(payload, cb) {',
    '  // handle payload',
    '  cb(null, payload);',
    '});',
    '',
    '// handle a payload for the ' + name + ' event.',
    'bot.handle' + namify(name) + '(payload, function(err, results) {',
    '  if (err) return console.log(err);',
    '  console.log(results);',
    '});',
    '```'
  ].join('\n');
}


function camelcase(str) {
  if (str.length === 1) {
    return str.toLowerCase();
  }
  str = str.replace(/^[\W_]+|[\W_]+$/g, '').toLowerCase();
  return str.replace(/[\W_]+(\w|$)/g, function(_, ch) {
    return ch.toUpperCase();
  });
}

function namify(str) {
  str = camelcase(str);
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
