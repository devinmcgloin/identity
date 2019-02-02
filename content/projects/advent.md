---
layout: project
title: Adventure
excerpt: "Adventure is a port of the classic terminal game Colossal Cave Adventure to modern chat clients."
custom-media: true
custom-media-dir: advent
gradient: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
permalink: "/advent/"
date: "2016-05-23"
repo: devinmcgloin/advent
license: MIT
---

Adventure is a port of the classic terminal game
[Colossal Cave Adventure](https://en.wikipedia.org/wiki/Colossal_Cave_Adventure)
to modern chat clients. Adventure is available on both FB messenger
and Telegram.

<div class="tc w-100 mb2">
    <a href="https://m.me/adventerm" class="bn">
        <img src="/advent/messenger.png"/>
    </a>
</div>

<div class="tc w-100">
    <a href="https://telegram.me/cave_adventure_bot" class="bn">
        <img src="/advent/telegram.png"/>
    </a>
</div>

The content of the game is mostly the same as the original released in
1976, it even runs off the same data file! I have however made a few
necessary changes to how a user interacts with the game:

 * Messages are sent in true case as opposed to the original uppercase.
 * Messages are spaced out in order to make the game feel more natural
   in messaging clients.
 * Info and instruction commands have changed in order to allow people
   to restart the game, and activate other game mechanics that would
   ordinarily be changed in the terminal.

It is built with [Smooch](https://smooch.io) to manage messaging and
deployed on [Heroku](https://heroku.com). Source is available on
[Github](https://github.com/devinmcgloin/advent). Please reach out to
[Devin McGloin](https://twitter.com/devinmcgloin) with any feedback.

## Usage

<div class="ph3">
  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">You are standing at the end of a road before a small brick building.</dd>
  </dl>

  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">Around you is a forest.</dd>
  </dl>

  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">A small stream flows out of the building and down a gully.</dd>
  </dl>

  <dl class="lh-title mv2">
    <dt class="dib b">You:</dt>
    <dd class="dib ml0 gray">building</dd>
  </dl>

  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">You are inside a building, a well house for a large spring.</dd>
  </dl>

  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">There are some keys on the ground here.</dd>
  </dl>

  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">There is a shiny brass lamp nearby.</dd>
  </dl>
  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">There is food here.</dd>
  </dl>
  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">There is a bottle of water here.</dd>
  </dl>
  <dl class="lh-title mv2">
    <dt class="dib b">You:</dt>
    <dd class="dib ml0 gray">get keys</dd>
  </dl>
  <dl class="lh-title mv2">
    <dt class="dib b">Advent:</dt>
    <dd class="dib ml0 gray">Ok</dd>
  </dl>
</div>

## Contributions

* Willie Crowther for originally developing the game.
* Don Woods for adding many of the features of the current program.
* [Brandon Rhodes](http://rhodesmill.org/brandon/) for his
  implementation of Colossal Cave Adventure. It can be found on PyPI
  and [Github](https://github.com/brandon-rhodes/python-adventure).
* [Como el buen vino studio](https://thenounproject.com/term/lantern/87141/)
  in Spain for the lantern logo.
