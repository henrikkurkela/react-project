import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as http from 'services/http'
import Login from 'components/account/Login'

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn()
    })
}))

configure({ adapter: new Adapter() })
const mockStore = configureStore()
let store

describe('Login', () => {
    it('displays welcome text when already logged in', () => {

        store = mockStore({
            auth: {
                id: 1
            }
        })

        const wrapper = mount(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        expect(wrapper.html()).toContain('Welcome!')
    })

    it('displays login text when not logged in', () => {

        store = mockStore({})

        const wrapper = mount(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        expect(wrapper.html()).toContain('Login')
    })

    it('provides the login functionality', async () => {

        store = mockStore({})

        http.postRequest = jest.fn()
        http.postRequest.mockResolvedValue({ data: { auth: '123', email: 'demo@user.com', id: 1, username: 'DemoUser', avatar: 'default.jpg' } })

        let wrapper

        await act(async () => {
            wrapper = mount(
                <Provider store={store}>
                    <Login />
                </Provider>
            )

            wrapper.find('Input').at(0).props().onChange({ target: { value: 'demo@user.com' } })
            wrapper.find('Input').at(1).props().onChange({ target: { value: 'demouser' } })
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(0).props().onClick()
        })

        expect(http.postRequest).toHaveBeenCalledWith('login', { email: 'demo@user.com', password: 'demouser' })
    })
})
