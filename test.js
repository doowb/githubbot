/*!
 * gitbot <https://github.com/doowb/gitbot>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var Gitbot = require('./');

describe('gitbot', function () {
  it('should expose a function', function () {
    assert(typeof Gitbot === 'function');
  });

  it('create a new instance of Gitbot', function () {
    var bot = new Gitbot();
    assert(bot instanceof Gitbot);
    assert(typeof bot.options === 'object');
    assert(typeof bot.handle === 'function');
  });

  it('should handle an event', function(done) {
    var bot = new Gitbot();
    bot.on('issue', function(payload, cb) {
      payload.calls++;
      cb(null, payload);
    });
    var payload = {calls: 0};
    bot.handle('issue', payload, function(err, results) {
      if (err) return done(err);
      assert.deepEqual(results, {calls: 1});
      done();
    });
  });

  it('should call multiple handlers for an event', function(done) {
    var bot = new Gitbot();
    bot.on('issue', function(payload, cb) {
      payload.handlers.push('handler 1');
      payload.calls++;
      cb(null, payload);
    });
    bot.on('issue', function(payload, cb) {
      payload.handlers.push('handler 2');
      payload.calls++;
      cb(null, payload);
    });
    bot.on('issue', function(payload, cb) {
      payload.handlers.push('handler 3');
      payload.calls++;
      cb(null, payload);
    });
    var payload = {calls: 0, handlers: []};
    bot.handle('issue', payload, function(err, results) {
      if (err) return done(err);
      assert.deepEqual(results, {calls: 3, handlers: ['handler 1', 'handler 2', 'handler 3']});
      done();
    });
  });
});
