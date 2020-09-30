import { RenderComments } from './RenderComments'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

describe('RenderComments', () => {
    test('comments being rendered correctly', () => {
        const comments = [{
            id: 1,
            newsid: 1,
            content: "I quite dislike this article."
        }]

        const news = [{
            id: 1,
            category: 1,
            picture: "Bug Wars Logo.png",
            headline: "A News Story",
            content: "From a Buggy Galaxy Far, Far Away..."
        }]

        const component = render(
            <RenderComments id={1} news={news} comments={comments} />
        )

        expect(component.container).toHaveTextContent(
            "I quite dislike this article."
        )
    })
})