import reducer from './adsReducer'
import deepFreeze from 'deep-freeze'

describe('adsReducer', () => {
    test('returns new state with action NEW_AD', () => {
        const state = []
        const action = {
            type: 'NEW_AD',
            data: {
                id: 1,
                picture: "https://www.adnetwork.com/images/advert.jpg",
                href: "http://www.acmecompany.com"
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })
})
