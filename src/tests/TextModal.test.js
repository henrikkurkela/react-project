import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

import TextModal from 'components/modals/TextModal'

configure({ adapter: new Adapter() })

describe('TextModal', () => {
    it('displays the correct default placeholders', async () => {

        const open = true
        const setOpen = jest.fn()
        const action = jest.fn()


        const wrapper = mount(
            <TextModal state={open} changeState={setOpen} action={action} />
        )

        await act(async () => {
            wrapper.update()
        })

        expect(wrapper.html()).toContain('First Field')
        expect(wrapper.html()).toContain('Second Field')

        expect(wrapper.text()).toContain('Text Modal')
        expect(wrapper.text()).toContain('Insert')
        expect(wrapper.text()).toContain('Cancel')
    })

    it('displays the correct custom placeholders', async () => {

        const open = true
        const setOpen = jest.fn()
        const action = jest.fn()
        const labels = { header: 'Two Inputs', first: 'First Input', second: 'Second Input' }


        const wrapper = mount(
            <TextModal state={open} changeState={setOpen} action={action} labels={labels} />
        )

        await act(async () => {
            wrapper.update()
        })

        expect(wrapper.html()).toContain('First Input')
        expect(wrapper.html()).toContain('Second Input')

        expect(wrapper.text()).toContain('Two Inputs')
        expect(wrapper.text()).toContain('Insert')
        expect(wrapper.text()).toContain('Cancel')
    })

    it('passes the correct object parameter on action', async () => {

        const open = true
        const setOpen = jest.fn()
        const action = jest.fn()

        const wrapper = mount(
            <TextModal state={open} changeState={setOpen} action={action} />
        )

        await act(async () => {
            wrapper.find('Input').at(0).props().onChange({ target: { value: 'Lorem Ipsum' } })
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Input').at(1).props().onChange({ target: { value: 'Dolor Sit Amet' } })
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(0).props().onClick()
        })

        expect(action).toHaveBeenCalledWith({ first: 'Lorem Ipsum', second: 'Dolor Sit Amet' })
    })
})
