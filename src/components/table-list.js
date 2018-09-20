import React from 'react'

const colorMap = {
  dark: {
    text: 'white',
    bg: 'bg-dark-gray',
    border: 'b--white-40',
  },
  light: {
    text: 'black',
    bg: 'bg-near-white',
    border: 'b--black-40',
  },
}

const tableList = ({ data, columns, color, title }) => {
  const rows = data.map(d => (
    <tr>
      <Link to={d.url}>
        <td class="pv3 pr3 bb b--white-40">
          <a class="link underline dim white" href={d.url}>
            {d.title}
          </a>
        </td>
        <td class="pv3 pr3 bb b--white-40">{d.excerpt}</td>
      </Link>
    </tr>
  ))

  return (
    <div class="pa4 pb5 bg-dark-gray white">
      <div class="center mw8 f3">
        <h2 class="f2 white garamond i">{title}</h2>
      </div>
      <div class="overflow-auto">
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr>
              <th class="fw6 bb b--white-40 tl pb3 pr3 ">Title</th>
              <th class="fw6 bb b--white-40 tl pb3 pr3 ">Description</th>
            </tr>
          </thead>
          <tbody class="lh-copy">{rows}</tbody>
        </table>
      </div>
      <div class="w-100 mw8 center tc pt4">
        <a
          class="f6 br2 ba ph3 pv2 mb2 dib near-white hover-dark-gray bg-animate hover-bg-white no-underline index-button"
          href="/projects"
        >
          View More
        </a>
      </div>
    </div>
  )
}
