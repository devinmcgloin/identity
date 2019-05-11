import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql, Link, withPrefix } from 'gatsby';
import Gallery from '../components/gallery';

const IndexPage = ({ data }) => {
  let images = data.allImageSharp.edges.map(e => {
    return {
      src: e.node.fluid.src,
      width: e.node.fluid.presentationWidth,
      height: e.node.fluid.presentationHeight,
    };
  });
  return (
    <HeaderLayout
      title="Artwork"
      description="Personal artwork I've created, both interactive and static"
    >
      <h2 className="f3 pl2 ttu tracked lh-copy black-60">Interactive</h2>
      <article className="dib w-100">
        {data.allExperimentsYaml.edges.map(e => {
          return (
            <Link
              key={e.node.slug}
              to={e.node.slug}
              className="fl w-50 w-25-l overflow-hidden pa2"
            >
              <div
                role="img"
                className="aspect-ratio--9x16 br2"
                style={{
                  background: `url(${withPrefix(
                    e.node.image
                  )}) no-repeat center center`,
                  backgroundSize: 'cover',
                }}
              />
            </Link>
          );
        })}
      </article>

      <h2 className="f3 pl2 ttu tracked lh-copy black-60">Static</h2>
      <Gallery images={images} />
    </HeaderLayout>
  );
};

export const query = graphql`
  {
    allExperimentsYaml {
      edges {
        node {
          title
          slug
          date
          image
        }
      }
    }
    allImageSharp(filter: { original: { src: { regex: "/sketch/" } } }) {
      edges {
        node {
          id
          fluid(quality: 100) {
            src
            presentationWidth
            presentationHeight
          }
        }
      }
    }
  }
`;

export default IndexPage;
