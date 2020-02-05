import React from 'react';
import { Splash, CallToAction } from '../components/splash';
import Table from '../components/table-list';
import { StandardLayout } from '../components/layout';
import { CommonMetadata } from '../components/metadata';
import { flatten } from '../lib/transformation';
import Carousel from '../components/carousel';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => (
  <StandardLayout>
    <CommonMetadata description={CallToAction} />
    <Splash />
    <div className="ph3 ph5-ns">
      <Table
        columns={[
          { type: 'title', description: 'Title' },
          { type: 'excerpt', description: 'Description' },
        ]}
        rows={data.projects.edges.map(e => flatten(e.node))}
        color="light"
        title="Projects"
        link="/projects"
      />
      <Carousel
        title="Artwork"
        link="/artwork"
        cards={data.artwork.edges.map(e => e.node)}
      />
      <Table
        columns={[
          { type: 'title', description: 'Title' },
          {
            type: 'date',
            description: 'Date',
            dateFormatter: 'dddd, MMMM Do 0YYYY',
          },
        ]}
        rows={data.writing.edges.map(e => flatten(e.node))}
        color="light"
        title="Writing"
        link="/writing"
      />
    </div>
  </StandardLayout>
);

export const query = graphql`
  {
    artwork: allMdx(
      filter: { fields: { slug: { regex: "/interactive/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    writing: allMdx(
      filter: { fields: { slug: { regex: "/writing/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            categories
            date(formatString: "D MMMM 0YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    projects: allMdx(
      filter: { fields: { slug: { regex: "/projects/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            categories
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default IndexPage;
