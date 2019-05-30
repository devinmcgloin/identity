import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header';

describe('Header', () => {
  const links = [
    { title: 'Artwork', slug: '/artwork' },
    { title: 'Projects', slug: '/projects' },
    { title: 'Writing', slug: '/writing' },
  ];

  it('renders correctly', () => {
    const tree = renderer.create(<Header links={links} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
