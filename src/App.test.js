import { ExportNewsItem } from './App'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

describe('App', () => {
    test('news item being rendered correctly', () => {
        const headline = "A News Story"
        const content = "From a Buggy Galaxy Far, Far Away..."
        const component = render(
            <ExportNewsItem headline={headline} content={content} />
        )

        expect(component.container).toHaveTextContent(
            "A News Story"
        )

        expect(component.container).toHaveTextContent(
            "From a Buggy Galaxy Far, Far Away..."
        )
    })
})
