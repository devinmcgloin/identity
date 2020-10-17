import Link from 'next/link';
import Logo from 'components/logo';

const Index = () => (
  <main className="max-w-screen-lg mx-auto">
    <div className="flex items-center justify-between p-5 border-b border-gray-100">
      <Link href="/">
        <Logo className="cursor-pointer w-12 h-12 text-red-500" />
      </Link>
    </div>
    <div className="flex flex-col">
      <Link href="/words">Words →</Link>
      <Link href="/work">Work →</Link>
      <Link href="/art">Art →</Link>
      <Link href="/photography">Photography →</Link>
    </div>
  </main>
);

export default Index;
