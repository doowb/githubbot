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
  if (!this.hasListeners(event)) {
    return cb(null, payload);
  }
  var handlers = this.listeners(event);
  async.reduce(handlers, payload, function(acc, handler, next) {
    return handler.call(this, payload, next);
  }.bind(this), cb);
};

/**
 * Exposes `Gitbot`.
 */

module.exports = Gitbot;
