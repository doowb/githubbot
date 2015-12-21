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
    assert(typeof bot.listeners === 'object');
    assert(typeof bot.on === 'function');
    assert(typeof bot.off === 'function');
    assert(typeof bot.handle === 'function');
  });

  it('should add an event handler', function() {
    var bot = new Gitbot();
    var handler = bot.on('issue', function(payload, cb) {cb();});
    assert(Array.isArray(bot.listeners.issue));
    assert.equal(bot.listeners.issue.length, 1);
    assert(typeof bot.listeners.issue[0] === 'function');
    assert(bot.listeners.issue[0] === handler);
  });

  it('should remove an event handler', function() {
    var bot = new Gitbot();
    var handler = bot.on('issue', function(payload, cb) {cb();});
    assert(Array.isArray(bot.listeners.issue));
    assert.equal(bot.listeners.issue.length, 1);
    assert(typeof bot.listeners.issue[0] === 'function');
    assert(bot.listeners.issue[0] === handler);

    var removedHandler = bot.off('issue', handler);
    assert(Array.isArray(bot.listeners.issue));
    assert.equal(bot.listeners.issue.length, 0);
    assert(typeof bot.listeners.issue[0] === 'undefined');
    assert(bot.listeners.issue[0] !== handler);
    assert(removedHandler === handler);
  });

  it('should remove correct event handler', function() {
    var bot = new Gitbot();
    var handler1 = bot.on('issue', function(payload, cb) {cb();});
    var handler2 = bot.on('issue', function(payload, cb) {cb();});
    var handler3 = bot.on('issue', function(payload, cb) {cb();});
    var handler4 = bot.on('issue', function(payload, cb) {cb();});
    var handler5 = bot.on('issue', function(payload, cb) {cb();});

    assert(Array.isArray(bot.listeners.issue));
    assert.equal(bot.listeners.issue.length, 5);
    assert(typeof bot.listeners.issue[0] === 'function');
    assert(typeof bot.listeners.issue[1] === 'function');
    assert(typeof bot.listeners.issue[2] === 'function');
    assert(typeof bot.listeners.issue[3] === 'function');
    assert(typeof bot.listeners.issue[4] === 'function');
    assert(bot.listeners.issue[0] === handler1);
    assert(bot.listeners.issue[1] === handler2);
    assert(bot.listeners.issue[2] === handler3);
    assert(bot.listeners.issue[3] === handler4);
    assert(bot.listeners.issue[4] === handler5);

    var removedHandler = bot.off('issue', handler2);
    assert(Array.isArray(bot.listeners.issue));
    assert.equal(bot.listeners.issue.length, 4);
    assert(typeof bot.listeners.issue[0] === 'function');
    assert(typeof bot.listeners.issue[1] === 'function');
    assert(typeof bot.listeners.issue[2] === 'function');
    assert(typeof bot.listeners.issue[3] === 'function');
    assert(bot.listeners.issue[0] === handler1);
    assert(bot.listeners.issue[1] === handler3);
    assert(bot.listeners.issue[2] === handler4);
    assert(bot.listeners.issue[3] === handler5);
    assert(removedHandler === handler2);
  });

  it('should handle an event', function(done) {
    var bot = new Gitbot();
    var handler = bot.on('issue', function(payload, cb) {
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
    var handler1 = bot.on('issue', function(payload, cb) {
      payload.handlers.push('handler 1');
      payload.calls++;
      cb(null, payload);
    });
    var handler2 = bot.on('issue', function(payload, cb) {
      payload.handlers.push('handler 2');
      payload.calls++;
      cb(null, payload);
    });
    var handler3 = bot.on('issue', function(payload, cb) {
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
