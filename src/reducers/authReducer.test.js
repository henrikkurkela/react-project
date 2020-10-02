import reducer from './authReducer'
import deepFreeze from 'deep-freeze'

describe('authReducer', () => {
    test('returns new state with action LOGIN', () => {
        const state = []
        const action = {
            type: 'LOGIN',
            data: {
                id: 1,
                user: "test@user.com",
                auth: "xxx.yyy.zzz"
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toEqual(action.data)
    })

    test('returns empty state with action LOGOUT', () => {
        const state = []
        const action = {
            type: 'LOGOUT',
            data: null
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toEqual(null)
    })
})
