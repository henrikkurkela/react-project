import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from '../services/http'
import RenderComments from '../RenderComments'

configure({ adapter: new Adapter() })
const mockStore = configureStore()
const store = mockStore({
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

describe('RenderComments', () => {
    it('contains the correct text', () => {

        const wrapper = mount(
            <Provider store={store}>
                <RenderComments id={1} />
            </Provider>
        )

        expect(wrapper.html()).toContain('Test Comment 1')
        expect(wrapper.html()).toContain('Test Comment 2')
    })

    it('allows anonymous commenting', async () => {

        http.postRequest = jest.fn()
        http.postRequest.mockResolvedValue({ data: { id: 3, newsid: 1, userid: null, content: 'Test Comment 3' } })

        let wrapper

        await act(async () => {
            wrapper = mount(
                <Provider store={store}>
                    <RenderComments id={1} />
                </Provider>
            )

            wrapper.find('TextArea').at(0).props().onChange({ target: { value: 'Test Comment 3' } })
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(0).props().onClick()
        })

        expect(http.postRequest).toHaveBeenCalledWith('comments', { content: 'Test Comment 3', newsid: 1, userid: null })
    })
})
