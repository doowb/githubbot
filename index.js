/*!
 * githubbot <https://github.com/doowb/githubbot>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var BaseBot = require('base-bot');
var events = require('./lib/events');

/**
 * Create a new instance of a GithubBot with provided options.
 *
 * ```js
 * var bot = new GithubBot();
 * ```
 *
 * @param {Object} `options` Options to configure the github bot.
 * @api public
 */

function GithubBot(options) {
  if (!(this instanceof GithubBot)) {
    return new GithubBot(options);
  }
  BaseBot.call(this, options);

  this.handlers(events);
}

BaseBot.extend(GithubBot);

/**
 * Exposes `GithubBot`.
 */

module.exports = GithubBot;
