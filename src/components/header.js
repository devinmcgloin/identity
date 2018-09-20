import React from 'react'
import { Link } from 'gatsby'
import Logo from './logo'

const Header = ({ links }) => {
  const linkContent = links.map(l => (
    <Link
      className="link underline black dim fw5 f6 f5-ns dib mr3"
      to={l.slug}
      title={l.title}
      key={l.slug}
    >
      {l.title}
    </Link>
  ))

  return (
    <div className="bb b--black-10">
      <div className="mw8 center pa3">
        <nav className="black-70 flex flex-row justify-between items-center">
          <div className="w2 h2 ma1">
            <Link className="link pointer" to="/">
              <Logo />
            </Link>
          </div>
          <div>{linkContent}</div>
        </nav>
      </div>
    </div>
  )
}

export default Header
