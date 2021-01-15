import newsReducer from 'reducers/newsReducer'

describe('newsReducer', () => {
    it('stores news items correctly', () => {

        let state = []

        state = newsReducer(state, { type: 'NEW_NEWS', data: { id: 1, likes: 1, category: 1, headline: 'New Story', content: 'Lorem Ipsum' } })

        expect(state).toEqual([{ id: 1, likes: 1, category: 1, headline: 'New Story', content: 'Lorem Ipsum' }])
    })

    it('updates news items correctly', () => {

        let state = [{ id: 1, likes: 1, category: 1, headline: 'New Story', content: 'Lorem Ipsum' }]

        state = newsReducer(state, { type: 'UPDATE_NEWS', data: { id: 1, likes: 9001 } })

        expect(state).toEqual([{ id: 1, likes: 9001, category: 1, headline: 'New Story', content: 'Lorem Ipsum' }])
    })

    it('removes news items correctly', () => {

        let state = [
            { id: 1, likes: 1, category: 1, headline: 'New Story', content: 'Lorem Ipsum' },
            { id: 2, likes: 1, category: 1, headline: 'Old Story', content: 'Dolor Sit Amet' }
        ]

        state = newsReducer(state, { type: 'REMOVE_NEWS', data: { id: 2 } })

        expect(state).toEqual([{ id: 1, likes: 1, category: 1, headline: 'New Story', content: 'Lorem Ipsum' }])
    })

    it('removes all stories when reset', () => {

        let state = [
            { id: 1, likes: 1, category: 1, headline: 'New Story', content: 'Lorem Ipsum' },
            { id: 2, likes: 1, category: 1, headline: 'Old Story', content: 'Dolor Sit Amet' }
        ]

        state = newsReducer(state, { type: 'RESET' })

        expect(state).toEqual([])
    })
})
