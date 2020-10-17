import Link from 'next/link';
import Logo from 'components/logo';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-100">
      <Link href="/">
        <Logo className="cursor-pointer w-10 h-10 text-red-500" />
      </Link>
      <div className="flex space-x-4">
        <Link href="/words">Words</Link>
        <Link href="/work">Work</Link>
        <Link href="/art">Art</Link>
        <Link href="/photos">Photos</Link>
      </div>
    </div>
  );
};
export { Header };