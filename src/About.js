import React from 'react'
import { Header, Image } from 'semantic-ui-react'

import { useWidth } from './hooks'

const About = () => {

    const mobile = useWidth()

    return (
        <div style={{ width: 'fit-content', height: 'fit-content', margin: 'auto', overflow: 'auto', padding: '5em 0 5em 0' }}>
            <Image src='/assets/img/photo11.jpg' floated={mobile ? null : 'left'} centered={mobile ? true : null} />
            <div style={{ display: 'inline-block', paddingTop: '1em' }}>
                <Header as='h3'>News Site Company, LLC</Header>
                <p><i>The Best News In Town!</i></p>
                <Header as='h3'>Contact Info</Header>
                <p>
                    123 Media St., Newstown, Internet<br />
                    + 012 345 6789< br />
                    <a href="mailto: admin@localhost.com">admin@localhost.com</a>
                </p>
            </div>
        </div>
    )
}

export default About
