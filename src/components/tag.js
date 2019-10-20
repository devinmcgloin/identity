import React from 'react';
import { Link } from 'gatsby';

const slugify = str =>
  str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

const TagButton = ({ tag }) => (
  <li className="dib mr1 mb2" key={tag}>
    <Link
      to={`/tags/${slugify(tag)}/`}
      style={{ backgroundColor: 'rgb(243, 248, 255)' }}
      className="f6 f5-ns db pa2 link dim blue br2 ba"
    >
      #
      {tag
        .toLowerCase()
        .split(' ')
        .join('-')}
    </Link>
  </li>
);

export default TagButton;
