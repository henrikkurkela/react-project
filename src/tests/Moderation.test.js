import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

import * as http from 'services/http'
import Moderation from 'components/Moderation'

configure({ adapter: new Adapter() })

describe('Moderation', () => {
    it('sends the reset request as expected', async () => {

        http.postRequest = jest.fn()
        http.postRequest.mockResolvedValue({ status: 204 })

        const wrapper = mount(
            <MemoryRouter initialEntries={['/moderation']}>
                <Moderation requestReset={() => { }} />
            </MemoryRouter>
        )

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(5).props().onClick()
        })

        expect(http.postRequest).toHaveBeenCalledWith('reset')
    })
})
