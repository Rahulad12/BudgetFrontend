import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authResponseType } from "../types"


interface userState {
    username: string,
    email: string
}

interface authState {
    auth: authResponseType
    user: {
        username: string
        email: string
    }
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
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<authResponseType>) => {
            state.auth = action.payload

        },
        user: (state, action: PayloadAction<userState>) => {
            state.user = action.payload
        },
        Logout: (sate) => {
            sate.auth = {
                success: false,
                message: '',
                token: '',
            }
        }
    }
})
export const { login, user, Logout } = authSlice.actions
export default authSlice.reducer


