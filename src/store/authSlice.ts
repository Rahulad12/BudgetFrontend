import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authResponseType } from "../types"

interface authState {
    auth: authResponseType
    user: {
        username: string
        email: string
    }
    loading: boolean
}
interface userState {
    username: string,
    email: string
}
const storedToken: any = localStorage.getItem("token")

const initialState: authState = {
    auth: {
        success: false,
        message: '',
        token: storedToken,
    },
    user: {
        username: '',
        email: ''
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
        user: (state, action: PayloadAction<userState>) => {
            state.user = action.payload
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
export const { login, user, LogOut } = authSlice.actions
export default authSlice.reducer


