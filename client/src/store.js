import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import usersReducer from './features/users/usersSlice'
import monstersReducer from './features/monsters/monstersSlice'
import ordersReducer from './features/orders/ordersSlice'
import cartReducer from './features/cart/cartSlice'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer)

export default configureStore({
  reducer:  {
    cart: persistedCartReducer,
    users: usersReducer,
    orders: ordersReducer,
    monsters: monstersReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})
