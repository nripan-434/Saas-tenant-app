import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../api/axios';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    token: JSON.parse(sessionStorage.getItem('token')) || null,
    status: 'success'

}
export const registeruser = createAsyncThunk('post/registeruser', async (form, { rejectWithValue }) => {
    try {
        const res = await api.post('/auth/register', form)
        return res.data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);

        return rejectWithValue(error)

    }
})
export const login = createAsyncThunk('post/login',async(form,{rejectWithValue})=>{
        try {
            const res = await api.post('/auth/login',form)
        return res.data
        } catch (error) {

        console.error("API Error:", error.response?.data || error.message);

            return rejectWithValue(error)
        }
})
export const inviteMember = createAsyncThunk('post/invitmember',async(form,{rejectWithValue})=>{
   try {
     const res =await  api.post('auth/invite',form)
    return res.data
   } catch (error) {
     console.error("API Error:", error.response?.data || error.message);
        console.error("API Error:", error.response?.data || error.message);

            return rejectWithValue(error)
   }
})

export const acceptinvite = createAsyncThunk('post/acceptinvite',async(form,{rejectWithValue})=>{
    try {
        const res = await api.post('/auth/acceptinvite',form)
    return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null
        state.token = null
        state.status = 'success'

        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
    }

    },
    extraReducers(builder){
        builder.addCase(registeruser.pending, (state) => {
            state.status = 'pending'
        })
       .addCase(registeruser.fulfilled, (state, action) => {
            state.status = 'success'
            toast.success(action.payload.message)


        })
        .addCase(registeruser.rejected, (state, action) => {
            state.status = 'rejected'
            toast.error(action.payload.message)

        })
        .addCase(login.pending,(state)=>{
            state.status='pending'
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.status='success'
            state.user=action.payload.currentuser
            state.token=action.payload.token
            sessionStorage.setItem('user',JSON.stringify(action.payload.currentuser))
            sessionStorage.setItem('token',JSON.stringify(action.payload.token))
            toast.success(action.payload.message)
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.status='rejected'
            toast.error(action.payload.message)
        })
        .addCase(inviteMember.pending, (state) => {
            state.status = 'pending'
        })
       .addCase(inviteMember.fulfilled, (state, action) => {
            state.status = 'success'
            toast.success(action.payload.message)


        })
        .addCase(inviteMember.rejected, (state, action) => {
            state.status = 'rejected'
            toast.error(action.payload.message)

        })
        .addCase(acceptinvite.pending, (state) => {
            state.status = 'pending'
        })
       .addCase(acceptinvite.fulfilled, (state, action) => {
            state.status = 'success'
            toast.success(action.payload.message)


        })
        .addCase(acceptinvite.rejected, (state, action) => {
            state.status = 'rejected'
            toast.error(action.payload.message)

        })

    }

})
export const { logout } = AuthSlice.actions

export default AuthSlice.reducer