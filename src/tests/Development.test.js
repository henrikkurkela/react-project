import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

import * as http from '../services/http'
import Development from '../Development'
import { BrowserRouter } from 'react-router-dom'

configure({ adapter: new Adapter() })

describe('Development', () => {
    it('contains the correct text', async () => {

        http.postRequest = jest.fn()
        http.postRequest.mockResolvedValue({ status: 200 })

        const wrapper = mount(
            <BrowserRouter>
                <Development requestReset={() => { }} />
            </BrowserRouter>
        )

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(1).props().onClick()
        })

        expect(http.postRequest).toHaveBeenCalledWith('reset')
    })
})
