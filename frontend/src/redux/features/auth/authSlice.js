import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

        try {
            const res = await fetch(`${API.USER[type]}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (!res.ok) {
                const data = await res.json()
                let err = new Error()
                err.status = res.status
                err.message = data.message
                throw err

            }
            const data = await res.json()
            return {
                user: data.user,
                token: data.token
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.message,
                status: error.status
            })
        }

    }
)

export const refreshMe = createAsyncThunk(
    'auth/refreshMe',
    async (arg, thunkAPI) => {
        let response;
        try {
            const { data } = await axios({
                method: "GET",
                url: `${API.USER.me}`,
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().auth.token}`
                }
            })
            response = {
                user: data.user,
                token: thunkAPI.getState().auth.token
            }

        } catch (error) {
            response = error.message
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
            state.loading = false
            state.ready = false
            state.error = null
            state.token = null
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
            state.error = action.payload.message
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
            console.log(action.error)
            state.error = JSON.parse(action.error.message)
            state.user = null
            state.token = null
            state.ready = false
        },

    }

})

export const { clearAuth, userEmail } = authSlice.actions

export default authSlice.reducer