import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
import toast from "react-hot-toast";

const initialState = {
    taskStatus:'success'

}
export const addaitask = createAsyncThunk('post/addaitask', async ({task,projectId},{ rejectWithValue }) => {
    console.log(task)
 try {
       const res = await api.post('/task/addaitask', {task,projectId})
    return res.data

 } catch (error) {
       return rejectWithValue(error);
 }
})
const TaskSlice = createSlice({

    name: 'task',
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder.addCase(addaitask.pending, (state) => {
            state.taskStatus = 'pending'
        })
            .addCase(addaitask.fulfilled, (state, action) => {
                state.taskStatus = 'fulfilled'
                toast.success(action.payload.message)
                
            })
            .addCase(addaitask.rejected, (state,action) => {
                state.taskStatus = 'rejected'
               toast.error(action.payload.message)
            })
    }



})
export const { } = TaskSlice.actions

export default TaskSlice.reducer