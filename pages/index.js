import Link from 'next/link';
import Logo from 'components/logo';
import BaseLayout from 'layouts/base';
import { CommonMetadata } from 'components/metadata';

const Index = () => (
  <BaseLayout>
    <div className="pt-16 pb-20 px-4 text-base max-w-prose mx-auto">
      <h1 className="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
        Hey, I'm Devin. Welcome to my corner of the internet.
      </h1>
      <div className="prose dark:prose-dark text-lg">
        <p>
          I'm a Software Engineer from California, living in Ireland via NYC.
          Aiming for a constant state of play.
        </p>
        <p>
          Working on <a href="https://quorum.chat">Quorum</a> &{' '}
          <a href="https://www.arenahq.io">Arena</a> and{' '}
          <Link href="/work">
            <a>numerous other things</a>
          </Link>
          , previously <a href="https://intercom.com">Intercom</a>. I'm focused
          on working for small companies, having more skin in the game, and
          owning the experience end to end.
        </p>
        <p>
          I'm an occasional backpacker, cyclist and{' '}
          <Link href="/photos">
            <a>photographer</a>
          </Link>
          . I publish anything from short articles to deeper dives on by{' '}
          <Link href="/words">
            <a>blog</a>
          </Link>
          .
        </p>
        <p>
          I want to spend time building / restoring physical things, but
          increasingly find myself building on computers. I have todo list items
          for "Restore a Porsche 964", "Build a house", and "Earn a private
          pilot license".
        </p>

        <h4>Interested In</h4>
        <ul>
          <li>
            Improving Tools for Thought / Increasing our ability to understand
            and influence the world around us.
          </li>
          <li>
            Developing{' '}
            <Link href="/tags/software">
              <a>quality</a>
            </Link>{' '}
            &{' '}
            <Link href="/tags/humane-software">
              <a>humane</a>
            </Link>{' '}
            software.
          </li>
          <li>Building and operating small software businesses.</li>
          <li>
            Creating art with computers, focused on 2D plots and interactive
            pieces.
          </li>
        </ul>

        <h4>Elsewhere on the web</h4>
        <div className="flex space-x-3">
          <a href="https://twitter.com/devinmcgloin">Twitter ↗</a>
          <a href="https://github.com/devinmcgloin">GitHub ↗</a>
          <a href="https://unsplash.com/@devinmcgloin">Unsplash ↗</a>
          <a href="mailto:devin@devinmcgloin.com">Email ↗</a>
        </div>
      </div>
    </div>
  </BaseLayout>
);

export default Index;
