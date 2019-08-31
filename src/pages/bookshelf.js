import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => {
  let books = data.allBooksYaml.edges;
  let renderedBooks = books
    .map(edge => edge.node)
    .sort((a, b) => a.rating < b.rating)
    .map(b => (
      <tr key={b.title}>
        <td className="pv3 pr3 bb b--black-20">{b.title}</td>
        <td className="pv3 pr3 bb b--black-20">{b.author}</td>
        <td className="pv3 pr3 bb b--black-20">{b.rating}/3</td>
      </tr>
    ));

  return (
    <HeaderLayout
      title="Bookshelf"
      description="Books I've read, along with ratings."
    >
      <div className="pa2">
        <div className="overflow-auto">
          <table className="f6 w-100 mw8 center" cellSpacing="0">
            <thead>
              <tr>
                <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Name</th>
                <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">
                  Author
                </th>
                <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="lh-copy">{renderedBooks}</tbody>
          </table>
        </div>
      </div>
    </HeaderLayout>
  );
};

export const query = graphql`
  {
    allBooksYaml {
      edges {
        node {
          author
          title
          rating
        }
      }
    }
  }
`;

export default IndexPage;
