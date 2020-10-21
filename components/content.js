import Link from 'next/link';

const fontColors = (baseColor) => {
  switch (baseColor) {
    case 'purple':
      return [
        'text-purple-700 hover:text-purple-900 dark:text-purple-200 dark:hover:text-purple-400',
        'text-purple-500 dark:text-purple-400',
      ];
    case 'indigo':
      return [
        'text-indigo-700 hover:text-indigo-900 dark:text-indigo-200 dark:hover:text-indigo-400',
        'text-indigo-500 dark:text-indigo-400',
      ];
    case 'blue':
      return [
        'text-blue-700 hover:text-blue-900 dark:text-blue-200 dark:hover:text-blue-400',
        'text-blue-500 dark:text-blue-400',
      ];
    case 'yellow':
      return [
        'text-yellow-700 hover:text-yellow-900 dark:text-yellow-200 dark:hover:text-yellow-400',
        'text-yellow-500 dark:text-yellow-400',
      ];
    default:
      return [
        'text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400',
        'text-gray-500 dark:text-gray-400',
      ];
  }
};

const ContentBlock = ({
  externalLink,
  slug,
  title,
  description,
  color = 'gray',
  children,
}) => {
  const [headerStyle, bodyStyle] = fontColors(color);
  const InnerContent = ({ title, description }) => (
    <>
      <h3 className={`mt-4 text-xl leading-7 font-semibold ${headerStyle}`}>
        {title} {externalLink ? '↗' : '→'}
      </h3>
      {children || (
        <p className={`mt-3 text-base leading-6 ${bodyStyle}`}>{description}</p>
      )}
    </>
  );
  if (externalLink) {
    return (
      <div>
        <a href={externalLink} className="block">
          <h3 className={`mt-4 text-xl leading-7 font-semibold ${headerStyle}`}>
            {title} {externalLink ? '↗' : '→'}
          </h3>
        </a>
        {children || (
          <p className={`mt-3 text-base leading-6 ${bodyStyle}`}>
            {description}
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Link href={slug}>
          <a className="block">
            <h3
              className={`mt-4 text-xl leading-7 font-semibold ${headerStyle}`}
            >
              {title} {externalLink ? '↗' : '→'}
            </h3>
          </a>
        </Link>
        {children || (
          <p className={`mt-3 text-base leading-6 ${bodyStyle}`}>
            {description}
          </p>
        )}
      </div>
    );
  }
};

export { ContentBlock };
