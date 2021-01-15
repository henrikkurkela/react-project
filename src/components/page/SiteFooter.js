import React from 'react'
import { Link } from 'react-router-dom'

const SiteFooter = () => {

    return (<div style={{ padding: '2em' }}>
        <p style={{ textAlign: 'center', color: 'white', fontSize: '1em' }}>
            Copyright © 1970 News Site Company, LLC. All rights reserved.<br />
            Any questions? Contact us via <a style={{ textAlign: 'center', fontSize: '1em', color: 'orange' }} href="mailto: admin@localhost.com">email</a>.<br />
            <Link style={{ textAlign: 'center', fontSize: '1em', color: 'orange' }} to='/about'>About us</Link>
        </p>
    </div>)
}

export default SiteFooter
