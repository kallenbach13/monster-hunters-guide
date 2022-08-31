import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiAxios from '../../config/axiosConfig'

export const fetchAllMonsters = createAsyncThunk('monsters/fetchAllMonsters', async () => {
        const response = await apiAxios.get('/monsters')
        const monsters = {}
        response.data.forEach(monster =>
            monsters[monster.id] = monster)
        return monsters
})

export const monstersSlice = createSlice({
    name: 'monsters',
    initialState: {
        fetchAllMonstersStatus: 'idle',
        allMonsters: {}
    },
    extraReducers: {
        //Reducers for fetching monsters
        [fetchAllMonsters.pending]: (state, action) => {
            state.fetchAllMonstersStatus = 'loading'
          },
          [fetchAllMonsters.fulfilled]: (state, action) => {
            state.fetchAllMonstersStatus = 'succeeded'
            state.allMonsters = action.payload
          },
          [fetchAllMonsters.rejected]: (state, action) => {
            state.fetchAllMonstersStatus = 'failed'
          },
    }
})

export const selectAllMonsters = state => state.monsters.allMonsters
export const selectMonsterById = (state, monsterId) => state.monsters.allMonsters[monsterId]
export const selectFetchAllMonstersStatus = state => state.monsters.fetchAllMonstersStatus

export default monstersSlice.reducer