import Link from 'next/link';

const Header = () => (
  <div className="flex items-center justify-between p-5 border-b border-gray-100">
    <Link href="/">Devin McGloin</Link>
    <div className="flex space-x-4">
      <Link href="/words">Words</Link>
      <Link href="/work">Work</Link>
      <Link href="/art">Art</Link>
      <Link href="/photography">Photography</Link>
    </div>
  </div>
);
export { Header };
