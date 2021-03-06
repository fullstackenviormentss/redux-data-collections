import relationshipsReducer from 'reducers/relationships'
import {
  reset,
  set,
  deleteOne,
  deleteRelationship,
  concat,
  filter,
  map,
  push,
  reverse,
  slice,
  sort,
  splice,
  unshift
} from 'actions/relationships'

const makeRelationships = (relationship, meta) => {
  const state = {
    author: {
      data: { type: 'person', id: 'test-person-id-1' },
      meta: {}
    },
    comments: {
      data: [
        { type: 'comment', id: 'test-comment-id-1' },
        { type: 'comment', id: 'test-comment-id-2' }
      ],
      meta: {}
    }
  }
  if (relationship && state[relationship]) {
    state[relationship].meta = meta
  }
  return state
}
const options = {
  relationships: {
    author: { isOne: true, accepts: ['person'] },
    comments: { isOne: false, accepts: ['comment'] }
  }
}

describe('Reducers', () => {
  describe('relationshipsReducer', () => {
    it('returns initial state for empty action', () => {
      const initialState = makeRelationships()
      const expectedState = { ...initialState }
      const action = {}
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('returns initial state for author action', () => {
      const initialState = makeRelationships()
      const expectedState = { ...initialState }
      const action = { key: 'author' }
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('returns initial state for comment action', () => {
      const initialState = makeRelationships()
      const expectedState = { ...initialState }
      const action = { key: 'comment' }
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('returns initial state for foo action', () => {
      const initialState = makeRelationships()
      const expectedState = {...initialState}
      const action = { key: 'foo' }
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('reset with one changedData', () => {
      const payload = { type: 'post', key: 'author' }
      const initialState = makeRelationships('author', {
        changedData: { type: 'person', id: 'test-person-id-2' }
      })
      const expectedState = {
        ...initialState,
        author: {
          ...initialState.author,
          meta: { }
        }
      }
      const action = reset(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('reset with one isDeleted', () => {
      const payload = { type: 'post', key: 'author' }
      const initialState = makeRelationships('author', { isDeleted: true })
      const expectedState = {
        ...initialState,
        author: {
          ...initialState.author,
          meta: { }
        }
      }
      const action = reset(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('reset with many changedData', () => {
      const payload = { type: 'post', key: 'comments' }
      const initialState = makeRelationships('comments', {
        changedData: [
          { type: 'comment', id: 'test-comment-id-1' },
          { type: 'comment', id: 'test-comment-id-2' },
          { type: 'comment', id: 'test-comment-id-3' }
        ]
      })
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: { }
        }
      }
      const action = reset(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('reset with many isDeleted', () => {
      const payload = { type: 'post', key: 'comments' }
      const initialState = makeRelationships('comments', {
        isDeleted: true
      })
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: { }
        }
      }
      const action = reset(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('set author', () => {
      const payload = { type: 'post', key: 'author', data: { type: 'person', id: 'test-person-id-2' } }
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        author: { ...initialState.author, meta: { changedData: payload.data } }
      }
      const action = set(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('deleteOne author', () => {
      const payload = { type: 'post', key: 'author' }
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        author: { ...initialState.author, meta: { isDeleted: true } }
      }
      const action = deleteOne(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('deleteOne author with changedData', () => {
      const payload = { type: 'post', key: 'author' }
      const initialState = makeRelationships('author', {
        changedData: { type: 'person', id: 'test-person-id-2' }
      })
      const expectedState = {
        ...initialState,
        author: { ...initialState.author, meta: { isDeleted: true } }
      }
      const action = deleteOne(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('deleteRelationship', () => {
      const payload = { type: 'post', key: 'comments' }
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: { isDeleted: true }
        }
      }
      const action = deleteRelationship(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('deleteRelationship with changedData', () => {
      const payload = { type: 'post', key: 'comments' }
      const initialState = makeRelationships('comments', {
        changedData: [
          { type: 'comment', id: 'test-comment-id-1' },
          { type: 'comment', id: 'test-comment-id-2' },
          { type: 'comment', id: 'test-comment-id-3' }
        ]
      })
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: { isDeleted: true }
        }
      }
      const action = deleteRelationship(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('concat array of items', () => {
      const payload = {
        type: 'post',
        key: 'comments',
        data: [{ type: 'comment', id: 'test-comment-id-3' }]
      }
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: {
            changedData: [
              ...initialState.comments.data,
              ...payload.data
            ]
          }
        }
      }
      const action = concat(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('concat one item', () => {
      const payload = {
        type: 'post',
        key: 'comments',
        data: { type: 'comment', id: 'test-comment-id-3' }
      }
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: {
            changedData: [
              ...initialState.comments.data,
              payload.data
            ]
          }
        }
      }
      const action = concat(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('filter', () => {
      const filterFunc = ({ id }) => id.includes('2')
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: {
            changedData: initialState.comments.data.filter(filterFunc)
          }
        }
      }
      const payload = { type: 'post', key: 'comments', func: filterFunc }
      const action = filter(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('map', () => {
      const mapFunc = (state, action) => ({ ...state, meta: { ...state.meta, isMapped: true } })
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: {
            changedData: initialState.comments.data.map(mapFunc)
          }
        }
      }
      const payload = { type: 'post', key: 'comments', func: mapFunc }
      const action = map(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('push one comment', () => {
      const comment = { type: 'comment', id: 'test-comment-id-3' }
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: {
            changedData: [...initialState.comments.data, comment]
          }
        }
      }
      const payload = { type: 'post', key: 'comments', data: comment }
      const action = push(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('reverse', () => {
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: {
            changedData: [...initialState.comments.data].reverse()
          }
        }
      }
      const payload = { type: 'post', key: 'comments' }
      const action = reverse(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('slice', () => {
      const begin = 0
      const end = 1
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: {
            changedData: [...initialState.comments.data].slice(begin, end)
          }
        }
      }
      const payload = { type: 'post', key: 'comments', options: { begin, end } }
      const action = slice(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('sort', () => {
      const sortFunc = (a, b) => {
        if (a.id > b.id) {
          return -1
        }
        if (a.id < b.id) {
          return 1
        }
        return 0
      }
      const initialState = makeRelationships()
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: {
            changedData: [...initialState.comments.data].sort(sortFunc)
          }
        }
      }
      const payload = { type: 'post', key: 'comments', func: sortFunc }
      const action = sort(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('splice', () => {
      const comment = { type: 'comment', id: 'test-comment-id-3' }
      const start = 1
      const deleteCount = 0
      const initialState = makeRelationships()
      const changedData = [...initialState.comments.data]
      changedData.splice(start, deleteCount, comment)
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: { changedData }
        }
      }
      const payload = { type: 'post', key: 'comments', options: { start, deleteCount }, data: comment }
      const action = splice(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('unshift', () => {
      const comment = { type: 'comment', id: 'test-comment-id-3' }
      const initialState = makeRelationships()
      const changedData = [...initialState.comments.data]
      changedData.unshift(comment)
      const expectedState = {
        ...initialState,
        comments: {
          ...initialState.comments,
          meta: { changedData }
        }
      }
      const payload = { type: 'post', key: 'comments', data: comment }
      const action = unshift(payload)
      const state = relationshipsReducer(options)(initialState, action)
      expect(state).toEqual(expectedState)
    })
  })
})
