import Link from 'next/link';
import BaseLayout from 'layouts/base';

export default function Missing({}) {
  return (
    <BaseLayout>
      <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <span className="mt-4 text-gray-700 dark:text-gray-200 leading-7 font-semibold text-6xl">
            404
          </span>

          <p className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-400">
            Hmm, we weren't able to find that one.<br></br>Head back{' '}
            <Link href="/">
              <a>home</a>
            </Link>{' '}
            to try to find it again.
          </p>
        </div>
      </div>
    </BaseLayout>
  );
}
