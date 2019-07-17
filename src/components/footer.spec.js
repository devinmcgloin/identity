import React from 'react';
import renderer from 'react-test-renderer';
import { PureFooter } from './footer';

describe('Footer', () => {
  const data = {
    social: {
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
    artwork: {
      edges: [
        {
          node: {
            frontmatter: {
              title: 'Solar',
            },
            fields: {
              slug: '/interactive/solar/',
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: "Fermat's Spirals",
            },
            fields: {
              slug: '/interactive/fermat/',
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Additive Splines',
            },
            fields: {
              slug: '/interactive/additive-splines/',
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Boids',
            },
            fields: {
              slug: '/interactive/boids/',
            },
          },
        },
      ],
    },
    projects: {
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
