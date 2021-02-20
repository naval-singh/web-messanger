import React from 'react';
import Header from '../Header';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
    return (
        <>
            <Header />
            <div style={{ paddingTop: 70 }}>
                {props.children}
            </div>
        </>
    )
}

export default Layout;