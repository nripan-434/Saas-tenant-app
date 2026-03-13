import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
import toast from "react-hot-toast";

const initialState = {
    aitasks: JSON.parse(localStorage.getItem('aitasks'))||{},
    aistatus: 'success'

}
export const createAitask = createAsyncThunk('post/createAitask', async ({ projectId, prompt },{ rejectWithValue }) => {
    console.log("Thunk called", projectId, prompt)
 try {
       const res = await api.post('/ai/createAitask', { projectId, prompt })
    return res.data

 } catch (error) {
       return rejectWithValue(error);
 }
})
const AiSlice = createSlice({

    name: 'ai',
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder.addCase(createAitask.pending, (state) => {
            state.aistatus = 'pending'
        })
            .addCase(createAitask.fulfilled, (state, action) => {
                state.aistatus = 'fulfilled'

                const { projectId, tasks } = action.payload
                state.aitasks[projectId] = tasks
                localStorage.setItem('aitasks',JSON.stringify(state.aitasks))

            })
            .addCase(createAitask.rejected, (state,action) => {
                state.aistatus = 'rejected'
               toast.error(action.payload.message)
            })
    }



})
export const { } = AiSlice.actions

export default AiSlice.reducer