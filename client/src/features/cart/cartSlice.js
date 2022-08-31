import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'

export const fetchCurrentCart = createAsyncThunk('cart/fetchCurrentCart', async (loggedOutCart) => {
        const response = await apiAxios.post('/carts/self',
                        {
                            cart: loggedOutCart
                        })
        const cart = {}
        response.data.forEach(cartMonster =>
            cart[cartMonster.monster.id] = {
                quantity: cartMonster.quantity
            })
        return cart
})

export const addMonsterToCart = createAsyncThunk(
    'cart/addMonsterToCart',
    async (cartMonster, {getState}) => {
        if (getState().users.isLoggedIn) {
        await apiAxios.post('/carts/self/monster',
            cartMonster)
        }
        return cartMonster
    }
)

export const removeMonsterFromCart = createAsyncThunk(
    'cart/removeMonsterFromCart',
    async (monster, {getState}) => {
            if (getState().users.isLoggedIn) {
                await apiAxios.delete('/carts/self/monster',
                    {data: monster})
            }
            return monster
    }
)

export const changeMonsterQuantity = createAsyncThunk(
    'cart/changeMonsterQuantity',
    async (monster, {getState}) => {
        if (getState().users.isLoggedIn) {
            await apiAxios.put('/carts/self/monster',
                monster)
        }
        return monster
    }
)

export const checkoutCart = createAsyncThunk(
    'cart/checkoutCart', async () => {
            const response = await apiAxios.post('/carts/self/checkout')
            return response.data
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartMonsters: {},
        fetchCurrentCartStatus: 'idle',
        addMonsterToCartStatus: 'idle',
        removeMonsterFromCartStatus: 'idle',
        changeMonsterQuantityStatus: 'idle',
        checkoutCartStatus: 'idle',
        needsCheckoutRedirect: false,
        monsterAddedMsg: 'Slice: Monster Added',
        showMonsterAddedMsg: false

    },
    reducers: {
        cartMonstersUpdated(state, action) {
            state.cartMonsters = action.payload
        },
        //Used to determine if a user is logging in as part of the checkout-flow
        needsCheckoutRedirectUpdated(state, action) {
            state.needsCheckoutRedirect = action.payload
        },
        //Used for msg showed on alert banner for adding monsters 
        monsterAddedMsgUpdated(state, action) {
            state.monsterAddedMsg = action.payload
        },
        //Used to show alert banner when adding monster to cart
        showMonsterAddedMsgUpdated(state, action) {
            state.showMonsterAddedMsg = action.payload
        },
    },    
    extraReducers: {
        //Reducers for fetching cart
        [fetchCurrentCart.pending]: (state, action) => {
            state.fetchCurrentCartStatus = 'loading'
        },
        [fetchCurrentCart.fulfilled]: (state, action) => {
            state.fetchCurrentCartStatus = 'succeeded'
            state.cartMonsters = action.payload
        },
        [fetchCurrentCart.rejected]: (state, action) => {
            state.fetchCurrentCartStatus = 'failed'
        },
        //Reducer for adding monster to cart
        [addMonsterToCart.pending]: (state, action) => {
            state.addMonsterToCartStatus = 'loading'
        },
        [addMonsterToCart.fulfilled]: (state, action) => {
            state.addMonsterToCartStatus = 'succeeded'
            state.cartMonsters[action.payload.monster_id] = action.payload
        },
        [addMonsterToCart.rejected]: (state, action) => {
            state.addMonsterToCartStatus = 'failed'
        },
        //Reducer for removing monster from cart
        [removeMonsterFromCart.pending]: (state, action) => {
            state.removeMonsterFromCartStatus = 'loading'
        },
        [removeMonsterFromCart.fulfilled]: (state, action) => {
            state.removeMonsterFromCartStatus = 'succeeded'
            delete state.cartMonsters[action.payload.monster_id]
        },
        [removeMonsterFromCart.rejected]: (state, action) => {
            state.removeMonsterFromCartStatus = 'failed'
        },
        //Reducer for changing qty of a monster in cart
        [changeMonsterQuantity.pending]: (state, action) => {
            state.changeMonsterQuantityStatus = 'loading'
        },        
        [changeMonsterQuantity.fulfilled]: (state, action) => {
            state.changeMonsterQuantityStatus = 'succeeded'
            state.cartMonsters[action.payload.monster_id].quantity = action.payload.quantity
        },
        [changeMonsterQuantity.rejected]: (state, action) => {
            state.changeMonsterQuantityStatus = 'failed'
        },    
        //Reducers for tracking status of order placement
        [checkoutCart.pending]: (state, action) => {
            state.checkoutCartStatus = 'loading'
        },
        [checkoutCart.fulfilled]: (state, action) => {
            state.checkoutCartStatus = 'succeeded'
        },
        [checkoutCart.rejected]: (state, action) => {
            state.checkoutCartStatus = 'failed'
        },
    }
})

export const    { cartMonstersUpdated, needsCheckoutRedirectUpdated, monsterAddedMsgUpdated, showMonsterAddedMsgUpdated } = cartSlice.actions
export const selectCart = state => state.cart.cartMonsters
export const selectNeedsCheckoutRedirect = state => state.cart.needsCheckoutRedirect
export const selectFetchCurrentCartStatus = state => state.cart.fetchCurrentCartStatus
export const selectMonsterAddedMsg = state => state.cart.monsterAddedMsg
export const selectShowMonsterAddedMsg = state => state.cart.showMonsterAddedMsg
export default cartSlice.reducer