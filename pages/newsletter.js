import BaseLayout from 'layouts/base';
import { useForm } from '@formspree/react';
import { CommonMetadata } from 'components/metadata';

const Index = ({}) => {
  const [state, handleSubmit] = useForm('subscribe');

  return (
    <BaseLayout includeFooter>
      <CommonMetadata
        title={'Newsletter'}
        description={
          "I'll send any posts on this site, and occasional updates straight to your inbox."
        }
      />

      <div class="py-16 sm:py-24">
        <div class="relative sm:py-16">
          <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="relative rounded-2xl px-6 py-10 bg-sunset-600 dark:bg-sunset-300 overflow-hidden shadow-xl sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
              >
                <svg
                  class="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 1463 360"
                >
                  <path
                    class="text-sunset-500 text-opacity-40"
                    fill="currentColor"
                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                  />
                  <path
                    class="text-sunset-700 text-opacity-40"
                    fill="currentColor"
                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                  />
                </svg>
              </div>
              <div class="relative">
                <div class="sm:text-center">
                  <h2 class="text-3xl font-extrabold text-white dark:text-gray-900 tracking-tight sm:text-4xl">
                    Subscribe to my newsletter
                  </h2>
                  <p class="mt-6 mx-auto max-w-2xl text-lg text-sunset-200 dark:text-sunset-700">
                    I'll send any posts on this site, and occasional updates
                    straight to your inbox.
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  class="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
                >
                  <div class="min-w-0 flex-1">
                    <label for="email" class="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autocomplete="email"
                      required
                      class="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sunset-600"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div class="mt-4 sm:mt-0 sm:ml-3">
                    {state.succeeded ? (
                      <div class="block w-full rounded-md border border-transparent px-5 py-3 bg-sunset-500 text-base font-medium text-white shadow sm:px-10">
                        <svg
                          className="w-6 h-6 mx-7"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <button
                        disabled={state.submitting}
                        type="submit"
                        class="block w-full rounded-md border border-transparent px-5 py-3 bg-sunset-500 text-base font-medium text-white shadow hover:bg-sunset-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sunset-600 sm:px-10"
                      >
                        Subscribe
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Index;
