import React from 'react'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from 'services/http'
import * as actions from 'actions'
import Unregister from 'components/account/Unregister'

configure({ adapter: new Adapter() })
const mockStore = configureStore()
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
            newsId: 1,
            userId: 1,
            content: 'Test Comment 1'
        },
        {
            id: 2,
            newsId: 1,
            userId: 1,
            content: 'Test Comment 2'
        }
    ]
})

describe('Unregister', () => {
    it('performs the correct actions when delete is pressed', async () => {

        actions.removeComment = jest.fn(() => { return null })
        actions.logoutToken = jest.fn(() => { return null })
        http.deleteRequest = jest.fn()
        http.deleteRequest.mockResolvedValue({ status: 204 })

        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Unregister />
                </BrowserRouter>
            </Provider>
        )

        await act(async () => {
            wrapper.find('Button').at(1).props().onClick()
        })

        expect(http.deleteRequest).toHaveBeenCalledWith('users/1')
        expect(actions.removeComment).toHaveBeenCalledWith({
            id: 1,
            newsId: 1,
            userId: 1,
            content: 'Test Comment 1'
        })
        expect(actions.removeComment).toHaveBeenCalledWith({
            id: 2,
            newsId: 1,
            userId: 1,
            content: 'Test Comment 2'
        })
        expect(actions.logoutToken).toHaveBeenCalled()
    })
})
