import usersReducer from 'reducers/usersReducer'

describe('usersReducer', () => {
    it('adds users correctly', () => {

        let state = []

        state = usersReducer(state, { type: 'NEW_USER', data: { id: 1, email: 'demo@user.com', username: 'DemoUser', avatar: 'default.jpg', type: 'user' } })

        expect(state).toEqual([{ id: 1, email: 'demo@user.com', username: 'DemoUser', avatar: 'default.jpg', type: 'user' }])
    })

    it('updates user data correctly', () => {

        let state = [{ id: 1, email: 'demo@user.com', username: 'DemoUser', avatar: 'default.jpg', type: 'user' }]

        state = usersReducer(state, { type: 'UPDATE_USER', data: { id: 1, avatar: '1.jpg' } })

        expect(state).toEqual([{ id: 1, email: 'demo@user.com', username: 'DemoUser', avatar: '1.jpg', type: 'user' }])
    })

    it('removes all users when reset', () => {

        let state = [{ id: 1, email: 'demo@user.com', username: 'DemoUser', avatar: 'default.jpg', type: 'user' }]

        state = usersReducer(state, { type: 'RESET' })

        expect(state).toEqual([])
    })
})
