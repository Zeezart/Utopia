import React from 'react'
import Navbar from '../Component/Navbar'
import MobileNavbar from '../Component/MobileNavbar'
import ExtraTab from '../Component/ExtraTab'

function Search() {
  return (
    <div id="search">
      <Navbar /> 
      <ExtraTab />
      <MobileNavbar />
    </div>
  )
}

export default Search