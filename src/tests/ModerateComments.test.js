import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from '../services/http'
import * as actions from '../actions'
import ModerateComments from '../ModerateComments'

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

describe('ModerateComments', () => {
    it('deletes comments as expected', async () => {

        actions.removeComment = jest.fn(() => { return null })
        http.deleteRequest = jest.fn()
        http.deleteRequest.mockResolvedValue({ status: 204 })

        const wrapper = mount(
            <Provider store={store}>
                <ModerateComments />
            </Provider>
        )


        await act(async () => {
            wrapper.find('Icon').at(0).props().onClick()
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(1).props().onClick()
        })

        wrapper.update()

        expect(http.deleteRequest).toHaveBeenCalledWith('comments/1')
        expect(actions.removeComment).toHaveBeenCalledWith({
            id: 1,
            newsid: 1,
            userid: 1,
            content: 'Test Comment 1'
        })
    })
})
