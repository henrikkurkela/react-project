import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Header, Icon, Confirm, Image, Button } from 'semantic-ui-react'

import { postRequest, deleteRequest } from './services/http'
import { addAd, removeAd } from './actions'

import PictureModal from './PictureModal'

const ModerateAds = () => {

    const ads = useSelector(state => state.ads)

    const [newAd, setNewAd] = useState(false)
    const [openConfrim, setOpenConfirm] = useState(false)
    const [selectedAd, setSelectedAd] = useState(null)

    const createAd = (ad) => {
        postRequest('/ads', { picture: ad.picture, href: ad.caption }).then((response) => {
            addAd(response.data)
        }).catch((error) => {
            console.log(error.response?.status)
        })
    }

    const destroyAd = (ad) => {
        deleteRequest(`ads/${ad.id}`).then(() => {
            removeAd(ad)
        }).catch((error) => {
            console.log(error.response?.status)
        })
    }

    return (<>
        <Header as='h3'>Advertisements</Header>
        <Button onClick={() => setNewAd(true)}>New Ad</Button>
        <div>
            {ads.map((item, key) =>
                <div key={key} style={{ padding: '1em 1em 1em 0em', float: 'left', position: 'relative', textAlign: 'center' }}>
                    <Image
                        src={item.picture}
                        style={{ width: '245px', height: '490px' }}
                    />
                    <Icon style={{ position: 'absolute', top: '4%', right: '8%', cursor: 'pointer' }} name='delete' onClick={() => {
                        setOpenConfirm(true)
                        setSelectedAd(item)
                    }} />
                    <a href={item.href} rel='noreferrer' target='_blank'>{item.href}</a>
                    <Confirm
                        open={openConfrim}
                        onCancel={() => setOpenConfirm(false)}
                        onConfirm={() => {
                            destroyAd(selectedAd)
                            setOpenConfirm(false)
                        }}
                    />
                </div>)}
        </div>
        <PictureModal state={newAd} changeState={setNewAd} action={createAd} />
    </>)
}

export default ModerateAds
