import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { BaseLayout, CommonMetadata } from './metadata';
import Header from './header';
import Footer from './footer';
import { Github } from './icons';
import dat from 'dat.gui';
import '../style/datgui.css';
import 'tachyons/css/tachyons.css';
import '../style/identity.css';
import '../style/prism-theme.css';

import Measure from 'react-measure';

const StandardLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            headerLinks {
              slug
              title
            }
          }
        }
      }
    `}
    render={data => (
      <BaseLayout>
        <Header links={data.site.siteMetadata.headerLinks} />
        {children}
        <Footer />
      </BaseLayout>
    )}
  />
);

const HeaderLayout = ({ title, children }) => (
  <StandardLayout>
    <CommonMetadata title={title} />
    <div className="feature-bg bb b--black-10">
      <div className="mw8 center pa3">
        <div className="w-100 ">
          <h1 className="f1 f-headline-ns black-90 fw6 mb2 i garamond">
            {title}
          </h1>
        </div>
      </div>
    </div>

    <div className="mw8 center pa3 open-sans">
      <div className="pv4">{children}</div>
    </div>
  </StandardLayout>
);

const PostLayout = ({ title, publishedAt, children }) => (
  <StandardLayout>
    <CommonMetadata title={title} />
    <div className="pa3 measure-wide center">
      <article className="pv4">
        <header className="w-100 pr4-ns ">
          <h1 className="f2 f1-ns black-90 fw5 mb2 i garamond">{title}</h1>
          <time className="f6 ttu tracked gray open-sans">{publishedAt}</time>
        </header>
        <div className="w-100">
          <div className="lh-copy mt4 mt0-ns post-body open-sans">
            {children}
          </div>
        </div>
      </article>
    </div>
  </StandardLayout>
);

const ProjectLayout = ({ title, publishedAt, repo, license, children }) => (
  <StandardLayout>
    <CommonMetadata title={title} />

    <div className="center pa3 mw7">
      <article className="pv4">
        <header className="w-100 pr4-ns">
          <div className="dt w-100">
            <h1 className="dtc v-mid pr3 f2 f1-ns black-90 fw6 mb3 i garamond">
              {title}
            </h1>
            {repo && <Github repo={repo} />}
          </div>

          <time className="f6 ttu tracked gray open-sans">
            {publishedAt.format('dddd, MMMM Do 0YYYY')}
          </time>
        </header>
        <div className="w-100 open-sans">
          <div className="lh-copy mt4 mt0-ns">{children}</div>
          {license === 'MIT' && (
            <React.Fragment>
              <h2>License</h2>
              <a
                className="link dim underline black-60"
                href="https://opensource.org/licenses/MIT"
              >
                MIT License
              </a>
            </React.Fragment>
          )}
        </div>
      </article>
    </div>
  </StandardLayout>
);

class ExperimentLayout extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1,
    },
  };

  componentDidMount = () => {
    const { mountDatGUI } = this.props;
    if (mountDatGUI) {
      const datgui = new dat.GUI({ autoPlace: false });
      const dat_gui = document.getElementById('dat-gui');
      dat_gui.appendChild(datgui.domElement);
      mountDatGUI(datgui);
    }
  };

  render = () => {
    const { color, instructions, title, mountDatGUI, children } = this.props;
    const { width, height } = this.state.dimensions;
    const renderable = children ? (
      <div className="webgl-sketch">
        {React.cloneElement(children, {
          width: width,
          height: height,
        })}
      </div>
    ) : (
      <canvas className="webgl-sketch" id="canvas" />
    );

    return (
      <BaseLayout>
        <CommonMetadata title={title} />

        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div
              ref={measureRef}
              className="webgl-container"
              style={{ backgroundColor: color }}
            >
              {mountDatGUI && (
                <div
                  className="absolute"
                  style={{ right: 0, zIndex: 1 }}
                  id="dat-gui"
                />
              )}
              <div className="details-container">
                {instructions ? (
                  <React.Fragment>
                    <h1 className="smaller garamond">{title}</h1>
                    <div className="instructions">{instructions}</div>
                  </React.Fragment>
                ) : (
                  <h1 className="garamond">{title}</h1>
                )}

                <div
                  className="nav"
                  style={{ display: 'flex', flexWrap: 'wrap' }}
                >
                  <a href="/">devinmcgloin.com</a>
                  <span className="nav-sep">&middot;</span>
                  <a href="/artwork/">Artwork</a>
                  <span className="nav-sep">&middot;</span>
                  <a href="https://twitter.com/devinmcgloin">@devinmcgloin</a>
                </div>
              </div>
              {renderable}
            </div>
          )}
        </Measure>
      </BaseLayout>
    );
  };
}

export {
  StandardLayout,
  HeaderLayout,
  PostLayout,
  ProjectLayout,
  ExperimentLayout,
};
