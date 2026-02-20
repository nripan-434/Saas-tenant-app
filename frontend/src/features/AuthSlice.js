import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../api/axios';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    token: JSON.parse(sessionStorage.getItem('token')) || null,
    members:[],
    existmembers:{},
    memberstatus:'idle',
    assignstatus:'idle',
    projectmemstatus:{},

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

            return rejectWithValue(error)
   }
})

export const getAllMembers = createAsyncThunk(
  'members/getAll',
  async (orgId, { rejectWithValue }) => {
    try {
      const res = await api.get(`auth/getallmembers/${orgId}`);
      return res.data;
    } catch (error) {
     console.error("API Error:", error.response?.data || error.message);

            return rejectWithValue(error)
    }
  }
);
export const acceptinvite = createAsyncThunk('post/acceptinvite',async(form,{rejectWithValue})=>{
    try {
        const res = await api.post('/auth/acceptinvite',form)
    return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const projectmember = createAsyncThunk('patch/projectmember',async({userId,projectId,isConfirm},{rejectWithValue})=>{
   try {
     const res =await api.patch(`/auth/projectmember/${userId}/${projectId}`,{confirm:isConfirm})
    return res.data
   } catch (error) {
         return rejectWithValue(error);} 
   
})

export const getallprojectmembers = createAsyncThunk(
  'get/getallprojectmembers',
  async (projectId, { rejectWithValue }) => {
    console.log("Thunk started with projectId:", projectId);  // always runs if dispatched
    try {
      const res = await api.get(`/auth/getallprojectmembers/${projectId}`);
      console.log("API response:", res.data);
      return { projectId, members: res.data.m };
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Something went wrong"
      });
    }
  }
);

export const removemember = createAsyncThunk('get/removemember',async({orgId,userId},{rejectWithValue})=>{
    try {
     const res =await api.delete(`/auth/removemember/${userId}/${orgId}`)
    return res.data
   } catch (error) {
         return rejectWithValue(error);} 
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
        .addCase(getAllMembers.pending, (state) => {
        state.memberstatus = 'pending'
    })
    .addCase(getAllMembers.fulfilled, (state, action) => {
        state.memberstatus = 'success'
        state.members=action.payload.members
        action.payload.message?toast.success(action.payload.message):''
    })
    .addCase(getAllMembers.rejected, (state, action) => {
        state.memberstatus = 'rejected'
        toast.error(action.payload.message)
    })
    .addCase(projectmember.pending, (state) => {
        state.assignstatus = 'pending'
    })
    .addCase(projectmember.fulfilled, (state, action) => {
        state.assignstatus = 'success'
        toast.success(action.payload.message)
    })
    .addCase(projectmember.rejected, (state, action) => {
        state.assignstatus = 'rejected'
        toast.error(action.payload.message)
    })
    .addCase(getallprojectmembers.pending, (state, action) => {
  console.log("Pending action arg:", action.meta.arg);
  const projectId = action.meta.arg;
  state.projectmemstatus[projectId] = 'pending';
})

    .addCase(getallprojectmembers.fulfilled, (state, action) => {
       const { projectId, members } = action.payload;

    state.existmembers[projectId] = members;
    console.log(members)
    state.projectmemstatus[projectId] = "success";
    })
    .addCase(getallprojectmembers.rejected, (state, action) => {
        console.log('asd')
        const projectId = action.meta.arg;
        state.projectmemstatus[projectId] = 'rejected'
    })
    .addCase(removemember.pending, (state) => {
        state.status = 'pending'
    })
    .addCase(removemember.fulfilled, (state, action) => {
        state.status = 'success'
        state.members.filter(x=>{
            x._id !== action.meta.arg.userId
        })
         toast.success(action.payload.message)
    })
    .addCase(removemember.rejected, (state, action) => {
        state.status = 'rejected'
    })


    }

})
export const { logout } = AuthSlice.actions

export default AuthSlice.reducer