import React from 'react'
import { MenuItems } from './MenuItems'
import { Link } from 'react-router-dom'
import "./NavBarcss.css";
function NavBar() {
  return (
    <div className='navbar'>
      {
        MenuItems.map((item)=>{
          return (
          <Link key={item.css} to={item.url} style={{textDecoration:"none"}}>
              <li className='linkss'>
              <p>{item.name}</p>
              </li>
          </Link>
          )

          })
      }
    </div>
  )
}

export default NavBar
