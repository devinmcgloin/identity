import Link from 'next/link';

const ContentBlock = ({ externalLink, slug, title, description, children }) => {
  const InnerContent = ({ title, description }) => (
    <>
      <h3 className="mt-4 text-xl leading-7 font-semibold text-gray-900">
        {title} {externalLink ? '↗' : '→'}
      </h3>
      {children || (
        <p className="mt-3 text-base leading-6 text-gray-500">{description}</p>
      )}
    </>
  );
  if (externalLink) {
    return (
      <a href={externalLink} className="block">
        <InnerContent title={title} description={description} />
      </a>
    );
  } else {
    return (
      <Link href={slug}>
        <a className="block">
          <InnerContent title={title} description={description} />
        </a>
      </Link>
    );
  }
};

export { ContentBlock };
