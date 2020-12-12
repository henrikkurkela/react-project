import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Account from '../Account'

configure({ adapter: new Adapter() })
const mockStore = configureStore()

describe('Account', () => {
    it('displays the correct username and comments when logged in', () => {

        const store = mockStore({
            auth: {
                id: 1,
                username: 'DemoUser',
                email: 'demo@user.com',
                auth: 'token123'
            },
            users: [
                {
                    id: 1,
                    username: 'DemoUser',
                    email: 'demo@user.com',
                    avatar: '/assets/avatar/default.jpg',
                    type: 'user'
                }
            ],
            news: [
                {
                    id: 1,
                    likes: 1
                }
            ],
            comments: [
                {
                    id: 1,
                    newsid: 1,
                    userid: 1,
                    content: 'Test Comment 1'
                },
                {
                    id: 2,
                    newsid: 1,
                    userid: 1,
                    content: 'Test Comment 2'
                }
            ]
        })

        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Account />
                </BrowserRouter>
            </Provider>
        )

        expect(wrapper.html()).toContain('DemoUser')
        expect(wrapper.html()).toContain('Test Comment 1')
        expect(wrapper.html()).toContain('Test Comment 2')
    })

    it('displays the correct content when logged out', () => {

        const store = mockStore({})

        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Account />
                </BrowserRouter>
            </Provider>
        )

        expect(wrapper.html()).toContain('Not Logged In')
    })
})