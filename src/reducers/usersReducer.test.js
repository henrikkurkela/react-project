import reducer from './usersReducer'
import deepFreeze from 'deep-freeze'

describe('usersReducer', () => {
    test('returns new state with action NEW_USER', () => {
        const state = []
        const action = {
            type: 'NEW_USER',
            data: {
                id: 1,
                username: "demouser",
                avatar: "/assets/avatar/1.jpg"
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })
})
