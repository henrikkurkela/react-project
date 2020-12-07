import adsReducer from '../reducers/adsReducer'

describe('adsReducer', () => {
    it('stores ads correctly', () => {

        let state = []

        state = adsReducer(state, { type: 'NEW_AD', data: { id: 1, picture: 'ad1.jpg', href: 'www.google.fi' } })

        expect(state).toEqual([{ id: 1, picture: 'ad1.jpg', href: 'www.google.fi' }])
    })

    it('removes ads when reset', () => {

        let state = [{ id: 1, picture: 'ad1.jpg', href: 'www.google.fi' }]

        state = adsReducer(state, { type: 'RESET'})

        expect(state).toEqual([])
    })
})
