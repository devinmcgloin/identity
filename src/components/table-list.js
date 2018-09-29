import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import moment from 'moment'

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
}

const TableLink = ({ title, url, color }) => (
  <td class={`pv3 pr3 bb ${colorMap[color].text}`}>
    <Link to={url} className={`link dim underline ${colorMap[color].text}`}>
      {title}
    </Link>
  </td>
)
const TableDate = ({ date, formatter, color }) => {
  return (
    <td class={`pv3 pr3 bb ${colorMap[color].text}`}>
      {date.format(formatter)}
    </td>
  )
}

const tableList = ({ columns, rows, color, title, link }) => {
  const tableRows = rows.map(d => (
    <tr>
      {columns.map(c => {
        switch (c.type) {
          case 'title':
            return <TableLink title={d[c.type]} url={d.slug} color={color} />
          case 'date':
            return (
              <TableDate
                date={moment(Date.parse(d[c.type]))}
                formatter={c.dateFormatter}
                color={color}
              />
            )

          default:
            return (
              <td class={`pv3 pr3 bb ${colorMap[color].text}`}>{d[c.type]}</td>
            )
        }
      })}
    </tr>
  ))

  const columnTitles = columns.map(c => (
    <th class={`fw6 bb ${colorMap[color].text} tl pb3 pr3`}>{c.description}</th>
  ))

  const cta = link ? (
    <div class="w-100 mw8 center tc pt4">
      <Link
        class={`f6 br2 ba ph3 pv2 mb2 dib ${colorMap[color].buttonColor} ${
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
  )

  const header = title ? (
    <div class="w-100 center mw8 f3">
      <h2 class={`f2 ${colorMap[color].text} garamond i`}>{title}</h2>
    </div>
  ) : (
    undefined
  )

  return (
    <div class={`pa4 pb5 ${colorMap[color].bg} ${colorMap[color].text}`}>
      {header}
      <div class="overflow-auto">
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr>{columnTitles}</tr>
          </thead>
          <tbody class="lh-copy">{tableRows}</tbody>
        </table>
      </div>
      {cta}
    </div>
  )
}

tableList.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      dateFormatter: PropTypes.string,
    })
  ),
  rows: PropTypes.array,
  color: PropTypes.string.isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
}

export default tableList
