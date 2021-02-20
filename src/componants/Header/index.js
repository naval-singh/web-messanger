import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../actions';
import './style.css';

/**
* @author
* @function Header
**/

const Header = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout())
    }

    const renderNonLoggedInMenu = () => {
        return (
            <ul>
                <li><NavLink to='/signin'>Sign In</NavLink></li>
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
            </ul>
        )
    }

    const renderLoggedInMenu = () => {
        return (
            <>
                <ul>
                    <li>{`Hi ${auth.firstName} ${auth.lastName},`}</li>
                </ul>
                <ul>
                    <li><Link style={{ color: '#fff' }} onClick={handleLogout} to='#'>Logout</Link></li>
                </ul>
            </>
        )
    }

    return (
        <div className='headerContainer'>
            <div className='header'>
                <div className='logo'>
                    <Link to='/'>Web Messanger</Link>
                </div>
                <div className='rightMenu'>
                    {
                        localStorage.getItem('user') ?
                            renderLoggedInMenu() :
                            renderNonLoggedInMenu()
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;