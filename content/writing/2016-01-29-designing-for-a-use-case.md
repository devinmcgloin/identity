---
title: Designing for a use case
date: '2016-01-29'
tags:
    - Software Design
    - Programming
layout: 'post'
excerpt:  >
    When you develop an application or some software artifact you consider what task
    the program is to complete. You make a model of who your customers are, and how
    they interact with your service, and then you proceed to implement that.
---

When you develop an application or some software artifact you consider what task
the program is to complete. You make a model of who your customers are, and how
they interact with your service, and then you proceed to implement that.
Unfortunately you cannot predict every possible use case for your program, you
end up choosing a few prime use cases and focusing on those. This makes them
easy to discover and use, which is great. But what if those aren’t the
operations your users really want?

I would argue that these compromises make it very difficult for your customers
to complete complex tasks, and also alienates the user if their task is one of
the marginalized ones. They could imagine that their task is so insignificant
that nobody would bother to produce a system that could do it. But this really
does not have to be this way, we could instead give the users power over what
they do with their data. We need to expose the functions people want in a
logical consistent manner, and then let them interact with those items however
they wish.

This requires logical consistency throughout the system. An operation on one
item should have the same effect as on all other items that are logically
equivalent. Users must not worry about their data-structures, and those
data-structures ought to be dynamically optimized to account for the users usage
pattern.

## Common operations across collections

Anyone ought to be able to apply bulk operations over any collection, but right
now the only collections that really support this are music, emails, and perhaps
transactions. I ran across this problem trying to remove old iPhone apps from my
iCloud list. Apple lets you remove them, but only one at a time. There is no way
to select more than one item, and remove all of those selected items from the
list. There's no doubt that it is technically possible for this to be a feature,
but Apple doesn't care if you can do it easily. Easy should be the default, and
adopting a universal way to deal with data is part of the solution to this
problem.

The issue is that developers don’t think its important for their application to
support those operations. Users as a result think they don’t need them, and
they’re not relevant to what they want to accomplish. The result is a severely
suboptimal environment for those using our products.

I think the solution is to expose the programming to the user, not thru a
terminal, but thru a GUI. The operations have to make intuitive sense for any
reasonable person. Data structures will have to be persistent and invisible to
the user. This is why I’m currently working on
[UDB](https://github.com/devinmcgloin/udb), a collection framework that
dynamically optimizes data structures given the most common access operations.
This flies directly in the face of optimization and performance, however this is
not a huge issue as collections are generally small, and programmers can
optimize for certain use cases, eg photo applications, or email, to provide
better performance. They key thing though, is that all operations have to be
supported by all underlying data structures. This gives people a consistent
frame of mind, without it the system becomes to complex for normal people to
grasp.

## Common operations across logical datatypes

Another issue is that the same types of data are represented in different ways,
without letting a universal set of operations that apply to data of the same
logical type. This is another issue where the user does not understand why it
needs to be this way, and it really doesn't. The key to fixing this issue is
providing a large library of operations that work for logical primitives.
Developers can specify a single method to translate their current data format
into the format that the user prefers. Some examples of logical primitives would
be `times`, `locations` or various forms of media. There are quite a few other
primitives, you can find a full list [here](/universal-types).

Because these types are consistent, and supported throughout the system, you can
apply common filters, sorts, or apply functions to every item in the collection.

For example, I would like to find a contact of mine, but I've forgotten their
name. I know I added them recently, and that they didn't give me their email. I
ought to filter by contacts who do not have an email, then sort by how recently
I added them. I have about 600 contacts in my address book, and neither of these
operations would take much time, even if they are not heavily optimized.

Imagine the power if you could do that for all these data types. You could find
the closest *x* just by getting a list *x* then because they have a location,
you can find out their distance from your current location. The coffee shop use
case has been polished, and for coffee shops its super easy. What if you're
looking on someones blog for good gluten free restaurants in Sacramento. You
think this person knows what they're talking about, and you'd like to know how
far away all of them are. Well, right now you have to type them all in to Google
maps, or have knowledge of the area to figure out how far away they are. This is
obviously sub optimal. If you have a list of restaurants, even just their names
and a general geographical location, you ought to be able to find the distance
from you to them without having to code something to do it, or type in 10
address to Google, and compare across multiple tabs.

## Programmers provide the data, and the user manipulates it

One of the huge benefits of such a system is that developers can focus on the
applications that are critical to what they do. That is their business logic, or
leveraging their unique dataset. They don't have to develop an app, they don't
have to really bother with data conversion, and they don't have to focus on the
client side. Furthermore any added function to a primitive will immediately
propagate throughout the entire system. This means that code really only has to
be written once, and each developer doesn't have to spend time solving problems
that have already been solved.
