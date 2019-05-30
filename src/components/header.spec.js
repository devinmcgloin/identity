import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header';

describe('Header', () => {
  const links = [
    {
      slug: '/projects',
      title: 'Projects',
    },
    {
      slug: '/artwork',
      title: 'Artwork',
    },
    {
      slug: '/writing',
      title: 'Writing',
    },
  ];

  it('renders correctly', () => {
    const tree = renderer.create(<Header links={links} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
