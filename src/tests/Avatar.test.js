import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from '../services/http'
import Avatar from '../Avatar'

configure({ adapter: new Adapter() })
const mockStore = configureStore()
const store = mockStore({
    auth: {
        id: 1
    }
})

describe('Avatars', () => {
    it('contains the correct avatars', async () => {

        http.getRequest = jest.fn()
        http.getRequest.mockResolvedValue({ data: { avatars: ['1.jpg', '2.jpg', '3.jpg', 'anon.jpg', 'default.jpg'] } })

        let wrapper

        await act(async () => {
            wrapper = mount(
                <Provider store={store}>
                    <Avatar />
                </Provider>
            )
        })

        wrapper.update()

        expect(wrapper.html()).toContain('src="/assets/avatar/1.jpg"')
        expect(wrapper.html()).toContain('src="/assets/avatar/2.jpg"')
        expect(wrapper.html()).toContain('src="/assets/avatar/3.jpg"')
        expect(wrapper.html()).toContain('src="/assets/avatar/anon.jpg"')
        expect(wrapper.html()).toContain('src="/assets/avatar/default.jpg"')
    })
})
