import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios'

// Urls
import { API } from "../../../lib/urls";
import moment from "moment";

const initialState = {
    ready: false,
    loading: true,
    token: '',
    user: null,
    error: false,
    refresh: null
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
        const sinceLastSession = moment(Date.now()).diff(moment(thunkAPI.getState().auth.refresh), 'minutes')
        if (sinceLastSession > 1 || arg.hasOwnProperty('forceRefresh')) {
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
        } else {
            return thunkAPI.rejectWithValue({
                user: thunkAPI.getState().auth.user,
                token: thunkAPI.getState().auth.token,
                ready: true,
                error: false
            })
        }






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
            state.refresh = Date.now()

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
            state.refresh = Date.now()

        },
        [refreshMe.rejected]: (state, action) => {
            console.log('Refresh Rejected')
            state.loading = false
            state.error = action.payload.error ? JSON.parse(action.error.message) : ''
            state.user = action.payload.user || null
            state.token = action.payload.token || null
            state.ready = action.payload.ready || false
            state.refresh = Date.now()
        },

    }

})

export const { clearAuth, userEmail } = authSlice.actions

export default authSlice.reducer