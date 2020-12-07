import authReducer from '../reducers/authReducer'

describe('authReducer', () => {
    it('stores login credentials correctly', () => {

        let state = null

        state = authReducer(state, { type: 'LOGIN', data: { id: 1, auth: 'abcd1234' } })

        expect(state).toEqual({ id: 1, auth: 'abcd1234' })
    })

    it('changes credentials on update', () => {

        let state = { id: 1, auth: 'abcd1234' }

        state = authReducer(state, { type: 'UPDATE_AUTH', data: { auth: 'efgh5678' } })

        expect(state).toEqual({ id: 1, auth: 'efgh5678' })
    })

    it('removes credentials on logout', () => {

        let state = { id: 1, auth: 'abcd1234' }

        state = authReducer(state, { type: 'LOGOUT' })

        expect(state).toEqual(null)
    })

    it('removes credentials on reset', () => {

        let state = { id: 1, auth: 'abcd1234' }

        state = authReducer(state, { type: 'RESET' })

        expect(state).toEqual(null)
    })
})
