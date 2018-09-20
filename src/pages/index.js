import React from 'react'
import { Link } from 'gatsby'
import Header from '../components/header'
import { Splash } from '../components/splash'
import 'tachyons/css/tachyons.css'
import '../style/identity.css'
import Currently from '../components/currently'

const IndexPage = ({ data }) => (
  <React.Fragment>
    <Header links={data.site.siteMetadata.headerLinks} />
    <Splash />
    <Currently />
  </React.Fragment>
)

export const query = graphql`
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
`

export default IndexPage
