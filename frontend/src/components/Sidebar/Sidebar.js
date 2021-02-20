import React from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Sidebar.css'
import { IconContext } from 'react-icons'
import logo from '../../images/logo_transparent.png'
import { Button } from '@material-ui/core'
import classNames from 'classnames'

function Sidebar() {
  // let multiClasses = classNames({
  //   ''
  // })
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='sidebar-menu'>
          <ul className='sidebar-menu-items'>
            <li className='sidebar-logo'>
              <Link to='/'>
                <img className='logo' src={logo} alt='' />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.className}>
                  <Link to={item.path}>{item.icon}</Link>
                  <span class='tooltiptext'>{item.toolTipText}</span>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
