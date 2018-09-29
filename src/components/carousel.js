import React from 'react'
import { Link } from 'gatsby'

const CallToAction = ({ link }) =>
  link && (
    <div class="w-100 mw8 center tc pt4">
      <Link
        class="f6 link br2 ba ph3 pv2 mb2 dib dark-gray hover-near-white bg-animate hover-bg-dark-gray index-button"
        to={link}
      >
        View More
      </Link>
    </div>
  )

const Title = ({ title }) =>
  title && (
    <div class="center mw8 f3">
      <h2 class="f2 black garamond i">{title}</h2>
    </div>
  )
const Carousel = ({ title, link, cards }) => {
  const renderable = cards.map(card => (
    <article class="fl w-100 w-50-m w-25-ns pa2 grow">
      <Link to={card.slug}>
        <div class="aspect-ratio aspect-ratio--9x16-ns aspect-ratio--5x7-m aspect-ratio--1x1">
          <img
            style={{ backgroundImage: `url(${card.image})` }}
            class="db bg-center cover aspect-ratio--object bg-dark-gray br2"
          />
        </div>
      </Link>
    </article>
  ))

  return (
    <div class="pb5 pa4">
      <div class="mw8 center">
        <Title title={title} />
        <section class="cf w-100 pt3 pt4-ns pt5-l ">{renderable}</section>
        <CallToAction link={link} />
      </div>
    </div>
  )
}

export default Carousel
