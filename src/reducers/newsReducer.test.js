import reducer from './newsReducer'
import deepFreeze from 'deep-freeze'

describe('newsReducer', () => {
    test('returns new state with action NEW_ITEM', () => {
        const state = []
        const action = {
            type: 'NEW_NEWS',
            data: {
                id: 1,
                category: 1,
                picture: "Bug Wars Logo.png",
                headline: "A News Story",
                content: "From a Buggy Galaxy Far, Far Away..."
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })

    test('returns updated state with action UPDATE_ITEM', () => {
        const state = [{
            id: 1,
            category: 1,
            picture: "Bug Wars Logo.png",
            headline: "A News Story",
            content: "From a Buggy Galaxy Far, Far Away..."
        }]
        const action = {
            type: 'UPDATE_NEWS',
            data: {
                id: 1,
                category: 1,
                picture: "Bug Wars Logo.bmp",
                headline: "A News Story",
                content: "From a Buggy Yet Up-to-date Galaxy Far, Far Away..."
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })
})
