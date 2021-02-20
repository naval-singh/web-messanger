import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style.css';

/**
* @author
* @function Header
**/

const Header = (props) => {
    return (
        <div className='headerContainer'>
            <div className='header'>
                <div className='logo'>
                    <Link to='/'>Web Messanger</Link>
                </div>
                <div className='rightMenu'>
                    <ul>
                        <li><NavLink to='/signin'>Sign In</NavLink></li>
                        <li><NavLink to='/signup'>Sign Up</NavLink></li>
                        <li><Link to='#'>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;