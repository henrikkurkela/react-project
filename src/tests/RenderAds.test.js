import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import RenderAds from 'components/RenderAds'

configure({ adapter: new Adapter() })
const mockStore = configureStore()
const store = mockStore({
    ads: [
        {
            picture: "/assets/img/photo4.jpg",
            href: "http://www.google.com"
        },
        {
            picture: "/assets/img/photo5.jpg",
            href: "http://www.bing.com"
        },
        {
            picture: "/assets/img/photo10.jpg",
            href: "http://www.duckduckgo.com"
        }
    ]
})

describe('RenderAds', () => {
    it('contains the correct links', () => {
        const wrapper = mount(
            <Provider store={store}>
                <RenderAds />
            </Provider>
        )
        expect(wrapper.html()).toContain('href="http://www.google.com"')
        expect(wrapper.html()).toContain('href="http://www.bing.com"')
        expect(wrapper.html()).toContain('href="http://www.duckduckgo.com"')
    })
})
