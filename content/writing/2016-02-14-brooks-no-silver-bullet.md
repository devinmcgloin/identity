---
layout: paper
author: Fred Brooks
category: paper
date: '2016-02-14'
title: No Silver Bullet
source: 'http://papers.devinmcgloin.com/worrydream/Brooks-NoSilverBullet.pdf'
year: 1986
excerpt: Programming, Brooks argues, can be separated into distinct tasks. The first is dealing with incidental complexity, and the second managing essential complexity. Brooks asks, How do we approach incedental complexity, and do those approaches have limits? What is the way forward to make the essential logic easier to manage?
image: './brooks.jpg'
tags:
  - Management
  - Software Engineering
---

[Brooks](https://en.wikipedia.org/wiki/Fred_Brooks) asserts that:

> There is no single development, in either technology or management technique,
> which by itself promises even one order of-magnitude improvement within a
> decade in productivity, in reliability, in simplicity.

Brooks is primarily concerned with programmer productivity, which is a critical
topic as software is becoming far more complex and therefore the number of ways
in which it can fail is also increasing dramatically. We're far past the point
where a single person can understand the whole environment in which they work.

Programming, Brooks argues, can be separated into distinct tasks. The first is
dealing with incidental complexity, and the second managing essential
complexity. We'd like to spend as much time as possible on the essential tasks,
than on the incidental.

Software projects will always be complex, as what makes software useful is it's
complexity. Brooks argues that:

> The essence of a software entity is a construct of interlocking concepts, data
> sets, relationships among data items, algorithms, and invocations of
> functions. The essence is abstract ... but is nonetheless highly precise and
> richly detailed.

## Does it have to be hard?
The hard part about software is figuring out how these concepts relate, not the
actual act of programming. It's fundamentally about getting the relationships
between complex items right. This is what Brooks considers to be the essential
acts of programming.

Brooks focuses on a few aspects that make programming especially difficult.

### Complexity
Brooks starts by asserting that software systems are far more complex than any
other human system. This is compounded by our inability to see their actions, or
understand the system visually. Common programming principles like
[DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) focus on code reuse,
this means that each item in a software system is unique.

In a physical system, repetition of common parts is far more common, and
therefore results in a system that is much easier to understand despite its high
number of moving parts. Take a car for example, say a car is composed of 100,000
parts. We can safely ignore 2/5 of those, due to repetition from the left side
and the right. Furthermore, common items like bolts, or bushings don't really
need to be understood, so perhaps we can remove another 1/3. This brings our
total part count to around 40,000. And that is of course a rough estimation.

Currently, my `usr` directory contains 18,843 directories, and 237,244 files.
That isn't even the count of total functions that exist on my computer, which is
probably at least 10 times the number of files, so around 2,372,440. That's a
whole lot of functions, my guess is there are probably a bit more than that.

If we go a step further an look at the total number of files on my computer to
allow it to "do its thing", you get a mind boggling number of files, 2,399,961
to be exact on my machine. Though this includes data files, so it's not really a
fair estimate, but you get the idea.

Software is really complex, as things increase in complexity and also size, it
becomes increasingly more difficult for people to understand the system, and
talk about it with any authority. The possible state space for the system also
increases dramatically. If a system have 500,000 possible states, you can't
really prove all of them to be safe, much to the lament of
[Dijkstra](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD361.html)
and
[Lamport](http://papers.devinmcgloin.com/worrydream/Lamport%20-%20The%20Future%20of%20Computing%20-%20Logic%20or%20Biology.pdf).
Brooks wonders how we will combat complexity going forward.

### Conformity
Unlike physics software objects have no fundamental principles upon which they
can rest. And therefore, each software artifact must be evaluated in isolation.
This makes each evaluation many times more difficult, as you cannot treat any
two functions as truly equivalent until they have both been thoroughly
investigated. As you can imagine, this slows things down enormously.


### Changeability
The fact that software is adapted throughout its life time is another source of
complexity. Most physical products, argues Brooks, are not changed after
manufacturing. Software, on the other hand, is guaranteed to require patches,
and updates on a somewhat regular basis. Software is also constantly being
pushed towards the edge of its use case, as popular software is often used in
domains it was not explicitly designed for. Thus, developers feel the desire to
support that additional functionality, and the software is no longer tailored
towards a very specific use case.

In some ways this is what's nice about the [Unix
Philosophy](http://www.catb.org/esr/writings/taoup/html/ch01s06.html).

1. Programs should do one thing and do it well.
2. Expect the output of every program to become the input to another, as yet
   unknown, program.

This principles allow for small utilities to be pulled together through piping
the output of one into the input of another.

### Invisibility
Software is also hard because we can't see it. We have to manipulate everything
inside our own heads, which leads to mistakes and conceptual errors. There is
also no easy way to represent the content of a program in space. Object Oriented
Languages can have [UML
Diagrams](https://en.wikipedia.org/wiki/Unified_Modeling_Language) but these
don't really solve the problem, as they're static and focus on class design, not
how the program interacts dynamically. I've been working towards a better way to
visualize outputs of functions called [vtest](/vtest), but visualizing programs
is a **hard** problem.

## Past Gains
Most gains have come from removing artificial barriers, and by their very nature
these approaches limit themselves.

### High Level Languages
High level languages abstract away repeated patterns. Chances are you're going
to have to read in a file more than once, this operation is going to be very
very similar each time you want to execute that procedure. In this case you
should not have to rewrite a bespoke function to accomplish an essential
repetitive task.

Similarly the language allows the best version of each pattern to be used by
everyone without any additional cost. Most incidental complexity comes in the
form of rewriting the same patterns, and dealing with solved problems. This is a
huge benefit, and increases productivity, according to Brooks estimation, by a
factor of 5.

### Time-Sharing
Time-sharing is not appreciated as much as it was during its introduction in the
early 1960s. [Multics](https://en.wikipedia.org/wiki/Multics) was the first of
such systems, and if you're not familiar with the concept
[Computerphile](https://www.youtube.com/channel/UC9-y-6csu5WGm29I7JiwpnA) has an
excellent video on the topic: [Mainframes and the Unix
Revolution](https://www.youtube.com/watch?v=-rPPqm44xLs).

Time-Sharing essentially allows for multiple users to get back results from the
programs in minutes rather than days. This delay time resulted in quicker
iteration for programers, and therefore increased efficiency. Currently of
course, the response time is nearly immediate, and yet programming is still
difficult. Brooks expands on time sharing, noting that as the time decreases the
amount of benefit also decreases.

### Unified programming environments
Unified programming environments like [Unix](https://en.wikipedia.org/wiki/Unix)
and [Interlisp](https://en.wikipedia.org/wiki/Interlisp), provided consistent
metaphors and support for common tasks. This results in decreased computational
overhead for the programmer, and results in programs that can easily be
[composed](#changeability).

## Future Steps
Brooks contemplates future ways in which we can address common issues, and
considers if those solutions address incidental or essential complexity. I'm not
going to go into all these approaches, but if one piques your interest take a
look at the full text.

|     |                       |                        |
|:----|:----------------------|:-----------------------|
| OOP | Automatic Programming | Environments and Tools |
| AI  | Graphical Programming | Workstations           |
| Ada | Expert Systems        | Program Verification   |

## Attacks on Essential Complexity
Brooks believes that the conceptual aspects of programming are taking the
majority of the time. Therefore, he focuses on methodologies to limit either the
amount of time spent on a task, or how often it has to be accomplished.

### Buy not Build
Brooks notes that "_The most radical possible solution for constructing software
is to not construct it at all._" Therefore, when a simple off the shelf solution
exists, use it! Even if it's not done exactly the way you would like, its better
to use a well tested, proven solution the embarking to reinvent the wheel.
Brooks, I'm sure, would look at the
[FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software) solutions we
have today and be delighted in the amount of code reuse.

Brooks elaborates that most use cases are not significantly different from each
other, resulting in generic products that each user can integrate into their
workflow. The key is keeping these products small and modular, which allows for
much easier composition.

### Rapid prototyping
One of the most difficult tasks when working on a software project is deciding
what exactly to build, and how the user interacts with it. It's much easier to
start small in this case, and get feedback quickly.

Rapid prototyping has also become more and more prevalent, as programmers and
Designers have warmed up to the idea of showing people Minimum Viable Products,
that the users can interact with. This gives excellent feedback to keep the
software in light with the goals of the users.

### Incremental Growing, not building.
Brooks argues that software should be _grown_ organically.

> I still remember the jolt I felt in 1958 when I first heard a friend talk
> about _building_ a program, as opposed to _writing_ one. In a flash he
> broadened my whole view of the software process.

Brooks however thinks the building metaphor is not well equipped to handle the
current projects we're developing. Instead of building, which requires adequate
plans and foresight, we should focus on growing a program organically. Once even
a very simple program is up and running, developers are much more enthusiastic
about the progress.

### Great Designers
In order to develop better systems, we must have better designers. It's not
surprising that great designers produce software that is elegant, simple and
cohesive. Great designers have a vision regarding what computation should look
like. Take this table from _No Silver Bullet_ showing languages that were
designed vs those done by committee.

| Designer  | Committee |
|:----------|-----------|
| Unix      | Cobol     |
| APL       | PL/1      |
| Pascal    | Algol     |
| Lisp      | MVS/370   |
| Smalltalk | MS-DOS    |
| Fortran   |           |

Languages with great designers have a certain clarity to them, its something we
all should aim to have within our own programs.

We ought to focus on making simple, elegant pieces of software that can compose
easily with other systems when we have to. If a solution exists, and it
satisfies your need then use it!
