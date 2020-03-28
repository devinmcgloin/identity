import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { BaseLayout, CommonMetadata } from './metadata';
import Header from './header';
import Footer from './footer';
import { Github } from './icons';
import '../style/datgui.css';
import 'tachyons/css/tachyons.css';
import '../style/identity.css';
import '../style/prism-theme.css';
import TagButton from './tag';
import Measure from 'react-measure';
import styled from 'styled-components';

let dat = null;
if (typeof window !== 'undefined') {
  dat = require('dat.gui');
}

const Content = styled.div`
  flex: 1 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StandardLayout = ({ title, description, children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            headerLinks {
              slug
              title
              hide_small
            }
          }
        }
      }
    `}
    render={(data) => (
      <BaseLayout>
        <CommonMetadata title={title} description={description} />

        <Container>
          <Content>
            <Header links={data.site.siteMetadata.headerLinks} />
            {children}
          </Content>
          <Footer />
        </Container>
      </BaseLayout>
    )}
  />
);

const HeaderLayout = ({ title, description, children }) => (
  <StandardLayout title={title} description={description}>
    <div className="feature-bg pb2 ph3 ">
      <div className="mw8 center br2">
        <header className="w-100 measure-wide pv3 ph4">
          <h1 className="f1 f-headline-ns black-90 fw6 mb2 i garamond">
            {title}
          </h1>
        </header>
      </div>
    </div>

    <div className="mw8 center open-sans">
      <div className="pv4">{children}</div>
    </div>
  </StandardLayout>
);

const PostLayout = ({ title, description, publishedAt, tags, children }) => {
  const tagButtons = Array.isArray(tags)
    ? tags.map((t) => {
        return <TagButton key={t} tag={t} />;
      })
    : [];

  return (
    <StandardLayout title={title} description={description}>
      <div className="feature-bg">
        <header className="pa3 pv4 mw7 center w-100 pr4-ns">
          <h1 className="f2 f1-ns black-90 fw5 mb2 i garamond">{title}</h1>
          <time className="f5 gray code">{publishedAt}</time>
          <span className="db mt3">{tagButtons}</span>
        </header>
      </div>
      <article className="pa3 pv4 mw7 center">
        <div className="w-100">
          <div className="lh-copy mt2 mt0-ns post-body open-sans">
            {children}
          </div>
        </div>
      </article>
    </StandardLayout>
  );
};

const ProjectLayout = ({ title, description, publishedAt, repo, children }) => (
  <StandardLayout title={title} description={description}>
    <div className="feature-bg">
      <header className="center pa3 pv4 mw7 w-100 pr4-ns pb2">
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
    </div>
    <article className="center pa3 pv4 mw7">
      <div className="w-100 open-sans">
        <div className="lh-copy mt4 mt0-ns">{children}</div>
      </div>
    </article>
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
    if (mountDatGUI && typeof window !== 'undefined') {
      const datgui = new dat.GUI({ autoPlace: false });
      const dat_gui = document.getElementById('dat-gui');
      dat_gui.appendChild(datgui.domElement);
      mountDatGUI(datgui);
    }
  };

  render = () => {
    const {
      color,
      instructions,
      title,
      description,
      mountDatGUI,
      children,
    } = this.props;
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
        <CommonMetadata title={title} description={description} />

        <Measure
          bounds
          onResize={(contentRect) => {
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
