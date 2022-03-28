import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import axios from 'axios'

// Urls
import { API } from "../../../lib/urls";

const initialState = {
    ready: false,
    loading: true,
    token: '',
    user: null,
    error: false
}



export const setupAuth = createAsyncThunk(
    'auth/setupAuth',
    async (arg, thunkAPI) => {
        const { type, payload } = arg

        const res = await axios({
            method: "POST",
            url: `${API.USER[type]}`,
            data: payload
        })

        const { data } = await axios({
            method: "GET",
            url: `${API.USER.me}`,
            headers: {
                Authorization: `Bearer ${res.data.token}`
            }
        })


        const response = {
            user: data.user,
            token: res.data.token
        }
        return response
    }
)

export const refreshMe = createAsyncThunk(
    'auth/refreshMe',
    async (arg, thunkAPI) => {

        const { data } = await axios({
            method: "GET",
            url: `${API.USER.me}`,
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.token}`
            }
        })

        const response = {
            user: data.user,
            token: thunkAPI.getState().auth.token
        }
        return response
    }
)
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuth: (state, action) => {
            console.log('Logout event')
            state.loading = false
            state.error = null
            state.token = null
            state.user = null
            state.ready = false
        },

        userEmail: (state, action) => {
            state.user = {
                email: action.payload.email
            }
        }
    },
    extraReducers: {
        [setupAuth.fulfilled]: (state, action) => {
            console.log('Auth Fufilled')
            state.loading = false
            state.error = null
            state.token = action.payload.token
            state.user = action.payload.user
            state.ready = true

        },
        [setupAuth.rejected]: (state, action) => {
            console.log('Auth Rejected')
            state.loading = false
            state.error = JSON.parse(action.error.message)
            state.user = null
            state.token = null
            state.ready = false
        },
        [refreshMe.fulfilled]: (state, action) => {
            console.log('Refresh Fufilled')
            state.loading = false
            state.error = null
            state.token = action.payload.token
            state.user = action.payload.user
            state.ready = true

        },
        [refreshMe.rejected]: (state, action) => {
            console.log('Refresh Rejected')
            state.loading = false
            state.error = JSON.parse(action.error.message)
            state.user = null
            state.token = null
            state.ready = false
        },

    }

})

export const { clearAuth, userEmail } = authSlice.actions

export default authSlice.reducer