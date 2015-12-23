/*!
 * githubbot <https://github.com/doowb/githubbot>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Array of event types from https://developer.github.com/v3/activity/events/types/
 */

module.exports = [

  /**
   * Github webhook `commit-comment` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#commitcommentevent).
   *
   * Listen for this event registering a handler with the `.onCommitComment(fn)` method.
   * Handle events by calling the `.handleCommitComment(payload)` method.
   *
   * @name  commit-comment
   */

  'commit-comment',

  /**
   * Github webhook `create` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#createevent).
   *
   * Listen for this event registering a handler with the `.onCreate(fn)` method.
   * Handle events by calling the `.handleCreate(payload)` method.
   *
   * @name  create
   */

  'create',

  /**
   * Github webhook `delete` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#deleteevent).
   *
   * Listen for this event registering a handler with the `.onDelete(fn)` method.
   * Handle events by calling the `.handleDelete(payload)` method.
   *
   * @name  delete
   */

  'delete',

  /**
   * Github webhook `deployment` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#deploymentevent).
   *
   * Listen for this event registering a handler with the `.onDeployment(fn)` method.
   * Handle events by calling the `.handleDeployment(payload)` method.
   *
   * @name  deployment
   */

  'deployment',

  /**
   * Github webhook `deployment-status` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#deploymentstatusevent).
   *
   * Listen for this event registering a handler with the `.onDeploymentStatus(fn)` method.
   * Handle events by calling the `.handleDeploymentStatus(payload)` method.
   *
   * @name  deployment-status
   */

  'deployment-status',

  /**
   * Github webhook `download` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#downloadevent).
   *
   * Listen for this event registering a handler with the `.onDownload(fn)` method.
   * Handle events by calling the `.handleDownload(payload)` method.
   *
   * @name  download
   */

  'download',

  /**
   * Github webhook `follow` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#followevent).
   *
   * Listen for this event registering a handler with the `.onFollow(fn)` method.
   * Handle events by calling the `.handleFollow(payload)` method.
   *
   * @name  follow
   */

  'follow',

  /**
   * Github webhook `fork` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#forkevent).
   *
   * Listen for this event registering a handler the `.onFork(fn)` method.
   * Handle events by calling the `.handleFork(payload)` method.
   *
   * @name  fork
   */

  'fork',

  /**
   * Github webhook `fork-apply` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#forkapplyevent).
   *
   * Listen for this event registering a handler with the `.onForkApply(fn)` method.
   * Handle events by calling the `.handleForkApply(payload)` method.
   *
   * @name  fork-apply
   */

  'fork-apply',

  /**
   * Github webhook `gist` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#gistevent).
   *
   * Listen for this event registering a handler the `.onGist(fn)` method.
   * Handle events by calling the `.handleGist(payload)` method.
   *
   * @name  gist
   */

  'gist',

  /**
   * Github webhook `gollum` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#gollumevent).
   *
   * Listen for this event registering a handler with the `.onGollum(fn)` method.
   * Handle events by calling the `.handleGollum(payload)` method.
   *
   * @name  gollum
   */

  'gollum',

  /**
   * Github webhook `issue-comment` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#issuecommentevent).
   *
   * Listen for this event registering a handler with the `.onIssueComment(fn)` method.
   * Handle events by calling the `.handleIssueComment(payload)` method.
   *
   * @name  issue-comment
   */

  'issue-comment',

  /**
   * Github webhook `issues` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#issuesevent).
   *
   * Listen for this event registering a handler with the `.onIssues(fn)` method.
   * Handle events by calling the `.handleIssues(payload)` method.
   *
   * @name  issues
   */

  'issues',

  /**
   * Github webhook `member` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#memberevent).
   *
   * Listen for this event registering a handler with the `.onMember(fn)` method.
   * Handle events by calling the `.handleMember(payload)` method.
   *
   * @name  member
   */

  'member',

  /**
   * Github webhook `membership` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#membershipevent).
   *
   * Listen for this event registering a handler with the `.onMembership(fn)` method.
   * Handle events by calling the `.handleMembership(payload)` method.
   *
   * @name  membership
   */

  'membership',

  /**
   * Github webhook `page-build` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#pagebuildevent).
   *
   * Listen for this event registering a handler with the `.onPageBuild(fn)` method.
   * Handle events by calling the `.handlePageBuild(payload)` method.
   *
   * @name  page-build
   */

  'page-build',

  /**
   * Github webhook `public` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#publicevent).
   *
   * Listen for this event registering a handler with the `.onPublic(fn)` method.
   * Handle events by calling the `.handlePublic(payload)` method.
   *
   * @name  public
   */

  'public',

  /**
   * Github webhook `pull-request` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#pullrequestevent).
   *
   * Listen for this event registering a handler with `on-puthe `.on-pull-request(fn)` method.
   * Handle events by calling the `.handle-pull-request(payload)` method.
   *
   * @name  pull-request
   */

  'pull-request',

  /**
   * Github webhook `pull-request-review-comment` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#pullrequestreviewcommentevent).
   *
   * Listen for this event registering a handler with the `.onPullRequestReviewComment(fn)` method.
   * Handle events by calling the `.handlePullRequestReviewComment(payload)` method.
   *
   * @name  pull-request-review-comment
   */

  'pull-request-review-comment',

  /**
   * Github webhook `push` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#pushevent).
   *
   * Listen for this event registering a handler the `.onPush(fn)` method.
   * Handle events by calling the `.handlePush(payload)` method.
   *
   * @name  push
   */

  'push',

  /**
   * Github webhook `release` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#releaseevent).
   *
   * Listen for this event registering a handler with the `.onRelease(fn)` method.
   * Handle events by calling the `.handleRelease(payload)` method.
   *
   * @name  release
   */

  'release',

  /**
   * Github webhook `repository` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#repositoryevent).
   *
   * Listen for this event registering a handler with the `.onRepository(fn)` method.
   * Handle events by calling the `.handleRepository(payload)` method.
   *
   * @name  repository
   */

  'repository',

  /**
   * Github webhook `status` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#statusevent).
   *
   * Listen for this event registering a handler with the `.onStatus(fn)` method.
   * Handle events by calling the `.handleStatus(payload)` method.
   *
   * @name  status
   */

  'status',

  /**
   * Github webhook `team-add` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#teamaddevent).
   *
   * Listen for this event registering a handler with the `.onTeamAdd(fn)` method.
   * Handle events by calling the `.handleTeamAdd(payload)` method.
   *
   * @name  team-add
   */

  'team-add',

  /**
   * Github webhook `watch` event.
   * Find more information about the payload for this
   * event [here](https://developer.github.com/v3/activity/events/types/#watchevent).
   *
   * Listen for this event registering a handler with the `.onWatch(fn)` method.
   * Handle events by calling the `.handleWatch(payload)` method.
   *
   * @name  watch
   */

  'watch'
];
