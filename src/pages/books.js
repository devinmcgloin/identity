import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => {
  let books = data.allBooksYaml.edges;
  let renderedBooks = books.map(edge => edge.node).map(b => (
    <tr>
      <td class="pv3 pr3 bb b--black-20">{b.title}</td>
      <td class="pv3 pr3 bb b--black-20">{b.author}</td>
      <td class="pv3 pr3 bb b--black-20">{b.rating}</td>
    </tr>
  ));

  return (
    <HeaderLayout title="Bookshelf">
      <div class="pa2">
        <div class="overflow-auto">
          <table class="f6 w-100 mw8 center" cellspacing="0">
            <thead>
              <tr>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Name</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Author</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Rating</th>
              </tr>
            </thead>
            <tbody class="lh-copy">{renderedBooks}</tbody>
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
