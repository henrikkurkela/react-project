import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from '../services/http'
import Signup from '../Signup'

configure({ adapter: new Adapter() })
const mockStore = configureStore()
const store = mockStore({
    auth: {
        id: 1
    }
})

describe('Signup', () => {
    it('contains the correct text', () => {

        const wrapper = mount(
            <Provider store={store}>
                <Signup />
            </Provider>
        )

        expect(wrapper.html()).toContain('Sign Up')
        expect(wrapper.html()).toContain('Already have an account? Log in')
    })

    it('provides the signup functionality', async () => {

        http.postRequest = jest.fn()
        http.postRequest.mockResolvedValue({ data: { email: 'demo@user.com', id: 1, username: 'DemoUser', avatar: 'default.jpg' }, status: 400 })

        let wrapper

        await act(async () => {
            wrapper = mount(
                <Provider store={store}>
                    <Signup />
                </Provider>
            )

            wrapper.find('Input').at(0).props().onChange({ target: { value: 'demo@user.com' } })
            wrapper.find('Input').at(1).props().onChange({ target: { value: 'DemoUser' } })
            wrapper.find('Input').at(2).props().onChange({ target: { value: 'demouser' } })
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(0).props().onClick()
        })

        expect(http.postRequest).toHaveBeenCalledWith('signup', { email: 'demo@user.com', username: 'DemoUser', password: 'demouser' })
    })
})
