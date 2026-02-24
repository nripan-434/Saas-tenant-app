import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../api/axios';
const initialState = {
    projects: JSON.parse(localStorage.getItem('projects')) || null,
    count: null,
    existmembers:{},
    projectmemstatus:{},


    memberprjs:[]
}
export const createproject = createAsyncThunk('post/createproject', async (form, { rejectWithValue }) => {
    try {
        const res = await api.post('/project/createproject', form)
        return res.data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);

        return rejectWithValue(error)

    }
})
export const getallprojectmembers = createAsyncThunk(
  'get/getallprojectmembers',
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/project/getallprojectmembers/${projectId}`);
      return { projectId, members: res.data.members };
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Something went wrong"
      });
    }
  }
);
export const getallprojects = createAsyncThunk('get/getallprojects', async (orgId, { rejectWithValue }) => {
    try {
        const res = await api.get('/project/getallprojects' )
        return res.data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return rejectWithValue(error)

    }
})
export const getmemberprjs = createAsyncThunk('get/getmemberprjs', async ({orgId,userId}, { rejectWithValue }) => {
    try {
        const res = await api.get(`/project/getmemberprjs/${orgId}/${userId}` )
        return res.data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return rejectWithValue(error)

    }
})
export const deallocatemember = createAsyncThunk('patch/deallocatemember', async ({userId,projectId}, { rejectWithValue }) => {
    try {
        const res = await api.patch(`/project/deallocatemember/${userId}/${projectId}` )
        return res.data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return rejectWithValue(error)

    }
})
export const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(createproject.pending, (state) => {
            state.status = 'pending'
        })
            .addCase(createproject.fulfilled, (state, action) => {
                state.status = 'success'
                toast.success(action.payload.message)


            })
            .addCase(createproject.rejected, (state, action) => {
                state.status = 'rejected'
                toast.error(action.payload.message)

            })
            .addCase(getallprojects.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getallprojects.fulfilled, (state, action) => {
                state.status = 'success'
                state.projects = action.payload.prj
                state.count = action.payload.count
                localStorage.setItem('projects', JSON.stringify(action.payload.prj))

            })
            .addCase(getallprojects.rejected, (state, action) => {
                state.status = 'rejected'
                state.projects = action.payload.prj
                state.count = action.payload.count
                toast.error(action.payload.message)
            })
             .addCase(getmemberprjs.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getmemberprjs.fulfilled, (state, action) => {
                state.status = 'success'
                state.memberprjs = action.payload.prjs
                // console.log('ad')

            })
            .addCase(getmemberprjs.rejected, (state, action) => {
                state.status = 'rejected'
                toast.error(action.payload.message)
            })
            .addCase(getallprojectmembers.pending, (state, action) => {
//   console.log("Pending action arg:", action.meta.arg);
  const projectId = action.meta.arg;
  state.projectmemstatus[projectId] = 'pending';
})

    .addCase(getallprojectmembers.fulfilled, (state, action) => {
       const { projectId, members } = action.payload;
console.log("PAYLOAD:", action.payload)
    state.existmembers[projectId] = members;
    console.log(members)
    state.projectmemstatus[projectId] = "success";
    })
    .addCase(getallprojectmembers.rejected, (state, action) => {
        // console.log('asd')
        const projectId = action.meta.arg;
        state.projectmemstatus[projectId] = 'rejected'
    })
            .addCase(deallocatemember.pending, (state) => {
                state.status = 'pending'
            })
              .addCase(deallocatemember.fulfilled, (state, action) => {
                const { userId, projectId } = action.meta.arg;
                if (state.existmembers[projectId]) {
                    state.existmembers[projectId] = state.existmembers[projectId].filter(
                        member => member._id !== userId
                    );
                }
                toast.success('memeber removed')
            })
            .addCase(deallocatemember.rejected, (state, action) => {
                state.status = 'rejected'
                toast.error(action.payload.message)
            })

    }
})
// export const {} ProjectSlice.actions deallocatemember
export default ProjectSlice.reducer
