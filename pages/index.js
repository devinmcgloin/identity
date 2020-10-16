import BaseLayout from 'layouts/base';
import Link from 'next/link';

const Index = () => (
  <BaseLayout>
    <div className="flex gap-y-10 flex-col">
      <h2 class="text-4xl max-w-xl my-10 px-5 tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        Californian slightly out of place in Dublin. Aiming for a constant state
        of play.
      </h2>
      <div className="flex justify-around w-full">
        <Link href="/words">Words →</Link>
        <Link href="/work">Work →</Link>
        <Link href="/art">Art →</Link>
        <Link href="/photography">Photography →</Link>
      </div>
    </div>
  </BaseLayout>
);

export default Index;
