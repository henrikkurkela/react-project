import marketReducer from 'reducers/marketReducer'

describe('marketReducer', () => {
    it('stores values correctly', () => {

        let state = []

        state = marketReducer(state, { type: 'NEW_MARKET', data: [{ x: 1, y: 1 }, { x: 2, y: 2 }] })

        expect(state).toEqual([{ x: 1, y: 1 }, { x: 2, y: 2 }])
    })

    it('removes data when reset', () => {

        let state = [{ x: 1, y: 1 }, { x: 2, y: 2 }]

        state = marketReducer(state, { type: 'RESET' })

        expect(state).toEqual(null)
    })
})
