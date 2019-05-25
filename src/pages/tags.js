import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql, Link } from 'gatsby';

const slugify = str =>
  str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

const Tags = ({
  data: {
    allMdx: { group },
  },
}) => (
  <HeaderLayout
    title={'Tags'}
    description="Want to find something specific? This will help you get there."
  >
    <ul>
      {group.map(tag => (
        <li className="dib mr1 mb2" key={tag.fieldValue}>
          <Link
            to={`/tags/${slugify(tag.fieldValue)}/`}
            className="f6 f5-ns b db pa2 link dim dark-gray ba b--black-20 br2"
          >
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  </HeaderLayout>
);

export default Tags;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
