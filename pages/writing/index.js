import { getSortedPostData } from 'lib/writing';
import Link from 'next/link';
import BaseLayout from 'layouts/base';
import parseISO from 'date-fns/parseISO';
import formatRelative from 'date-fns/formatRelative';

export default function PostPage({ allPostData }) {
  return (
    <BaseLayout>
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto lg:max-w-7xl">
          <div>
            <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Writing
            </h2>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl leading-7 text-gray-500">
                Get Updates whenever I get around to posting something
              </p>
              <form className="mt-6 flex lg:mt-0 lg:justify-end">
                <input
                  aria-label="Email address"
                  type="email"
                  required
                  className="appearance-none w-full px-4 py-2 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out lg:max-w-xs"
                  placeholder="Enter your email"
                />
                <span className="ml-3 flex-shrink-0 inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                  >
                    Notify me
                  </button>
                </span>
              </form>
            </div>
          </div>
          <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {allPostData.map((data) => {
              let date = parseISO(data.date);
              return (
                <div>
                  <p className="text-sm leading-5 text-gray-500">
                    <time dateTime={data.date}>
                      {formatRelative(date, new Date())}
                    </time>
                  </p>
                  <Link href={data.slug}>
                    <a className="block">
                      <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                        {data.title}
                      </h3>
                      <p className="mt-3 text-base leading-6 text-gray-500">
                        {data.excerpt}
                      </p>
                    </a>
                  </Link>
                  <div className="mt-3">
                    <Link href={data.slug}>
                      <a className="text-base leading-6 font-semibold text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150">
                        Read full story
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export async function getStaticProps() {
  const allPostData = getSortedPostData();
  return {
    props: {
      allPostData,
    },
  };
}

const template = () => (
  <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="relative max-w-lg mx-auto lg:max-w-7xl">
      <div>
        <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
          Press
        </h2>
        <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
          <p className="text-xl leading-7 text-gray-500">
            Get weekly articles in your inbox on how to grow your business.
          </p>
          <form className="mt-6 flex lg:mt-0 lg:justify-end">
            <input
              aria-label="Email address"
              type="email"
              required
              className="appearance-none w-full px-4 py-2 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out lg:max-w-xs"
              placeholder="Enter your email"
            />
            <span className="ml-3 flex-shrink-0 inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                Notify me
              </button>
            </span>
          </form>
        </div>
      </div>
      <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        <div>
          <p className="text-sm leading-5 text-gray-500">
            <time dateTime="2020-03-16">Mar 16, 2020</time>
          </p>
          <a href="#" className="block">
            <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
              Boost your conversion rate
            </h3>
            <p className="mt-3 text-base leading-6 text-gray-500">
              Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam
              vitae illo. Non aliquid explicabo necessitatibus unde. Sed
              exercitationem placeat consectetur nulla deserunt vel. Iusto
              corrupti dicta.
            </p>
          </a>
          <div className="mt-3">
            <a
              href="#"
              className="text-base leading-6 font-semibold text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
            >
              Read full story
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
