import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Logout from '../Logout'
import * as actions from '../actions'

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn()
    })
}))

configure({ adapter: new Adapter() })
const mockStore = configureStore()
const store = mockStore({})

describe('Logout', () => {
    it('triggers the logout functionality on render', () => {

        actions.logoutToken = jest.fn()

        mount(
            <Provider store={store}>
                <Logout />
            </Provider>
        )

        expect(actions.logoutToken).toHaveBeenCalled()
    })
})
