import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
import toast from "react-hot-toast";

const initialState = {
    taskStatus: 'success',
    tasks:JSON.parse(localStorage.getItem('tasks'))||[],


}
export const addnewtask = createAsyncThunk('post/addnewtask', async ({ task, projectId }, { rejectWithValue }) => {
    console.log(task)
    try {
        const res = await api.post('/task/addnewtask', { task, projectId })
        return res.data

    } catch (error) {
        return rejectWithValue(error);
    }
})
export const addaitask = createAsyncThunk('post/addaitask', async ({ task, projectId }, { rejectWithValue }) => {
    console.log(task)
    try {
        const res = await api.post('/task/addaitask', { task, projectId })
        return res.data

    } catch (error) {
        return rejectWithValue(error);
    }
})
export const getalltask = createAsyncThunk('get/getalltask', async ( projectId , { rejectWithValue }) => {
    try {
        const res = await api.get(`/task/getalltask?projectId=${projectId}`)
        return res.data

    } catch (error) {
        return rejectWithValue(error);
    }
})
export const removetask = createAsyncThunk('get/removetask', async ( taskId , { rejectWithValue }) => {
    try {
        console.log(taskId)
        const res = await api.delete(`/task/removetask/${taskId}`)
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
            .addCase(addaitask.rejected, (state, action) => {
                state.taskStatus = 'rejected'
                toast.error(action.payload.message)
            })
            .addCase(getalltask.pending, (state) => {
                state.taskStatus = 'pending'
            })
            .addCase(getalltask.fulfilled, (state, action) => {
                state.taskStatus = 'fulfilled'
                state.tasks=action.payload.tasks
                console.log(state.tasks)
                localStorage.setItem('tasks',JSON.stringify(state.tasks))
            })
            .addCase(getalltask.rejected, (state, action) => {
                state.taskStatus = 'rejected'
            })
              .addCase(addnewtask.pending, (state) => {
                state.taskStatus = 'pending'
            })
            .addCase(addnewtask.fulfilled, (state, action) => {
                state.taskStatus = 'fulfilled'
                toast.success(action.payload.message)
                state.tasks.push(action.payload.task)
               
            })
            .addCase(addnewtask.rejected, (state, action) => {
                state.taskStatus = 'rejected'
                toast.error(action.payload.message)
            })
             .addCase(removetask.pending, (state) => {
      state.taskStatus = 'pending'
    })
    .addCase(removetask.fulfilled, (state, action) => {
      state.taskStatus = 'fulfilled'

     
      state.tasks = state.tasks.filter(
        task => task._id !== action.payload.taskId
      )

      toast.success(action.payload.message)
    })
    .addCase(removetask.rejected, (state, action) => {
      state.taskStatus = 'rejected'
      toast.error(action.payload?.message)
    })

    }



})
export const { } = TaskSlice.actions

export default TaskSlice.reducer