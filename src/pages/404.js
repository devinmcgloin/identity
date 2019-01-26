import React from 'react';
import { StandardLayout } from '../components/layout';
import { Link } from 'gatsby';
const NotFoundPage = () => (
  <StandardLayout>
    <div className="topo w-100 vh-75">
      <header className="lh-copy measure-wide center tc pa4">
        <h1 className="f1 f-headline-l garamond mb3 fw9 dib tracked-tight light-blue">
          404
        </h1>
        <h2 className="fw5">
          Sorry, we've misplaced that URL or it's pointing to something that
          doesn't exist.
          <Link className="link dim gray underline" to="/">
            Head back home
          </Link>
          to try finding it again.
        </h2>
      </header>
    </div>
  </StandardLayout>
);

export default NotFoundPage;
