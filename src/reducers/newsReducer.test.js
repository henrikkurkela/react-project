import reducer from './newsReducer'
import deepFreeze from 'deep-freeze'

describe('newsReducer', () => {
    test('returns new state with action NEW_ITEM', () => {
        const state = []
        const action = {
            type: 'NEW_ITEM',
            data: {
                id: 1,
                category: 1,
                headline: "A News Story",
                content: "From a Buggy Galaxy Far, Far Away..."
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })
})
