import { takeEvery } from 'redux-saga/effects'
import { COLLECTION_FETCH_ITEMS, ITEM_FETCH } from '../constants'
import fetchItems from './fetchItems'
import fetchItem from './fetchItem'

// NOTE: you need to define fetchAction as part of setup: setFetchActionFunc(myCustomFetch)
let fetchAction
export const setFetchActionFunc = func => { fetchAction = func }
export const getFetchActionFunc = () => fetchAction

// TODO: move to its own npm module redux-saga-actions
export const createWatcher = (actionType, saga) => {
  return function * () {
    yield takeEvery(actionType, saga)
  }
}

export const watchActions = (sagas) => {
  const watchers = Object.keys(sagas)
    .map(actionType => createWatcher(actionType, sagas[actionType])())
  return function * rootSaga () {
    yield watchers
  }
}

export default watchActions({
  [COLLECTION_FETCH_ITEMS]: fetchItems,
  [ITEM_FETCH]: fetchItem
})
