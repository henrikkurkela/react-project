import React from 'react'
import { Header } from 'semantic-ui-react'

const About = () => {

    return (<div style={{ width: 'fit-content', height: 'fit-content', margin: 'auto', overflow: 'auto', padding: '5em' }}>
        <div style={{ float: 'left', display: 'inline-block', background: 'linear-gradient(0deg, rgba(0,0,255,1) 0%, rgba(0,0,255,1) 50%, rgba(0,255,255,1) 100%) no-repeat fixed', borderRadius: '1em', marginRight: '3em' }}>
            <Header as='h1' style={{ color: 'white', textAlign: 'center', margin: '1em', fontSize: '3em' }}>News<br />Site</Header>
        </div>
        <div style={{ display: 'inline-block', paddingTop: '1em' }}>
            <Header as='h3'>News Site Company, LLC</Header>
            <p><i>The Best News In Town!</i></p>
            <Header as='h3'>Contact Info</Header>
            <p>123 Media St., Newstown, Internet<br />
            + 012 345 6789< br />
            <a href="mailto: admin@localhost.com">admin@localhost.com</a></p>
        </div>
    </div>)
}

export default About
