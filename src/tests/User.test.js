import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { useParams } from 'react-router-dom'

import User from '../User'

configure({ adapter: new Adapter() })
const mockStore = configureStore()
const store = mockStore({
    users: [
        {
            id: 1,
            username: 'DemoUser',
            email: 'demo@user.com'
        }
    ],
    comments: [
        {
            id: 1,
            newsid: 1,
            userid: 1,
            content: 'Demo Comment'
        }
    ]
})

jest.mock('react-router-dom', () => (
    {
        ...jest.requireActual('react-router-dom'),
        useParams: jest.fn()
    })
)

describe('User', () => {
    it('displays the correct message when user is not found', () => {

        useParams.mockReturnValue({ user: undefined })

        const wrapper = mount(
            <Provider store={store}>
                <User />
            </Provider>
        )

        expect(wrapper.html()).toContain('Not Found')
    })

    it('displays the correct user information', () => {

        useParams.mockReturnValue({ user: 1 })

        const wrapper = mount(
            <Provider store={store}>
                <User />
            </Provider>
        )

        expect(wrapper.html()).toContain('DemoUser')
        expect(wrapper.html()).toContain('Demo Comment')
    })
})
