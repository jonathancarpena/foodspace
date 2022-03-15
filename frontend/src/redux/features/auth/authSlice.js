import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



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
        let response;
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
    },
    extraReducers: {
        [setupAuth.fulfilled]: (state, action) => {
            console.log('Auth Fufilled')
            state.loading = false
            state.error = null
            state.token = action.payload.jwt
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
    }
    // extraReducers: {
    //     [setupAuth.fulfilled]: (state, action) => {
    //         console.log('Auth Sucessful')
    //         state.loading = false
    //         state.ready = true
    //         state.token = action.payload.jwt
    //         state.user = action.payload.user
    //         state.error = null
    //     },
    //     [setupAuth.rejected]: (state, action) => {
    //         console.log('Rejected')
    //         state.loading = false
    //         state.ready = false
    //         state.error = action.error.message
    //         state.user = null
    //         state.token = null
    //     },
    //     [updateAvatar.fulfilled]: (state, action) => {
    //         state.user.avatar = action.payload
    //     }
    // }

})

export const { clearAuth } = authSlice.actions

export default authSlice.reducer