import { CommonMetadata } from 'components/metadata';

export const PageHeader = ({ title, subtitle, className, children }) => (
  <div className={className}>
    <CommonMetadata title={title} description={subtitle} />
    <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 dark:text-gray-200 sm:text-4xl sm:leading-10">
      {title}
    </h2>
    <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
      <p className="text-xl leading-7  text-gray-500 dark:text-gray-400 ">
        {subtitle}
      </p>
    </div>
    {children}
  </div>
);
