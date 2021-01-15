import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

import NotFound from 'components/page/NotFound'

configure({ adapter: new Adapter() })

describe('NotFound', () => {
    it('has the correct text content', () => {
        const wrapper = mount(
            <NotFound type='site' />
        )
        expect(wrapper.text()).toContain('Sorry, we could not find the site you were looking for.')
    })
})
