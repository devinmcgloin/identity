import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const colorMap = {
  dark: {
    text: 'white',
    bg: 'bg-dark-gray',
    border: 'b--white-40',
    buttonColor: 'near-white',
    buttonHoverColor: 'hover-dark-gray',
    buttonHoverBg: 'hover-bg-white',
  },
  light: {
    text: 'black',
    bg: 'bg-white',
    border: 'b--black-40',
    buttonColor: 'dark-gray',
    buttonHoverColor: 'hover-near-white',
    buttonHoverBg: 'hover-bg-dark-gray',
  },
};

const TableLink = ({ title, url, color }) => (
  <td className={`pv3 pr3 bb ${colorMap[color].text}`}>
    <Link to={url} className={`link dim underline ${colorMap[color].text}`}>
      {title}
    </Link>
  </td>
);

const tableList = ({ columns, rows, color, title, link }) => {
  const tableRows = rows.map(d => (
    <tr key={d.slug}>
      {columns.map(c => {
        switch (c.type) {
          case 'title':
            return (
              <TableLink
                key={`${d.slug}-${c.type}`}
                title={d[c.type]}
                url={d.slug}
                color={color}
              />
            );
          default:
            return (
              <td
                key={`${d.slug}-${c.type}`}
                className={`pv3 pr3 bb ${colorMap[color].text}`}
              >
                {d[c.type]}
              </td>
            );
        }
      })}
    </tr>
  ));

  const columnTitles = columns.map(c => (
    <th key={c.type} className={`fw6 bb ${colorMap[color].text} tl pb3 pr3`}>
      {c.description}
    </th>
  ));

  const cta = link ? (
    <div className="w-100 mw8 center tc pt4">
      <Link
        className={`f6 br2 ba ph3 pv2 mb2 dib ${colorMap[color].buttonColor} ${
          colorMap[color].buttonHoverColor
        } bg-animate ${
          colorMap[color].buttonHoverBg
        } no-underline index-button`}
        to={link}
      >
        View More
      </Link>
    </div>
  ) : (
    undefined
  );

  const header = title ? (
    <div className="w-100 center mw8">
      <h2 className={`fw7 f3 f2-ns ${colorMap[color].text} garamond i`}>
        {title}
      </h2>
    </div>
  ) : (
    undefined
  );

  return (
    <div
      className={`pt4 pb5 ${colorMap[color].bg} ${
        colorMap[color].text
      } ma2 br2`}
    >
      {header}
      <div className="overflow-auto">
        <table className="f6 w-100 mw8 center" cellSpacing="0">
          <thead>
            <tr>{columnTitles}</tr>
          </thead>
          <tbody className="lh-copy">{tableRows}</tbody>
        </table>
      </div>
      {cta}
    </div>
  );
};

tableList.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dateFormatter: PropTypes.string,
    })
  ),
  rows: PropTypes.array,
  color: PropTypes.string.isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
};

export default tableList;
