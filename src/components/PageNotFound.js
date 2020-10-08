import React from 'react'
import {Link} from 'react-router-dom'

const PageNotFound = () => {
    return(
        <section className="empty-block">
            <h1 className="empty-block__message">Page not found</h1>
            <Link to='/' className="empty-block__link">Back to menu</Link>
        </section>
    );
};

export default PageNotFound
