import React from 'react';
import renderer from 'react-test-renderer';
import { flatten } from '../lib/transformation';

import TableList from './table-list';

describe('TableList', () => {
  let data = {
    projects: {
      edges: [
        {
          node: {
            frontmatter: {
              title: 'Sail',
              categories: null,
            },
            fields: {
              slug: '/projects/sail/',
            },
            excerpt: 'Sail is a generative art framework',
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Probabilistic',
              categories: null,
            },
            fields: {
              slug: '/projects/probabilistic/',
            },
            excerpt:
              'Golang implementations of Bloom Filters, Min Sketch Count and Min Hashing.',
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Parking',
              categories: null,
            },
            fields: {
              slug: '/projects/parking/',
            },
            excerpt:
              'Parking is a live art piece in which users claim a parking spot and hopefully make a human connection.',
          },
        },
        {
          node: {
            frontmatter: {
              title: 'clr',
              categories: null,
            },
            fields: {
              slug: '/projects/clr/',
            },
            excerpt:
              'clr is a go library to manage different color spaces, convert between them and compare colors.',
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Fokal',
              categories: null,
            },
            fields: {
              slug: '/projects/fokal/',
            },
            excerpt:
              'Fokal is a simple photography site with the goal of getting good images seen.',
          },
        },
      ],
    },
  };

  let props = {
    columns: [
      { type: 'title', description: 'Title' },
      { type: 'excerpt', description: 'Description' },
    ],
    rows: data.projects.edges.map(e => flatten(e.node)),
    title: 'Projects',
    link: '/projects',
  };

  it('renders correctly with light color', () => {
    const tree = renderer
      .create(<TableList color="light" {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with dark color', () => {
    const tree = renderer
      .create(<TableList color="dark" {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
