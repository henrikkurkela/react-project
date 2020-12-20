import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Header, Icon, Divider, Confirm, Image } from 'semantic-ui-react'

import { deleteRequest } from './services/httpService'
import { removeAd } from './actions'

const ModerateAds = () => {

    const ads = useSelector(state => state.ads)

    const [openConfrim, setOpenConfirm] = useState(false)
    const [selectedAd, setSelectedAd] = useState(null)

    const destroyAd = (ad) => {
        deleteRequest(`ads/${ad.id}`).then((response) => {
            if (response.status === 204) {
                removeAd(ad)
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    return (<>
        <Header as='h3'>Advertisements</Header>
        <div>
            {ads.map((item, key) =>
                <div key={key}>
                    <Icon style={{ float: 'right', display: 'inline-block', cursor: 'pointer' }} name='delete' onClick={() => {
                        setOpenConfirm(true)
                        setSelectedAd(item)
                    }} />
                    <Image
                        src={item.picture}
                        style={{ width: '245px', height: '490px' }}
                    />
                    <Confirm
                        open={openConfrim}
                        onCancel={() => setOpenConfirm(false)}
                        onConfirm={() => {
                            destroyAd(selectedAd)
                            setOpenConfirm(false)
                        }}
                    />
                    <Divider />
                </ div>)}
        </ div>
    </>)
}

export default ModerateAds
