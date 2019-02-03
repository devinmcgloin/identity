import React from 'react';
import { Splash } from '../components/splash';
import Currently from '../components/currently';
import Table from '../components/table-list';
import { StandardLayout } from '../components/layout';
import { flatten } from '../lib/transformation';
import Carousel from '../components/carousel';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => (
  <StandardLayout>
    <Splash />
    <Currently />
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
      cards={data.experiments.edges.map(e => flatten(e.node))}
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
  </StandardLayout>
);

export const query = graphql`
  {
    experiments: allExperimentsYaml(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          slug
          title
          image
          date
        }
      }
    }
    writing: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/writing/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            categories
            excerpt
            date(formatString: "D MMMM 0YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/projects/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            categories
            excerpt
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
