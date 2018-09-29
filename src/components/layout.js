import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../components/header'

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
      <div className="sans-serif">
        <Header links={data.site.siteMetadata.headerLinks} />
        {children}
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
    <div className="center pa3 measure-wide">
      <article className="pv4">
        <header className="w-100 pr4-ns">
          <div className="dt w-100">
            <h1 className="dtc v-mid pr3 f2 f1-ns black-90 fw6 mb3 i garamond">
              {title}
            </h1>
            {/* {github || <Github repo={repo} />} */}
          </div>

          <time className="f6 ttu tracked gray">
            {publishedAt.format('dddd, MMMM Do 0YYYY')}
          </time>
        </header>
        <div className="w-100">
          <div className="lh-copy mt4 mt0-ns">{children}</div>
          {license == 'MIT' || (
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

export { StandardLayout, HeaderLayout, PostLayout, ProjectLayout }
