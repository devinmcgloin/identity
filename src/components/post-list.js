import React from 'react';
import { Link } from 'gatsby';
import TagButton from './tag';

const PostList = ({ entries }) => {
  const sections = entries.map((entry, indx) => {
    const tags = Array.isArray(entry.tags)
      ? entry.tags.map(t => {
          return <TagButton key={t} tag={t} />;
        })
      : [];

    const bottomBorder = entries.length - 1 !== indx ? 'bb b--black-10' : '';

    return (
      <div
        key={entry.slug}
        className={`flex flex-wrap justify-between items-start w-100 ${bottomBorder} pa3`}
      >
        <div className="w-100 w-third-ns pv3 pr2-ns">
          <Link
            to={entry.slug}
            className="f3 fw8 garamond mt0 lh-title db no-underline dark-gray"
          >
            {entry.title}
          </Link>
          <span className="mt2 db gray">{entry.date}</span>
          <span className="mt3 db">{tags}</span>
        </div>
        <Link
          to={entry.slug}
          className="w-100 w-two-thirds-ns f5 pb3 lh-copy pl2-ns db no-underline dark-gray"
        >
          {entry.excerpt}
        </Link>
      </div>
    );
  });

  return <div>{sections}</div>;
};

export default PostList;
