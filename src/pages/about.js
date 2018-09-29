import React from 'react'
import { Link } from 'gatsby'
import { HeaderLayout } from '../components/layout'

const About = () => (
  <HeaderLayout title="About">
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </HeaderLayout>
)

export default About
