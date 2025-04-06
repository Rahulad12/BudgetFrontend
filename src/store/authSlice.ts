import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authResponseType } from "../types"

interface authState {
    auth: authResponseType
    loading: boolean
}

const storedToken: any = localStorage.getItem("token")

const initialState: authState = {
    auth: {
        success: false,
        message: '',
        token: storedToken,
    },
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<authState>) => {
            state.auth = action.payload.auth
            state.loading = action.payload.loading
        },
        LogOut: (state) => {
            state.auth = {
                success: false,
                message: '',
                token: ''
            }
            state.loading = false
            localStorage.removeItem("token")
        }
    }
})
export const { login, LogOut } = authSlice.actions
export default authSlice.reducer


