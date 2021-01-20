import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { useParams } from 'react-router-dom'

import RenderNews from 'components/RenderNews'

configure({ adapter: new Adapter() })
const mockStore = configureStore()

const store = mockStore({
    auth: {
        id: 1,
        username: 'DemoUser',
        email: 'demo@user.com',
        auth: 'token123'
    },
    users: [
        {
            id: 1,
            username: 'DemoUser',
            email: 'demo@user.com',
            avatar: '/assets/avatar/default.jpg',
            type: 'user'
        }
    ],
    news: [
        {
            id: 1,
            headline: 'Lorem Ipsum',
            content: 'The test article contains two text paragraphs.\n\nThis is the second one.',
            likes: 1
        }
    ],
    comments: [
        {
            id: 1,
            newsId: 1,
            userId: 1,
            content: 'Test Comment 1'
        },
        {
            id: 2,
            newsId: 1,
            userId: 1,
            content: 'Test Comment 2'
        }
    ]
})

jest.mock('react-router-dom', () => (
    {
        ...jest.requireActual('react-router-dom'),
        useParams: jest.fn()
    })
)

describe('RenderNews', () => {
    it('displays the correct content for a given article', () => {

        useParams.mockReturnValue({ category: 1, story: 1 })

        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <RenderNews />
                </BrowserRouter>
            </Provider>
        )

        expect(wrapper.html()).toContain('Lorem Ipsum')
        expect(wrapper.html()).toContain('The test article contains two text paragraphs.')
        expect(wrapper.html()).toContain('This is the second one.')
        expect(wrapper.html()).toContain('Test Comment 1')
        expect(wrapper.html()).toContain('Test Comment 2')
    })

    it('displays the correct message when article is not found', () => {

        useParams.mockReturnValue({ category: 1, story: 9001 })

        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <RenderNews />
                </BrowserRouter>
            </Provider>
        )

        expect(wrapper.html()).toContain('Not Found')
        expect(wrapper.html()).toContain('Sorry, we could not find the article you were looking for.')
    })
})
