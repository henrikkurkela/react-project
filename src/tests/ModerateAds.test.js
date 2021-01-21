import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from 'services/http'
import * as actions from 'actions'
import ModerateAds from 'components/moderation/ModerateAds'

configure({ adapter: new Adapter() })
const mockStore = configureStore()
const store = mockStore({
    ads: [
        {
            id: 1,
            picture: '/assets/img/photo4.jpg',
            href: 'http://www.google.com'
        },
        {
            id: 2,
            picture: '/assets/img/photo5.jpg',
            href: 'http://www.bing.com'
        },
        {
            id: 3,
            picture: '/assets/img/photo10.jpg',
            href: 'http://www.duckduckgo.com'
        }
    ]
})

describe('ModerateAds', () => {
    it('deletes ads as expected', async () => {

        actions.removeAd = jest.fn(() => { return null })

        http.deleteRequest = jest.fn()
        http.deleteRequest.mockResolvedValue({ status: 204 })

        const wrapper = mount(
            <Provider store={store}>
                <ModerateAds />
            </Provider>
        )

        await act(async () => {
            wrapper.find('Icon').at(0).props().onClick()
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(2).props().onClick()
        })

        wrapper.update()

        expect(http.deleteRequest).toHaveBeenCalledWith('ads/1')
        expect(actions.removeAd).toHaveBeenCalledWith({
            id: 1,
            picture: '/assets/img/photo4.jpg',
            href: 'http://www.google.com'
        })
    })

    it('creates ads as expected', async () => {

        actions.addAd = jest.fn(() => { return null })

        http.postRequest = jest.fn()
        http.postRequest.mockResolvedValue({ status: 201, data: { id: 1, picture: '/assets/img/photo1.jpg', href: 'http://www.yahoo.com' } })

        http.getRequest = jest.fn()
        http.getRequest.mockResolvedValue({ status: 200, data: ['/assets/img/photo1.jpg'] })

        const wrapper = mount(
            <Provider store={store}>
                <ModerateAds />
            </Provider>
        )

        await act(async () => {
            wrapper.find('Button').at(0).props().onClick()
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Image').at(3).props().onClick()
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Input').at(0).props().onChange({ target: { value: 'http://www.yahoo.com' } })
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(1).props().onClick()
        })

        wrapper.update()

        expect(http.getRequest).toHaveBeenCalledWith('pictures')
        expect(http.postRequest).toHaveBeenCalledWith('ads', { picture: '/assets/img/photo1.jpg', href: 'http://www.yahoo.com' })
        expect(actions.addAd).toHaveBeenCalledWith({
            id: 1,
            picture: '/assets/img/photo1.jpg',
            href: 'http://www.yahoo.com'
        })
    })
})
