import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Header, Dropdown } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'

import { categories } from 'services/constants'
import { useWidth } from 'hooks'

const HeaderLink = ({ to, text, floated = 'none' }) => {

    const [hovered, setHovered] = useState({})

    return (
        <Link to={to} style={{ display: 'inline-block', padding: '1em', color: 'white', float: floated, ...hovered }}
            onMouseEnter={() => setHovered({ textShadow: '0 0 16px orange', color: 'orange' })}
            onMouseLeave={() => setHovered({})}
        >
            {text}
        </Link>
    )
}

const SiteHeader = () => {

    const auth = useSelector(state => state.auth)

    const mobile = useWidth()

    const history = useHistory()

    return (<div>
        <Header as='h1' style={{ color: 'white', textAlign: 'center', paddingTop: '1.5em', margin: '0', fontSize: '3em' }}>News Site</Header>
        <p style={{ textAlign: 'center', color: 'white', fontSize: '1em' }}>The Best News in Town!</p>
        {
            mobile ?
                <Dropdown placeholder='All News' style={{ display: 'inline-block', padding: '1em', color: 'white' }} clearable options={categories} onChange={(event, data) => history.push(`/${data.value}`)} /> :
                <>
                    <HeaderLink to='/' text='All News' />
                    {
                        categories.filter(item => item.key !== 0).map((item) =>
                            <HeaderLink key={item.key} to={`/${item.value}`} text={item.text} />
                        )
                    }
                </>
        }
        <HeaderLink to='/moderation' text='Moderation' floated='right' />
        {
            auth ?
                <>
                    <HeaderLink to='/logout' text='Logout' floated='right' />
                    <HeaderLink to='/account' text='Account' floated='right' />
                </> :
                <HeaderLink to='/login' text='Login' floated='right' />
        }
        <div style={{ clear: 'both' }} />
    </div>)

}

export default SiteHeader
