import Link from 'next/link';
import Logo from 'components/logo';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
      <Link href="/">
        <a>
          <Logo className="cursor-pointer w-10 h-10 text-primary" />
        </a>
      </Link>
      <div className="flex space-x-4 dark:text-gray-200">
        <Link href="/words">Words</Link>
        <Link href="/work">Work</Link>
        <Link href="/art">Art</Link>
        <Link href="/photos">Photos</Link>
      </div>
    </div>
  );
};
export { Header };
