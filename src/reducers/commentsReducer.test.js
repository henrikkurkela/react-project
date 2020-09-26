import reducer from './commentsReducer'
import deepFreeze from 'deep-freeze'

describe('commentsReducer', () => {
    test('returns new state with action NEW_COMMENT', () => {
        const state = []
        const action = {
            type: 'NEW_COMMENT',
            data: {
                id: 1,
                newsid: 1,
                content: "I didn't enjoy this article very much at all."
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })
})
