import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import Footer from './footer'
import Helmet from 'react-helmet'
import { github } from './icons'

const standardlayout = ({ children }) => (
  <staticquery
    query={graphql`
      {
        site {
          sitemetadata {
            headerlinks {
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
      <div classname="sans-serif">
        <header links={data.site.sitemetadata.headerlinks} />
        {children}
        <footer {...data.site.sitemetadata.social} />
      </div>
    )}
  />
)

const headerlayout = ({ title, children }) => (
  <standardlayout>
    <div classname="pa3 topo bb b--black-10">
      <div classname="mw8 center">
        <div classname="w-100 ">
          <h1 classname="f1 f-headline-ns black-90 fw6 mb2 i garamond">
            {title}
          </h1>
        </div>
      </div>
    </div>

    <div classname="mw8 center pa3">
      <div classname="pv4">{children}</div>
    </div>
  </standardlayout>
)

const postlayout = ({ title, publishedat, children }) => (
  <standardlayout>
    <div classname="pa3 measure-wide center">
      <article classname="pv4">
        <header classname="w-100 pr4-ns ">
          <h1 classname="f2 f1-ns black-90 fw6 mb2 i garamond">{title}</h1>
          <time classname="f6 ttu tracked gray">{publishedat}</time>
        </header>
        <div classname="w-100">
          <div classname="lh-copy mt4 mt0-ns post-body ">{children}</div>
        </div>
      </article>
    </div>
  </standardlayout>
)

const projectlayout = ({ title, publishedat, repo, license, children }) => (
  <standardlayout>
    <div classname="center pa3 mw7">
      <article classname="pv4">
        <header classname="w-100 pr4-ns">
          <div classname="dt w-100">
            <h1 classname="dtc v-mid pr3 f2 f1-ns black-90 fw6 mb3 i garamond">
              {title}
            </h1>
            {repo && <github repo={repo} />}
          </div>

          <time classname="f6 ttu tracked gray">
            {publishedat.format('dddd, mmmm do 0yyyy')}
          </time>
        </header>
        <div classname="w-100">
          <div classname="lh-copy mt4 mt0-ns">{children}</div>
          {license === 'mit' || (
            <react.fragment>
              <h2>license</h2>
              <a
                classname="link dim underline black-60"
                href="https://opensource.org/licenses/mit"
              >
                mit license
              </a>
            </react.fragment>
          )}
        </div>
      </article>
    </div>
  </standardlayout>
)

const experimentlayout = ({ title, instructions, color, children }) => (
  <div classname="webgl-container" style={{ backgroundColor: color }}>
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
