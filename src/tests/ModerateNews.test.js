import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from '../services/httpService'
import * as actions from '../actions'
import ModerateNews from '../ModerateNews'

configure({ adapter: new Adapter() })
const mockStore = configureStore()
const store = mockStore({
    news: [
        {
            id: 1,
            likes: 1,
            headline: 'News Story',
            content: 'Lorem Ipsum'
        }
    ]
})

describe('ModerateComments', () => {
    it('deletes comments as expected', async () => {

        actions.removeNews = jest.fn(() => { return null })
        http.deleteRequest = jest.fn()
        http.deleteRequest.mockResolvedValue({ status: 200 })

        const wrapper = mount(
            <Provider store={store}>
                <ModerateNews />
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

        expect(http.deleteRequest).toHaveBeenCalledWith('news/1')
        expect(actions.removeNews).toHaveBeenCalledWith({
            id: 1,
            likes: 1,
            headline: 'News Story',
            content: 'Lorem Ipsum'
        })
    })
})
