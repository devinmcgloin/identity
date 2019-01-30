---
layout: project
title: Introduction to Computing
permalink: /intro-to-computing/
date: "2016-02-23"
excerpt: "An introduction to programming from the ground up."
---

Programming languages at their core are very simple. There are at most about 6
things a simple programming language needs: iteration, assignment operations,
Functions, data types, collections and control flow. I will explain why they
exist in the simplest terms I can, while showing examples of different languages
and syntaxes. This introduction assumes no knowledge of programming whatsoever.

## Assignment Operations
If I say it is going to rain tomorrow, what do you think? Chances are it has
something to do with the weather, specific the type of weather called rain, and
also has something to do with tomorrow. If you believe me, perhaps I'm
particularly trustworthy, or have some insider information about the weather,
you have committed to memory that tomorrow, the weather will be rainy.

You have just assigned the value rain, to the weather attribute for the time
tomorrow. Somewhere in your mind you have a idea about tomorrow, decided it
would be a good idea to bind the idea of rain to tomorrow. `Bind` is just
another term that means assignment.

Computers in the same sense have to bind information to certain symbols, so that
you can reference them inside your program. Similarly, if I had no way to
communicate to you the idea of tomorrow, I also have no way to communicate an
attribute tomorrow has. When I say `attribute` I just mean a characteristic
something can have, tomorrow has a date attribute, it has a weather attribute,
it may also have events associated to it, you get the picture.

This is really important! If you told me your yo-yo is red, and I have no idea
what a yo-yo is, I'd probably forget you have a yo-yo or that it was red,
despite knowing what the color red means. Similarly if I tell you I have a
thingamajig and its color is green, you'd probably forget too. Computers work
the same way, you have to give them a symbol to remember some bit of information
by.

Imagine if we had no shared word for tomorrow, Earlier I said tomorrow will be
rainy, but suppose you've forgotten, as you had nothing to attach that idea to.
Now when I would like to talk about tomorrow again, I have to remind you what
tomorrow is, so I say "Tomorrow is a date". I remember that I also told you it
would be rainy, so I say again "Tomorrow will be rainy." and then get to adding
what I wanted to add and say "Tomorrow is a Thursday." Great! Now you know all
that about tomorrow, but as soon as we start talking about something else, all
those ideas of what tomorrow is are gone. Computers have to have a way to
reference those ideas, or else programming would be a huge pain, and so we have
assignment!

Assignment allows us to pull out something by name, when we reference something
by name we know we have the contents of that symbol, but we do not know if it is
what we expect it to be.

## Control Flow
Control Flow is all about making decisions. If it rains tomorrow, you should
bring an umbrella, is an example of control flow. We have a if key word that
lets you know the structure of the sentence, followed by a statement that can
either be true or false, and then some action that should be performed if the
statement is true. Here is what that would look like in Lisp.

```cl
(if (rain? tomorrow)
    (bring umbrella))
;; the english version would be the following
(if (this) (then this))
```

As you can see control flow is pretty simple, but its critical to how computers
operate. More complicated control flow technique you might run across in Python
is a else if tree. Here's an example of one:

```python
if rain(tomorrow):
  bring(umbrella)
elif snow(tomorrow):
  bring(boots)
else:
  print("Nothing special to bring!")
```

This looks a little complicated, but its really a bunch of if statements lined
up in order. The only difference from what we had earlier is that instead of
just having one single conditional we now have 3 of them chained together. Once
one of those conditions is met then you only execute the code in that statement,
all the elif is doing is pulling all this code into a larger block. So in this
example, if it was for some reason both snowing and raining you would only bring
the umbrella. In order to fix this you would have to do the following:

```python
if rain(tomorrow) and snow(tomorrow):
  bring(umbrella)
  bring(boots)
elif rain(tomorrow):
  bring(umbrella)
elif snow(tomorrow):
  bring(boots)
else:
  print("Nothing special to bring!")
```

There are a few other ways to fix this, but I'll leave that to you to play
around with.

## Functions

You're writing a small programs to organize your music, say your have a few
thousand MP3 files. We'd like to be able to add or remove music to the
collection, and it'd also be great if we could look at specific genres or
artists.

You can think of a program as a tree. The bottom of the tree is where the
program starts, and it terminates at one of the leaves. To make things just a
little more complicated parts of the tree will point back to a lower or higher
part of the tree. If we think about this a little more we find that the tree
metaphor isn't really the best way to think about things, we'd be better off
making it more abstract. So instead of a tree we're going to call it a graph. A
graph is a thing that has `vertices` and `edges`. You can think of a vertex as a
smaller piece of content, and an edge as a connection between that content. So
we have a start vertex and a bunch of end vertices.

![A picture of a graph](/public/introduction-to-computing/graph.png)
<small>A diagram of our simple music program</small>

So if we look at our graph, we see that there is a start node that points to two
other nodes. You can either add or remove from the start node. Let's say we
choose add, once there we add the music we want to add, then we have to go to
`another` as it's the only option from add. `another` asks us if we want to go
again, and if so, which thing would we like to do, `add` or `remove`. If we say
yes, and remove then we can remove the music we just added. If we say no we exit
the program. The graph represents the program, but something important is
happening with `another`.

We can reach `another` two ways, one from `remove` and the other from `add`. If
we didn't have functions we would have to have two separate versions of another,
one each for add and remove. Two distinct versions of the same thing is
generally a bad idea, if you want to update how `another` behaves you have to
change it in both places. It may seem like a small issue for this example, but
if `another` is used a few thousand times, nobody is going to go and change
every single one.

Functions generally give you something back, in our case `add` and `remove`
don't return anything. They modify the database of our music without returning
any value. Take the following python example of our program.

```python
music = []
def start():
  print("Welcome to Music Manager")
  while true:
    choice = another();
    if choice == "add":
      add_music();
    elif choice == "rem":
      remove_music();
    elif choice == "exit":
      break
  print("Leaving Music Manager")
```

See how we didn't pass in any values into `add_music`, thats because it modifies
the `music` variable we assigned outside the function. Let's take a look at
`another`:

```python
def another():
  while true:
    choice = input("(A)dd music, (R)emove music, or (Q)uit?")
    if choice == "A" or choice == "a":
      return "add"
    elif choice == "R" or choice == "r":
      return "rem"
    elif choice == "Q" or choice == "q":
      return "exit"
    else
      print("Invalid Character: Please try again!")
```

`Another` returns a value, in this case the choice that the user made. Each time
you call `another` it will produce the exact same result, and return one of
three values.

There are a few different types of functions. We've talked about the most
general type, which is a function that can have side effects, and can access
things you declared in the file it lives in. Another type is a `pure function`,
which always returns the same value if called with the same inputs, and cannot
have side effects. The only thing that changes from a `pure function` is the
result you get back. You can also have functions that are attached to certain
types of data. These are generally called `methods`, and are found in Object
Oriented Languages like Java. Here's an example of some method calls, they all
modify whats going on inside the object they're called on.

```java
RaspberryPi raspPi = new RaspberryPi();
raspPi.turnOn();
raspPi.runProgram("Music Manager")
```


## Data Types
Now that we know what functions are we would like to know what types of things
those functions can take as arguments. Languages handle this issue in different
ways, dynamically typed languages infer the type you mean, based upon its
content, and then tries to execute the function you called on it. If it fails it
gives you an error message, in statically typed languages you would not be able
to compile a function that is called with the wrong arguments.

Types are combinations of other types, or map symbols to keys. The combination
of other types approach is common in statically typed languages, and keys to
values is common in dynamic languages.

```c
struct car{
  char * make;
  char * model;
  int year;
}
```

They char * might be a little confusing, it just points to the first char in the
total string. The key thing to note is that each of these items in the structure
have specific types. The same general idea applies to object oriented
programming, but in OOP each type has associated methods.

Clojure and other dynamic languages take a different approach.

```clj
(defstruct car :make :model :year ...)
```

You can think of this as a table, in which each key corresponds to a value.

| key    | val     |
|:-------|:--------|
| :make  | Porsche |
| :model | 911     |
| :year  | 1973    |

The key thing to note is that each of these keys do not have an associated type.

## Collections
Collections are groups of specific types. It makes assignment easier as you
don't have to think of each item as a separate thing, but rather part of a large
collection. Here's an example of what python would look like without
collections.

```python
In [3]: game1 = "Checkers"

In [4]: game2 = "Chess"

In [5]: game3 = "Go"

In [6]: game4 = "Backgammon"

In [7]: game5 = "Poker"

In [8]: game2
Out[8]: 'Chess'
```

This is a pain to type and a pain to reference. I'd rather do something like this:

```python
In [1]: games = ["Checkers", "Chess", "Go", "Backgammon", "Poker"]

In [2]: games[1]
Out[2]: 'Chess'
```

This looks a little different as it is copied and pasted from an iPython command
line, but its similar to what we've seen before. Note that accessing `games[1]`
gives me "Chess", as opposed to "Checkers". This is because indexing in computer
science starts at the 0th index. So `games[0]` results in "Checkers".

In this example games is an array of elements, that means they're ordered and
you can get each element pretty quickly. There are other data structures that
optimize specific operations, or only allow you to access elements in a specific
way. They vary dramatically, but it's important to remember that each data
structure is optimizing specific access patterns.

## Iteration
Suppose you have a collection of things. I'm going to assume you choose cars,
because that is going to be the running example through out this post, feel free
to replace car with a type of thing of your choice. Imagine further that your
car collection is so large you can't take in more than one car at a time. How do
you get a look at your collection in order to see what cars you have?

Most people would decide to start with a specific car, and work thru the whole
group. This is iteration. As you pass over each car you generally either take
some sort of information from it, apply a function to it, or decide if you want
to add it to a smaller collection, Say only your trucks. In fact, this is the
core idea of `map`, `filter` and `reduce`.

To `map` a function to a list is to iterate over each item in a list, and apply
that item along with other items to the function, and then store the result.

A `filter` is iterating over a list, and returning back a list with some
elements removed. The function you pass in to the filter method - along with the
arguments - is generally called a predicate function.

To `reduce` a list is to iterate over each item, and then pull out some content
from the list, and combine it with another item. Perhaps you want to find the
total HP in your garage, well you would create a place to store the total, the
iterate over the items in the list, adding each item's HP to the total HP.

This terminology is not prevalent in most languages, the most common looping
constructs are based on `for`, `while` or `foreach` loops. They usually take the
following forms:

```java
//Prints every car in your garage
for(Car c : garage){
  System.out.println(c)
}

//Prints integers from 0 to 99
for(int i = 0; i < 100; i++){
  System.out.println(i)
}

//Checks to see if there is a Porsche in your garage.
boolean carFound = false;
int index = 0;
while(!carFound){
  if(garage.get(i).getMake().equals("Porsche")){
    carFound = true;
    break;
  }
}
if(carFound){
  System.out.println("Your garage has at least one Porsche")
}
```

As you can see `foreach` loops iterate over every member in the collection, while `for` loops have a very specific set of initializers.
Lets unpack `(int i = 0; i < 100; i++)` a bit more an get an understanding of what each of the terms means. In english it would be `(do this at the start; loop while this is true; do this after every loop)`

---
If you found this useful or useless I'd love to hear from you about ways to
improve this introduction. You can email [devin@devinmcgloin](mailto:devin@devinmcgloin.com).
