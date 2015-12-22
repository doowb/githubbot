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

    assert(typeof bot.onCommitComment === 'function');
    assert(typeof bot.handleCommitComment === 'function');
    assert(typeof bot.onCreate === 'function');
    assert(typeof bot.handleCreate === 'function');
    assert(typeof bot.onDelete === 'function');
    assert(typeof bot.handleDelete === 'function');
    assert(typeof bot.onDeployment === 'function');
    assert(typeof bot.handleDeployment === 'function');
    assert(typeof bot.onDeploymentStatus === 'function');
    assert(typeof bot.handleDeploymentStatus === 'function');
    assert(typeof bot.onDownload === 'function');
    assert(typeof bot.handleDownload === 'function');
    assert(typeof bot.onFollow === 'function');
    assert(typeof bot.handleFollow === 'function');
    assert(typeof bot.onFork === 'function');
    assert(typeof bot.handleFork === 'function');
    assert(typeof bot.onForkApply === 'function');
    assert(typeof bot.handleForkApply === 'function');
    assert(typeof bot.onGist === 'function');
    assert(typeof bot.handleGist === 'function');
    assert(typeof bot.onGollum === 'function');
    assert(typeof bot.handleGollum === 'function');
    assert(typeof bot.onIssueComment === 'function');
    assert(typeof bot.handleIssueComment === 'function');
    assert(typeof bot.onIssues === 'function');
    assert(typeof bot.handleIssues === 'function');
    assert(typeof bot.onMember === 'function');
    assert(typeof bot.handleMember === 'function');
    assert(typeof bot.onMembership === 'function');
    assert(typeof bot.handleMembership === 'function');
    assert(typeof bot.onPageBuild === 'function');
    assert(typeof bot.handlePageBuild === 'function');
    assert(typeof bot.onPublic === 'function');
    assert(typeof bot.handlePublic === 'function');
    assert(typeof bot.onPullRequest === 'function');
    assert(typeof bot.handlePullRequest === 'function');
    assert(typeof bot.onPullRequestReviewComment === 'function');
    assert(typeof bot.handlePullRequestReviewComment === 'function');
    assert(typeof bot.onPush === 'function');
    assert(typeof bot.handlePush === 'function');
    assert(typeof bot.onRelease === 'function');
    assert(typeof bot.handleRelease === 'function');
    assert(typeof bot.onRepository === 'function');
    assert(typeof bot.handleRepository === 'function');
    assert(typeof bot.onStatus === 'function');
    assert(typeof bot.handleStatus === 'function');
    assert(typeof bot.onTeamAdd === 'function');
    assert(typeof bot.handleTeamAdd === 'function');
    assert(typeof bot.onWatch === 'function');
    assert(typeof bot.handleWatch === 'function');
  });

  it('should handle specific methods', function(done) {
    var bot = new GithubBot();

    bot.onIssues(function(payload, cb) {
      payload.handlers.push('issue handler 1');
      payload.calls++;
      cb(null, payload);
    });

    bot.onIssues(function(payload, cb) {
      payload.handlers.push('issue handler 2');
      payload.calls++;
      cb(null, payload);
    });

    bot.onIssues(function(payload, cb) {
      payload.handlers.push('issue handler 3');
      payload.calls++;
      cb(null, payload);
    });

    bot.onCommitComment(function(payload, cb) {
      payload.handlers.push('commit handler 1');
      payload.calls++;
      cb(null, payload);
    });

    bot.onCommitComment(function(payload, cb) {
      payload.handlers.push('commit handler 2');
      payload.calls++;
      cb(null, payload);
    });

    bot.onCommitComment(function(payload, cb) {
      payload.handlers.push('commit handler 3');
      payload.calls++;
      cb(null, payload);
    });

    var payload = {calls: 0, handlers: []};
    bot.handleIssues(payload, function(err, results) {
      if (err) return done(err);
      assert.deepEqual(results, {calls: 3, handlers: ['issue handler 1', 'issue handler 2', 'issue handler 3']});
      bot.handleCommitComment(payload, function(err, results) {
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
