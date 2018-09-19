import React from 'react'
import { Link } from 'gatsby'
import icon from '../images/icon'

const Header = ({ links }) => {
  const linkContent = links.map(l => (
    <Link
      class="link underline black dim fw5 f6 f5-ns dib mr3"
      href="{{l.url}}"
      title="{{l.title}}"
    >
      {l.title}
    </Link>
  ))

  return (
    <div class="bb b--black-10">
      <div class="mw8 center pa3">
        <nav class="black-70 flex flex-row justify-between items-center">
          <div class="w2 h2 ma1">
            <Link class="link pointer" href="/">
              {icon}
            </Link>
          </div>
          <div>{linkContent}</div>
        </nav>
      </div>
    </div>
  )
}

export default Header
