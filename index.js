/*!
 * gitbot <https://github.com/doowb/gitbot>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

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
  this.listeners = {};
}

/**
 * Register an event handler to handle github webhook payloads.
 *
 * ```js
 * var issueHandler = bot.on('issue', function(payload, cb) {
 *   if (payload.action !== 'open') {
 *     return cb(null, {});
 *   }
 *   // do some work
 *   cb(null, {});
 * });
 * ```
 *
 * @param  {String} `event` Event type to add handler for.
 * @param  {Function} `handler` Handler function to handle payload when event is triggered.
 * @return {Function} Returns original handler to make it easier to remove handlers later.
 * @api public
 */

Gitbot.prototype.on = function(event, handler) {
  this.listeners[event] = this.listeners[event] || [];
  this.listeners[event].push(handler);
  return handler;
};

/**
 * Remove event handler for specified event or in all events.
 *
 * ```js
 * bot.off('issue', issueHandler);
 * ```
 *
 * @param  {String} `event` Event type to remove handler from.
 * @param  {Function} `handler` Original handler function to remove.
 * @return {Function} Original handler function.
 * @api public
 */

Gitbot.prototype.off = function(event, handler) {
  if (typeof event === 'function') {
    handler = event;
    event = null;
  }
  if (!event) {
    var events = Object.keys(this.listeners);
    for(var i = 0; i < event.length; i++) {
      if (this.off(events[i], handler)) {
        return handler;
      }
    }
    return;
  }
  var idx = this.listeners[event].indexOf(handler);
  if (idx !== -1) {
    this.listeners[event].splice(idx, 1);
    return handler;
  }
};

/**
 * Handle a payload from the github api.
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
  var handlers = this.listeners[event];
  if (!handlers || !handlers.length) {
    return cb(null, payload);
  }
  async.reduce(handlers, payload, function(acc, handler, next) {
    return handler.call(this, payload, next);
  }.bind(this), cb);
};

/**
 * Exposes `Gitbot`.
 */

module.exports = Gitbot;
