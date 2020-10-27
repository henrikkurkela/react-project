import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Header, Icon, Divider, Image, Confirm } from 'semantic-ui-react'

import { deleteRequest } from './services/httpService'
import { removeNews } from './actions'

const ModerateNews = ({ news }) => {

    const [openConfrim, setOpenConfirm] = useState(false)
    const [selectedNews, setSelectedNews] = useState(null)

    const destroyNews = (news) => {
        deleteRequest(`news/${news.id}`).then((response) => {
            if (response.status === 200) {
                removeNews(news)
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    return (<>
        <Header as="h3">News</Header>
        <div>
            {news.map((item, key) =>
                <div key={key}>
                    <Icon style={{ float: 'right', display: 'inline-block', cursor: 'pointer' }} name='delete' onClick={() => {
                        setOpenConfirm(true)
                        setSelectedNews(item)
                    }}></Icon>
                    <Confirm
                        open={openConfrim}
                        onCancel={() => setOpenConfirm(false)}
                        onConfirm={() => {
                            destroyNews(selectedNews)
                            setOpenConfirm(false)
                        }}
                    />
                    <Header as='h3'>{item.headline}</Header>
                    {item.picture ? <Image fluid bordered style={{ marginBottom: '1.5rem', maxWidth: '50%' }} src={item.picture} /> : null}
                    {item.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
                    < Divider />
                </ div>)}
        </ div>
    </>)
}

const mapStateToProps = (state) => {
    return {
        news: state.news,
    }
}

const ConnectedModerateNews = connect(mapStateToProps)(ModerateNews)

export default ConnectedModerateNews
