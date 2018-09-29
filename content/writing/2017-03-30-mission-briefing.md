---
title: Mission Briefing
date: '2017-03-30'
excerpt: "What I'd like to do here is
give a sense of my own direction and focus. I've gone into this a little bit in
my about page, but I'd like to expand a bit on the core themes, explain their
importance and my thoughts on how they play out in the market place."
category: Computing
tags:
    - Augmenting Human Intellect
    - Software Design
    - Human Computer Interaction
layout: 'post'
---
By most interpretations it's rather silly to call this a mission briefing. There
is not a formal mission, nor are the concrete objectives. With missions,
objectives do not change and their scope is limited. What I'd like to do here is
give a sense of my own direction and focus. I've gone into this a little bit in
my about page, but I'd like to expand a bit on the core themes, explain their
importance and my thoughts on how they play out in the market place.

One of the most important single beliefs I hold is that computation can augment
the human mind. Historically tools have always allowed us to manipulate the
world around us easier and probe the universe with greater accuracy. Computers
and Mathematics allow us to augment the models by which we think about the
world, and therefore are incredibly useful aides in addressing the problems and
issues that face us. We've made a substantial amount of progress in this area in
the past 60 years. We can communicate far more easily they would could in the
late 60s and we use computers to inform nearly every technical question we have.
However, as I'll get into later, there is still an immense amount of work to be
done.

If we look back to the history of Computer Science it's clear that there exists
an immense amount of ways to approach programming a solution to any problem.
We're just now starting to see services that implement a similar design to
[Grail (1968)](https://www.youtube.com/watch?v=QQhVQ1UG6aM), but they are few
and far in-between. In the late 60s we didn't really know what computation was
about and as a result we tried a lot of different ways to model a computers
actions. Now it seems like the vast majority of technologists have forgotten
that there are always other ways of solving a problem. It's important to
consider the possible ways to represent the problem and remember that Computer
Science is still a relatively new field.

In 1963 Ivan Sutherland demonstrated
[Sketchpad](https://www.youtube.com/watch?v=57wj8diYpgY), a general purpose
drawing application that included a constraint solver. With Sketchpad you could
create template objects, instantiate them, and define rules regarding how they
behaved when deformed or combined. Since 1963, we've created thousands of
specific editors for specific purposes. Instead of using a general purpose tool,
you use Autocad, Sketch or Photoshop to do your work. Each comes with their own
file formats as well as their own slant on how to model the problem of making 3D
models or Graphic Designs. I believe that the general solution is more powerful
and useful then the specific one. Similar to how programming languages have
general interfaces, **programs at a higher level ought to be able to
communicate to each other and share functionality**.

We increasingly turn to software to answer our questions, Bret Victor has a
great paragraph about our increased dependence on software in his essay Magic
Ink:

> People turn to software to learn the meaning of words, learn which countries
> were bombed today, and learn to cook a paella. They decide which music to play,
> which photos to print, and what to do tonight, tomorrow, and Tuesday at 2:00.
> They keep track of a dozen simultaneous conversations in private correspondence,
> and maybe hundreds in public arenas. They browse for a book for Mom, a coat for
> Dad, and a car for Junior. They look for an apartment to live in, and a bed for
> that apartment, and perhaps a companion for the bed. They ask when the movie is
> playing, and how to drive to the theater, and where to eat before the movie, and
> where to get cash before they eat. They ask for numbers, from simple sums to
> financial projections. They ask about money, from stock quote histories to bank
> account balances. They ask why their car isn’t working and how to fix it, why
> their child is sick and how to fix her. They no longer sit on the porch
> speculating about the weather—they ask software.

It's important to consider the role software plays in our day to day lives. As
software begins to permeate our day to day lives, this question of how software
interfaces with each other becomes increasingly important. **Most critically
the questions that we can ask of software are limited by how the program is
designed.** There are two responses to this realization, either everyone learns
to code or software has to somehow become more flexible. I am firmly in the
second camp.

## Taking Stock

If we look at the software we've made up till this point, we've been incredibly
successful in two areas, Communication Software and domain specific Manipulation
Software. The scale at which we can communicate with each other is staggering,
although much of such communication (including this post!) is dominated by text.
The software we use to manipulate content is generally domain specific, we have
editors for images, videos, text, slides, or grids of cells but not generalized
editors for content.

While these domains fall neatly into a specific business use case, they are all
either about conveying an idea to a coworker or understanding a piece of data.
While specific tools for professionals ought to exist — and I'm glad they do —
most people reach for the tool that is overkill for their purpose. If you are
designing a billboard, by all means use Illustrator or Photoshop, but if you're
sketching out a concept or teaching a coworker something, chances are the tool
you're using is overkill for that task.

The web in many ways was supposed to solve this problem, hypertext (HTML) was
supposed to allow for manipulation of content and dynamic content. Instead what
we've found to be the case is that the content itself stays static, while the
page is merely a vehicle for content that is not computational. For example on
Youtube, the videos are the content and a static, the webpage is a delivery
mechanism for the traditional content. This is the case across the vast majority
of websites, with the exception being graphics experiences, or interactive
infographics.

## Problems

### Outdated Constraints

Essentially we are continuing to enforce constraints on our software that are
limiting the medium. While these constraints may have allowed for the program to
be workable in the past, those choices ought not to impose on the flexibility of
the software once they are not needed.

### Malleable Software

Software is essentially constrained to what the programmer designed it to
accomplish, while all software follows this essential law, some have less
restrictions than others. It's important to refocus on what we really want,
which is software that is malleable to the end user and does not restrict the
types of questions they can ask. Physical goods that people enjoy using are
malleable as well, they conform and adapt to how the person uses them. Clothing
and boots are broken in, furniture holds other items, and cars are modified to
tow a trailer or carry a Christmas tree on top.

Most people don't have the same sense of ownership over their software, the
physical equivalent is working with immense opaque spheres. There does not exist
any means of changing the interfaces, or making the software your own. If you'd
like two spheres to work together the best you can accomplish is placing them
closer together, if you want to modify the functionality the best case scenario
is to affix a change with force of will and copy + paste.

With physical goods there is a notion of building something new from components,
from various furniture you build a living room, from different components you
create a outfit. There is no such composition with software, and as a result you
can not create anything new, or consider an alternative way of doing things. As
a result people are locked into various alternative world views, but have no
means to create their own.

### Communicating Goals

Communicating goals is an incredibly difficult endeavor, but it seems as thought
there is progress being made here. But first, what is exactly valuable about
communicating a goal to a computer? Fundamentally UI is about communicating
intention. However with a UI we first consider how the software has represented
the problem, then make actions that convey our intentions within that model.
Communicating goals is the inverse of this interaction, instead of internalizing
the model the software has chosen, we instead signal our own goals and
intentions and the software reasons about the best way to achieve those goals.
This model of interaction is immensely more powerful than poking a grid of
pixels, as it places the burden on understanding the model on the machine,
instead of on the user.

However, this seems like a pipe dream. If such a machine existed all problems in
the field of Human Computer Interaction would be solved. So the question is how
far away are we, and will we ever arrive? While I do not have definitive answers
for these questions — and I doubt anyone does — I am confident that we are
making substantial progress. Systems like The Wolfram Language illustrate a deep
knowledge about the objects in the world and the computations can be done with
them. The first step towards representing goals is to represent the objects
goals are defined in, and in that regard we've made meaningful progress.

## The Market

If the vision that I've outlined above is so superb why is it that this isn't
the world we live in? What factors and incentives are a play that are keeping
this vision from being a reality?

First, and perhaps most importantly, value is only created when a significant
number of companies adopt. If few other companies adopt you have wasted time and
resources developing a technology that serves no purpose. Furthermore you cannot
expect to start such a project knowing if others will adopt the technology.

Currently there is no market demand for such communication across products and
services. Users have no idea that things could possibly work in such a manner
and therefore also have zero expectations that they do. No user looks at a
companies effort and laments the lack of compatibility or expects them to do
better in this regard. The majority of users are focused on features and GUI
updates, not interfacing with other programs.

Beyond these issues, the incentives fundamentally skew towards increasing
switching costs in order to maintain a current market cap. Once you have a user
paying for your product why would you make it easier for them to switch to a
competitor? Companies want their software to be defensible, and allowing people
to move data across products is the antithesis of having a moat.

Traditionally the only plan of attack was to create your own standards and
standard representations. This rarely works, with the notable exception of open
source code and standards. Bringing the same values into the product discussion
is a different task altogether and the last thing I want to do is create a
standard to rule all standards.

## A possible plan of attack

This is not so much a plan of attack as it is a list of interesting paths to be
explored.

### Computational Building Blocks

In order for people to feel comfortable with computation the model has to make
logical sense. We ought to strive to make computers operate in a manner that is
naturally expected and logical to the end user. We've made some really
outstanding progress in this area, but there's more to do. One area that is
lacking is in making software compose and work together with other software.
Computational Building Blocks is the notion that all pieces of logic can be
combined together to form more novel and specific software that can in turn
solve more specific problems. Of course you want to do this without breaking
down the high level abstractions to the end user. Some software already does a
great job of modeling the problem in a way that matches closely how their users
think about it, but those applications are not malleable, and certainly are not
the norm. Making everything a block that builds upon each other allows for
modularity and malleability. It also allows users to ask questions that they
would not be able to ask otherwise.

### What needs to be known?

Another way to think about the problems in HCI is through the lens of what needs
to be known to complete a certain task. For example in order to send an email
you need a email address, credentials to send an email from that address,
recipients, a message body and so on. If the system knows you need to do
something and in order to complete that task it needs a few pieces of data, the
system should only ask for those items. It shouldn't ask for things it already
knows, therefore focusing on the novel information to the task you're trying to
perform. This can be applied to more complicated problems as well, the user may
even provide an indication of what computation path would be the most fruitful
for achieving a specific task. However the system is always working in a goal
framework, and is solving for the goal with a given set of computational
constraints.

As computing becomes more complicated and heterogeneous these constraints will
become more important as programs could be running across multiple machines
working towards the same goal. The key for the end user, is that the computer
works towards a task you provide and you help it along the way. The computer
takes care of the computer aspects, while they provide the goal and information
needed.

## Wrapping up

Of course nothing I've said here is easy to fix, but I do think it is worthwhile
to spend time working towards such a future. If we don't most people will not
feel empowered by software. Instead of creating they will consume, instead of
exploring they will watch, and perhaps worst of all it will become exceedingly
difficult to cope with the deluge of information and data that can only be made
sense of by computing.

Perhaps you think this is fruitless, or a naive quest from someone without
enough years under his belt. If you do, reach out and tell me why. If you agree
and think this is worthwhile to spend time considering, reach out, I'd be
interested to hear your perspective as well.

