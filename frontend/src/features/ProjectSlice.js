import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../api/axios';
const initialState = {
    projects: JSON.parse(localStorage.getItem('projects')) || null,
    count: null,
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
export const getallprojects = createAsyncThunk('get/getallprojects', async (orgId, { rejectWithValue }) => {
    try {
        const res = await api.get('/project/getallprojects?orgId=' + orgId)
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
                toast.error(action.payload.message)
            })

    }
})
// export const {} ProjectSlice.actions
export default ProjectSlice.reducer
