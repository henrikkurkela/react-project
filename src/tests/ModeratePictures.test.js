import React from 'react'
import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

import * as http from 'services/http'
import ModeratePictures from 'components/moderation/ModeratePictures'

configure({ adapter: new Adapter() })

describe('ModeratePictures', () => {
    it('renders the current pictures correctly', async () => {

        http.getRequest = jest.fn()
        http.getRequest.mockResolvedValue({ status: 200, data: ['/assets/img/photo1.jpg', '/assets/img/photo2.jpg', '/assets/img/photo3.jpg'] })

        let wrapper

        await act(async () => {
            wrapper = mount(
                <ModeratePictures />
            )
        })

        wrapper.update()

        expect(http.getRequest).toHaveBeenCalledWith('pictures')

        expect(wrapper.html()).toContain('/assets/img/photo1.jpg')
        expect(wrapper.html()).toContain('/assets/img/photo2.jpg')
        expect(wrapper.html()).toContain('/assets/img/photo3.jpg')
    })

    it('deletes files correctly', async () => {

        http.getRequest = jest.fn()
        http.getRequest.mockResolvedValue({ status: 200, data: ['/assets/img/photo1.jpg', '/assets/img/photo2.jpg', '/assets/img/xxyyzz'] })

        http.deleteRequest = jest.fn()
        http.deleteRequest.mockResolvedValue({ status: 204 })

        let wrapper

        await act(async () => {
            wrapper = mount(
                <ModeratePictures />
            )
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Image').at(2).props().onClick()
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(1).props().onClick()
        })

        wrapper.update()

        expect(http.deleteRequest).toHaveBeenCalledWith('pictures/xxyyzz')
    })

    it('uploads files correctly', async () => {

        http.getRequest = jest.fn()
        http.getRequest.mockResolvedValue({ status: 200, data: ['/assets/img/photo1.jpg', '/assets/img/photo2.jpg', '/assets/img/xxyyzz'] })

        http.postForm = jest.fn()
        http.postForm.mockResolvedValue({ status: 201, data: { filename: '/assets/img/xxyyzz' } })

        const formData = new FormData()
        formData.append('picture', new Blob(['xyz'], { type: 'image/jpg' }))

        let wrapper

        await act(async () => {
            wrapper = mount(
                <ModeratePictures />
            )
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Input').at(0).props().onChange({ target: { files: [new Blob(['xyz'], { type: 'image/jpg' })] } })
        })

        wrapper.update()

        await act(async () => {
            wrapper.find('Button').at(0).props().onClick()
        })

        wrapper.update()

        expect(http.postForm).toHaveBeenCalledWith('upload', formData)
    })
})
