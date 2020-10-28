import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { categories } from './constants'

const SiteHeader = ({ auth }) => {


    return (<div>
        <Header as='h1' style={{ color: 'white', textAlign: 'center', paddingTop: '1.5em', margin: '0', fontSize: '3em' }}>News Site</Header>
        <p style={{ textAlign: 'center', color: 'white', fontSize: '1em' }}>The Best News in Town!</p>
        <Link to={'/'} style={{ display: 'inline-block', padding: '1em', color: 'white' }}>All News</Link>
        {categories.filter(item => item.key !== 0).map((item) => <Link key={item.key} to={`/${item.value}`} style={{ display: 'inline-block', padding: '1em', color: 'white' }}>{item.text}</Link>)}
        <Link to="/development" style={{ float: 'right', display: 'inline-block', padding: '1em', color: 'orange' }}>Development</Link>
        {
            auth ?
                <>
                    <Link to="/logout" style={{ float: 'right', display: 'inline-block', padding: '1em', color: 'white' }}>Logout</Link>
                    <Link to="/account" style={{ float: 'right', display: 'inline-block', padding: '1em', color: 'white' }}>Account</Link>
                </> :
                <Link to="/login" style={{ float: 'right', display: 'inline-block', padding: '1em', color: 'white' }}>Login</Link>
        }
    </div>)

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const ConnectedSiteHeader = connect(mapStateToProps)(SiteHeader)

export default ConnectedSiteHeader
