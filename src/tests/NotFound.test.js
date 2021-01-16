import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'

import NotFound from 'components/page/NotFound'

configure({ adapter: new Adapter() })

describe('NotFound', () => {
    it('has the correct text content', () => {
        const wrapper = mount(
            <NotFound type='site' />
        )
        expect(wrapper.text()).toContain('Sorry, we could not find the site you were looking for.')
    })

    it('implements the go back functionality correctly', async () => {

        let wrapper

        await act(async () => {
            wrapper = mount(
                <MemoryRouter initialEntries={['/previous', '/asd']}>
                    <Route path='/previous'>
                        <p>The previous page.</p>
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </MemoryRouter>
            )
        })

        expect(wrapper.text()).toContain('Sorry, we could not find the site you were looking for.')

        await act(async () => {
            wrapper.find('Button').at(0).props().onClick()
        })

        expect(wrapper.html()).toContain('The previous page.')
    })
})
