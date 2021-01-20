import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Account from 'components/Account'

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
                },
                {
                    id: 2,
                    username: 'NotLoggedUser',
                    email: 'offline@currently.com',
                    avatar: '/assets/avatar/1.jpg',
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
                    newsId: 1,
                    userId: 1,
                    content: 'Test Comment 1'
                },
                {
                    id: 2,
                    newsId: 1,
                    userId: 1,
                    content: 'Test Comment 2'
                },
                {
                    id: 3,
                    newsId: 1,
                    userId: 2,
                    content: 'Test Comment 3'
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

        expect(wrapper.html()).not.toContain('Test Comment 3')
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
