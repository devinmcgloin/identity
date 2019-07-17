import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

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
  );

const Title = ({ title }) =>
  title && (
    <div className="center mw8 f3">
      <h2 className="f2 black garamond i">{title}</h2>
    </div>
  );

const Carousel = ({ title, link, cards }) => {
  let renderable = (
    <div className="w-100 flex">
      {cards.map((card, index) => (
        <Link key={index} className="w-33 pa2" to={card.fields.slug}>
          <Img fluid={card.frontmatter.image.childImageSharp.fluid} />
        </Link>
      ))}
    </div>
  );

  return (
    <div className="center mw8">
      <Title title={title} />
      <section>{renderable}</section>
      <CallToAction link={link} />
    </div>
  );
};

export default Carousel;
