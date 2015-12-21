/*!
 * githubbot <https://github.com/doowb/githubbot>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var GithubBot = require('../');

describe('githubbot', function () {
  it('should expose a function', function () {
    assert(typeof GithubBot === 'function');
  });

  it('create a new instance of GithubBot', function () {
    var bot = new GithubBot();
    assert(bot instanceof GithubBot);
    assert(typeof bot.options === 'object');
    assert(typeof bot.handle === 'function');

    assert(typeof bot.onIssue === 'function');
    assert(typeof bot.handleIssue === 'function');
    assert(typeof bot.onCommit === 'function');
    assert(typeof bot.handleCommit === 'function');
  });

  it('should handle specific methods', function(done) {
    var bot = new GithubBot();

    bot.onIssue(function(payload, cb) {
      payload.handlers.push('issue handler 1');
      payload.calls++;
      cb(null, payload);
    });

    bot.onIssue(function(payload, cb) {
      payload.handlers.push('issue handler 2');
      payload.calls++;
      cb(null, payload);
    });

    bot.onIssue(function(payload, cb) {
      payload.handlers.push('issue handler 3');
      payload.calls++;
      cb(null, payload);
    });

    bot.onCommit(function(payload, cb) {
      payload.handlers.push('commit handler 1');
      payload.calls++;
      cb(null, payload);
    });

    bot.onCommit(function(payload, cb) {
      payload.handlers.push('commit handler 2');
      payload.calls++;
      cb(null, payload);
    });

    bot.onCommit(function(payload, cb) {
      payload.handlers.push('commit handler 3');
      payload.calls++;
      cb(null, payload);
    });

    var payload = {calls: 0, handlers: []};
    bot.handleIssue(payload, function(err, results) {
      if (err) return done(err);
      assert.deepEqual(results, {calls: 3, handlers: ['issue handler 1', 'issue handler 2', 'issue handler 3']});
      bot.handleCommit(payload, function(err, results) {
        if (err) return done(err);
        assert.deepEqual(results, {
          calls: 6,
          handlers: ['issue handler 1', 'issue handler 2', 'issue handler 3', 'commit handler 1', 'commit handler 2', 'commit handler 3']
        });
        done();
      });
    });
  });
});
