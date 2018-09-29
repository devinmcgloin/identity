---
title: The Philosophy of vim
date: '2015-07-15'
tags:
  - Human Computer Interaction
  - Software Design
excerpt: For those of you who have not heard of the text editor vim, it is a text editor lauded for its adaptability, and supreme extensibility. You can basically do anything you want in vim, and that’s nice, but at the same time it has the steepest learning curve for any piece of software you will encounter.
layout: 'post'
---

For those of you who have not heard of the text editor [vim][1], it is a text editor lauded for its adaptability, and supreme [extensibility][2]. You can basically do anything you want in vim, and that's nice, but at the same time it has **the** steepest learning curve for any piece of software you will encounter.

Yet, for whatever reason, programmers seem to flock to it, along with its GNU equivalent [emacs][3]. There are [books][4] written on emacs. emacs and vim are text editors. To the outside observer this is ridiculous, but to the mind of a programmer vim or emacs is just wonderful once you rewire your mind to how it wants you to think. The average person does not want to change the way they think to edit a text file or a piece of code.

Fundamentally this is a different way to view a computer, and shows the difference between a programmer/computer hobbyist and an everyday user. The core of it is that a user wants the computer to think in the manner they think, and to respond to their inputs in a manner they would expect. A programmer however does not have this mindset at all, a programmer is willing to think like the computer, to retrain their mind to think in steps, procedures and hexadecimal. In some sense, programmers want to fiddle with computers, and tinker with settings. vim/emacs give this mindset infinite possibility.

The command scheme for vim begins with typing `:` after which the user types a letter indicating a command. For example `:q` is to quit that window (Or is it called a buffer, you tell me) and `:dw` is a command to delete the current word. One benefit of such a scheme is that commands can be merged together. `:dd` deletes the whole line and `:d$` deletes the line from the cursor on. This gives you some added power, but not much more compared to selecting text, which I remind you, can be done on any modern text editor. I actually had to look up those commands, and why would I remember them? Sure those vim/emacs users might be able to save a second or two each hour of the work day with command shortcuts, but is that really worth it?

This is indicative of a divide in how people view software, programmers, those who design software for others, want ultimate flexibility and the ability to modify, extend or tweak their experience, and will spend weeks if not months to rewire their mind so gain these "features". End users on the other hand, just want to edit a text file and save it.

That is why understanding your users is such common startup advice, because the view point of a programmer is so radically different from that of a user. The programmer wants to play with computers, they want to play with their settings and customize their machine. I do too, but there is a limit to what I'll endure. vim and emacs cross that threshold pretty quickly, now imagine someone with a limit much lower than mine, would they like the new feature? Or would it just get in the way of them editing the text file?

[1]: http://www.vim.org/
[2]: http://vimawesome.com/
[3]: https://www.gnu.org/software/emacs/
[4]: http://www.amazon.com/Learning-GNU-Emacs-Third-Edition/dp/0596006489?tag=duckduckgo-ffsb-20
