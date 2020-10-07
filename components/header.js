import Link from 'next/link';

const Header = () => (
  <div className="flex items-center justify-between p-5 border-b">
    <Link href="/">Devin McGloin</Link>
    <div className="flex space-x-4 ">
      <Link href="/writing">Words</Link>
      <Link href="/projects">Work</Link>
      <Link href="/artwork">Artwork</Link>
      <Link href="/photography">Photography</Link>
    </div>
  </div>
);
export { Header };
