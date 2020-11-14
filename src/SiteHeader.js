import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { categories } from './constants'

const HeaderLink = ({ to, text, floated = 'none' }) => {

    const [hovered, setHovered] = useState('')

    return (
        <Link to={to} style={{ display: 'inline-block', padding: '1em', color: 'white', float: floated, textShadow: hovered }}
            onMouseEnter={() => setHovered('0 0 16px darkblue')}
            onMouseLeave={() => setHovered('')}
        >
            {text}
        </Link>
    )
}

const SiteHeader = () => {

    const auth = useSelector(state => state.auth)

    return (<div>
        <Header as='h1' style={{ color: 'white', textAlign: 'center', paddingTop: '1.5em', margin: '0', fontSize: '3em' }}>News Site</Header>
        <p style={{ textAlign: 'center', color: 'white', fontSize: '1em' }}>The Best News in Town!</p>
        <HeaderLink to='/' text='All News' />
        {
            categories.filter(item => item.key !== 0).map((item) =>
                <HeaderLink key={item.key} to={`/${item.value}`} text={item.text} />
            )
        }
        <HeaderLink to='/development' text='Development' floated='right' />
        {
            auth ?
                <>
                    <HeaderLink to='/logout' text='Logout' floated='right' />
                    <HeaderLink to='/account' text='Account' floated='right' />
                </> :
                <HeaderLink to='/login' text='Login' floated='right' />
        }
    </div>)

}

export default SiteHeader
