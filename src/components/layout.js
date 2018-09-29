import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import Footer from './footer'
import Helmet from 'react-helmet'
import { Github } from './icons'

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
            social {
              name
              email
              github
              twitter
              unsplash
              linkedin
              angelslist
              fokal
              city
            }
          }
        }
      }
    `}
    render={data => (
      <div className="sans-serif">
        <Header links={data.site.siteMetadata.headerLinks} />
        {children}
        <Footer {...data.site.siteMetadata.social} />
      </div>
    )}
  />
)

const HeaderLayout = ({ title, children }) => (
  <StandardLayout>
    <div className="pa3 topo bb b--black-10">
      <div className="mw8 center">
        <div className="w-100 ">
          <h1 className="f1 f-headline-ns black-90 fw6 mb2 i garamond">
            {title}
          </h1>
        </div>
      </div>
    </div>

    <div className="mw8 center pa3">
      <div className="pv4">{children}</div>
    </div>
  </StandardLayout>
)

const PostLayout = ({ title, publishedAt, children }) => (
  <StandardLayout>
    <div className="pa3 measure-wide center">
      <article className="pv4">
        <header className="w-100 pr4-ns ">
          <h1 className="f2 f1-ns black-90 fw6 mb2 i garamond">{title}</h1>
          <time className="f6 ttu tracked gray">{publishedAt}</time>
        </header>
        <div className="w-100">
          <div className="lh-copy mt4 mt0-ns post-body ">{children}</div>
        </div>
      </article>
    </div>
  </StandardLayout>
)

const ProjectLayout = ({ title, publishedAt, repo, license, children }) => (
  <StandardLayout>
    <div className="center pa3 mw7">
      <article className="pv4">
        <header className="w-100 pr4-ns">
          <div className="dt w-100">
            <h1 className="dtc v-mid pr3 f2 f1-ns black-90 fw6 mb3 i garamond">
              {title}
            </h1>
            {repo && <Github repo={repo} />}
          </div>

          <time className="f6 ttu tracked gray">
            {publishedAt.format('dddd, MMMM Do 0YYYY')}
          </time>
        </header>
        <div className="w-100">
          <div className="lh-copy mt4 mt0-ns">{children}</div>
          {license === 'MIT' || (
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
)

const ExperimentLayout = ({ title, instructions, datgui, children }) => (
  <div className="webgl-container">
    <Helmet>
      {datgui && (
        <React.Fragment>
          <script async src="/public/js/dat.gui.min.js" />
          <link rel="stylesheet" href="/public/css/gui-theme.css" />
        </React.Fragment>
      )}
      <script async src="/public/js/webgl-bindings.js" />
    </Helmet>
    <div className="details-container">
      {instructions ? (
        <React.Fragment>
          <h1 className="smaller">{title}</h1>
          <div className="instructions">{instructions}</div>
        </React.Fragment>
      ) : (
        <h1>{title}</h1>
      )}

      <div className="nav">
        <a href="/">devinmcgloin.com</a>
        <span className="nav-sep">&middot;</span>
        <a href="/experiments/">Experiments</a>
        <span className="nav-sep">&middot;</span>
        <a href="https://twitter.com/devinmcgloin">@devinmcgloin</a>
      </div>
    </div>
    <textArea className="webgl-editor" id="textArea" />
    <canvas className="webgl-sketch" id="canvas" /> {children}
  </div>
)

export {
  StandardLayout,
  HeaderLayout,
  PostLayout,
  ProjectLayout,
  ExperimentLayout,
}