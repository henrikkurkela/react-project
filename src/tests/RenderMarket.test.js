import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from '../services/http'
import * as actions from '../actions'
import RenderMarket from '../RenderMarket'

configure({ adapter: new Adapter() })
const mockStore = configureStore()

const marketArray = [
    { x: 1, y: 0 },
    { x: 2, y: 2 },
    { x: 3, y: 1 },
    { x: 4, y: 4 },
    { x: 5, y: 3 },
    { x: 6, y: 5 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 3 },
    { x: 10, y: 1 }
]

const store = mockStore({
    market: marketArray
})

describe('RenderMarket', () => {
    it('displays the correct prediction for a given market status', () => {

        actions.updateMarket = jest.fn(() => { return null })
        http.getRequest = jest.fn()
        http.getRequest.mockResolvedValue({ status: 200, data: { market: marketArray } })

        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <RenderMarket />
                </BrowserRouter>
            </Provider>
        )

        wrapper.update()

        expect(wrapper.html()).toContain('Recent performance: stable')
    })
})
