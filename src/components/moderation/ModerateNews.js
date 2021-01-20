import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Icon, Divider, Confirm } from 'semantic-ui-react'

import { deleteRequest } from 'services/http'
import { removeComment, removeNews } from 'actions'
import { ParseArticle } from 'components/RenderNews'

const ModerateNews = () => {

    const news = useSelector(state => state.news)
    const comments = useSelector(state => state.comments)

    const [openConfrim, setOpenConfirm] = useState(false)
    const [selectedNews, setSelectedNews] = useState(null)

    const history = useHistory()

    const destroyNews = (news) => {
        deleteRequest(`news/${news.id}`).then(() => {

            comments
                .filter((comment) => comment.newsId === news.id)
                .map((comment) => removeComment(comment))

            removeNews(news)
        }).catch((error) => {
            console.log(error.response?.status)
        })
    }

    const editNews = (news) => {
        history.push('/moderation/publish', news)
    }

    return (<>
        <Header as="h3">News</Header>
        <div>
            {news.map((item, key) =>
                <div key={key}>
                    <Icon style={{ float: 'right', display: 'inline-block', cursor: 'pointer' }} name='delete' onClick={() => {
                        setOpenConfirm(true)
                        setSelectedNews(item)
                    }} />
                    <Icon style={{ float: 'left', display: 'inline-block', cursor: 'pointer' }} name='edit' onClick={() => {
                        editNews(item)
                    }} />
                    <Confirm
                        open={openConfrim}
                        onCancel={() => setOpenConfirm(false)}
                        onConfirm={() => {
                            destroyNews(selectedNews)
                            setOpenConfirm(false)
                        }}
                    />
                    <ParseArticle item={item} showComments={false} />
                    <Divider />
                    <div style={{ clear: 'both' }} />
                </ div>)}
        </ div>
    </>)
}

export default ModerateNews
