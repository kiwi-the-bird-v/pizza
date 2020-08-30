import React from 'react'
import {Link} from 'react-router-dom'

const PageNotFound = () => {
    return(
        <section id="page-not-found">
            <h1 className="empty">Page not found</h1>
            <Link to='/' className="back-to-menu">Back to menu</Link>
        </section>
    );
};

export default PageNotFound