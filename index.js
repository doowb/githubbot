/*!
 * gitbot <https://github.com/doowb/gitbot>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods');
var async = require('async');

/**
 * Create a new instance of a Gitbot with provided options.
 *
 * ```js
 * var bot = new Gitbot();
 * ```
 *
 * @param {Object} `options` Options to configure the github bot.
 * @api public
 */

function Gitbot(options) {
  if (!(this instanceof Gitbot)) {
    return new Gitbot(options);
  }
  this.options = options || {};
  Base.call(this);
}

Base.extend(Gitbot);

/**
 * Handle a payload from the github api. The `payload` will be passed to all registered handlers. Handlers may
 * modify the `payload` and return it in their `callback`. The aggregated results will be returned in the `handle` `callback`.
 *
 * ```js
 * bot.handle('issue', payload, function(err, results) {
 *   if (err) return console.error(err);
 *   console.log(results);
 * });
 * ```
 *
 * @param  {String} `event` Event type from github webhooks to handle.
 * @param  {Object} `payload` Payload object from github webhooks.
 * @param  {Function} `cb` Callback to notify call when finished handling payload.
 * @api public
 */

Gitbot.prototype.handle = function(event, payload, cb) {
  if (!this.hasListeners(event)) {
    return cb(null, payload);
  }
  var handlers = this.listeners(event);
  async.reduce(handlers, payload, function(acc, handler, next) {
    return handler.call(this, payload, next);
  }.bind(this), cb);
};

/**
 * Add a specific `on` and `handle` methods for an event.
 *
 * ```js
 * bot.handler('issue');
 * bot.onIssue(function(payload, cb) { cb(null, payload); });
 * bot.handleIssue(payload, function(err, results) {
 *   if (err) return console.error(err);
 *   console.log(results);
 * });
 * ```
 *
 * @param  {String} `method` Name of the methods to add.
 * @return {Object} `this` for chaining.
 * @api public
 */

Gitbot.prototype.handler = function(method) {
  var name = namify(method);
  this.define('on' + name, function(fn) {
    return this.on(method, fn);
  });

  this.define('handle' + name, function(payload, cb) {
    this.handle(method, payload, cb);
  });
  return this;
};

/**
 * Add a specific `on` and `handle` methods for an array of events.
 *
 * ```js
 * bot.handlers(['issue', 'commit']);
 *
 * bot.onIssue(function(payload, cb) { cb(null, payload); });
 * bot.onCommit(function(payload, cb) { cb(null, payload); });
 *
 * bot.handleIssue(payload, function(err, results) {
 *   if (err) return console.error(err);
 *   console.log(results);
 * });
 *
 * bot.handleCommit(payload, function(err, results) {
 *   if (err) return console.error(err);
 *   console.log(results);
 * });
 * ```
 *
 * @param  {String|Array} `methods` Array of method names to add.
 * @return {Object} `this` for chaining.
 * @api public
 */

Gitbot.prototype.handlers = function(methods) {
  methods = arrayify(methods);
  methods.forEach(this.handler.bind(this));
  return this;
};

function namify(name) {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

function arrayify(obj) {
  if (!obj) return [];
  return Array.isArray(obj) ? obj : [obj];
}

/**
 * Exposes `Gitbot`.
 */

module.exports = Gitbot;
