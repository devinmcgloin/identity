import React from 'react';
import { Link, withPrefix } from 'gatsby';

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
      <h2 className="f2 black proza-libre i">{title}</h2>
    </div>
  );

const Carousel = ({ title, link, cards }) => {
  const renderable = (
    <React.Fragment>
      <div className="fl w-100 w-100-m w-50-l pa2">
        <Link to={cards[0].slug}>
          <div
            className="cover pv5 pv6-m pv7-l"
            style={{
              background: `black url(${withPrefix(cards[0].image)}) center`,
            }}
          />
        </Link>
      </div>
      <div className="fl w-50 w-25-l pa2">
        <Link to={cards[1].slug}>
          <div
            className="cover pv5 pv6-m pv7-l"
            style={{
              background: `black url(${withPrefix(cards[1].image)}) center`,
            }}
          />
        </Link>
      </div>
      <div className="fl w-50 w-25-l pa2">
        <Link to={cards[2].slug}>
          <div
            className="cover pv5 pv6-m pv7-l"
            style={{
              background: `black url(${withPrefix(cards[2].image)}) center`,
            }}
          />
        </Link>
      </div>
    </React.Fragment>
  );

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
  );
};

export default Carousel;
