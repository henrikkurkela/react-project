import { NewsItem, RenderComments } from './RenderNews'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

describe('RenderNews', () => {
    test('news item being rendered correctly', () => {
        const headline = "A News Story"
        const content = "From a Buggy Galaxy Far, Far Away..."
        const component = render(
            <NewsItem item={{ content: content, headline: headline }} />
        )

        expect(component.container).toHaveTextContent(
            "A News Story"
        )

        expect(component.container).toHaveTextContent(
            "From a Buggy Galaxy Far, Far Away..."
        )
    })

    test('comments being rendered correctly', () => {
        const comments = [{
            id: 1,
            newsid: 1,
            content: "I quite dislike this article."
        }]

        const news = {
            id: 1,
            category: 1,
            picture: "Bug Wars Logo.png",
            headline: "A News Story",
            content: "From a Buggy Galaxy Far, Far Away..."
        }

        const component = render(
            <RenderComments news={news} comments={comments} />
        )

        expect(component.container).toHaveTextContent(
            "I quite dislike this article."
        )
    })
})
