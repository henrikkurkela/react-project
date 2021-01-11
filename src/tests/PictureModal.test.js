import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

import * as http from '../services/http'
import PictureModal from '../PictureModal'

configure({ adapter: new Adapter() })

describe('PictureModal', () => {
    it('displays the correct pictures and text', async () => {

        const open = true
        const setOpen = jest.fn()
        const action = jest.fn()

        http.getRequest = jest.fn()
        http.getRequest.mockResolvedValue({ data: { pictures: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'] } })

        const wrapper = mount(
            <PictureModal state={open} changeState={setOpen} action={action} />
        )

        await act(async () => {
            wrapper.update()
        })

        expect(wrapper.text()).toContain('Select Picture')

        expect(wrapper.html()).toContain('/assets/img/photo1.jpg')
        expect(wrapper.html()).toContain('/assets/img/photo2.jpg')
        expect(wrapper.html()).toContain('/assets/img/photo3.jpg')

        expect(wrapper.text()).toContain('Insert')
        expect(wrapper.text()).toContain('Cancel')
    })

    it('passes the correct object parameter on action', async () => {

        const open = true
        const setOpen = jest.fn()
        const action = jest.fn()

        http.getRequest = jest.fn()
        http.getRequest.mockResolvedValue({ data: { pictures: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'] } })

        let wrapper

        await act(async () => {
            wrapper = mount(
                <PictureModal state={open} changeState={setOpen} action={action} />
            )
        })

        await act(async () => {
            wrapper.find('Input').at(0).props().onChange({ target: { value: 'Captionissmus' } })

        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Image').at(0).props().onClick()
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(0).props().onClick()
        })

        expect(action).toHaveBeenCalledWith({ picture: '/assets/img/photo1.jpg', caption: 'Captionissmus' })
    })
})
