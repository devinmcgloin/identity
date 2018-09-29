import React from 'react'
import { Link } from 'gatsby'

const CallToAction = ({ link }) =>
  link && (
    <div className="w-100 mw8 center tc pv4">
      <Link
        className="f6 link br2 ba ph3 pv2 mb2 dib dark-gray hover-near-white bg-animate hover-bg-dark-gray index-button"
        to={link}
      >
        View More
      </Link>
    </div>
  )

const Title = ({ title }) =>
  title && (
    <div className="center mw8 f3">
      <h2 className="f2 black garamond i">{title}</h2>
    </div>
  )
const Carousel = ({ title, link, cards }) => {
  const renderable = (
    <React.Fragment>
      <div class="fl w-100 w-100-m w-50-l pa2">
        <Link to={cards[0].slug}>
          <div
            class="cover pv5 pv6-m pv7-l"
            style={{
              background: `black url(${cards[0].src}) center`,
            }}
          />
        </Link>
      </div>
      <div class="fl w-50 w-25-l pa2">
        <Link to={cards[1].slug}>
          <div
            class="cover pv5 pv6-m pv7-l"
            style={{
              background: `black url(${cards[1].src}) center`,
            }}
          />
        </Link>
      </div>
      <div class="fl w-50 w-25-l pa2">
        <Link to={cards[2].slug}>
          <div
            class="cover pv5 pv6-m pv7-l"
            style={{
              background: `black url(${cards[3].src}) center`,
            }}
          />
        </Link>
      </div>
    </React.Fragment>
  )

  return (
    <div className="">
      <div className="center">
        <Title title={title} />
        <section className="w-100 ph2 cf helvetica dark-gray bg-white">
          {renderable}
        </section>
        <CallToAction link={link} />
      </div>
    </div>
  )
}

export default Carousel
