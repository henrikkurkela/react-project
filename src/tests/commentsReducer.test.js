import commentsReducer from 'reducers/commentsReducer'

describe('commentsReducer', () => {
    it('stores comments corretly', () => {

        let state = []

        state = commentsReducer(state, { type: 'NEW_COMMENT', data: { id: 1, userId: 1, content: 'Example Comment' } })

        expect(state).toEqual([{ id: 1, userId: 1, content: 'Example Comment' }])
    })

    it('removes comments correctly', () => {

        let state = [{ id: 1, userId: 1, content: 'Example Comment' }]

        state = commentsReducer(state, { type: 'REMOVE_COMMENT', data: { id: 1 } })

        expect(state).toEqual([])
    })

    it('removes all comments on reset', () => {

        let state = [{ id: 1, userId: 1, content: 'Example Comment' }]

        state = commentsReducer(state, { type: 'RESET' })

        expect(state).toEqual([])
    })
})
