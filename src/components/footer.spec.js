import React from 'react';
import renderer from 'react-test-renderer';
import { PureFooter } from './footer';

describe('Footer', () => {
  const data = {
    site: {
      siteMetadata: {
        social: {
          name: 'Devin McGloin',
          email: 'devin@devinmcgloin.com',
          github: 'devinmcgloin',
          twitter: 'devinmcgloin',
          unsplash: 'devinmcgloin',
        },
      },
    },
    allExperimentsYaml: {
      edges: [
        {
          node: {
            title: 'Solar',
            slug: '/interactive/solar/',
          },
        },
        {
          node: {
            title: "Fermat's Spirals",
            slug: '/interactive/fermat-spiral/',
          },
        },
        {
          node: {
            title: 'Additive Splines',
            slug: '/interactive/additive-splines/',
          },
        },
        {
          node: {
            title: 'Boids',
            slug: '/interactive/boids/',
          },
        },
      ],
    },
    allMdx: {
      edges: [
        {
          node: {
            frontmatter: {
              title: 'Sail',
            },
            fields: {
              slug: '/projects/sail/',
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Probabilistic',
            },
            fields: {
              slug: '/projects/probabilistic/',
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Parking',
            },
            fields: {
              slug: '/projects/parking/',
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: 'clr',
            },
            fields: {
              slug: '/projects/clr/',
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Fokal',
            },
            fields: {
              slug: '/projects/fokal/',
            },
          },
        },
      ],
    },
  };

  it('renders correctly', () => {
    const tree = renderer.create(<PureFooter data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
