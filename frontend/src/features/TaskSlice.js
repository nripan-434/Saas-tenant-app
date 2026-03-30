import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
import toast from "react-hot-toast";
import { getallprojects } from "./ProjectSlice";

const initialState = {
    taskStatus: 'success',
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    membertasks:JSON.parse(localStorage.getItem('membertasks')) || [],


}
export const addnewtask = createAsyncThunk('post/addnewtask', async ({ task, projectId }, { rejectWithValue,dispatch }) => {
    console.log(task)
    try {
        const res = await api.post('/task/addnewtask', { task, projectId })
        dispatch(getallprojects())
        return res.data

    } catch (error) {
        return rejectWithValue(error);
    }
})
export const addaitask = createAsyncThunk('post/addaitask', async ({ task, projectId }, { rejectWithValue,dispatch }) => {
    console.log(task)
    try {
        const res = await api.post('/task/addaitask', { task, projectId })
         dispatch(getallprojects())
        return res.data

    } catch (error) {
        return rejectWithValue(error);
    }
})
export const getalltask = createAsyncThunk('get/getalltask', async (projectId, { rejectWithValue }) => {
    try {
        const res = await api.get(`/task/getalltask?projectId=${projectId}`)
        return res.data

    } catch (error) {
        return rejectWithValue(error);
    }
})
export const removetask = createAsyncThunk('delete/removetask', async (taskId, { rejectWithValue,dispatch }) => {
    try {
        console.log(taskId)
        const res = await api.delete(`/task/removetask/${taskId}`)
        dispatch(getallprojects())
        return res.data
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const updatetask = createAsyncThunk('post/updatetask', async ({ task, taskId }, { rejectWithValue,dispatch }) => {
    console.log(task)
    console.log(taskId)
    try {
        const res = await api.put(`/task/updatetask/${taskId}`, { task })
        dispatch(getallprojects())
        return res.data

    } catch (error) {
        return rejectWithValue(error);
    }
})
export const taskassign = createAsyncThunk('patch/taskassign', async ({ taskId, memberId }, { rejectWithValue }) => {
    
    try {
        console.log(taskId)
        console.log(memberId)
        const res = await api.patch(`/task/taskassign/${taskId}`, { memberId });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
}
);
export const removetaskmember = createAsyncThunk('patch/removetaskmember', async ({ taskId }, { rejectWithValue }) => {
    
    try {
        console.log(taskId)
        const res = await api.patch(`/task/taskassign/${taskId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
}
);
export const getmembertasks = createAsyncThunk('get/getmembertasks', async ({projectId,userId}, { rejectWithValue }) => {
    try {
        console.log(projectId)
        console.log(userId)
        const res = await api.get(`/task/getmembertasks?projectId=${projectId}&userId=${userId}`)
        return res.data

    } catch (error) {
        return rejectWithValue(error);
    }
})

export const statusupdate = createAsyncThunk('patch/statusupdate', async ({ taskId,form }, { rejectWithValue,dispatch }) => {
    
    try {
        console.log(form)
        const res = await api.patch(`/task/statusupdate/${taskId}`,{form});
        dispatch(getallprojects())
        return res.data;
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
                state.tasks.push(action.payload.restask)
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
                state.tasks = action.payload.tasks
                console.log(state.tasks)
                localStorage.setItem('tasks', JSON.stringify(state.tasks))
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
            .addCase(updatetask.fulfilled, (state, action) => {
                state.taskStatus = 'fulfilled'
                state.tasks = state.tasks.map(t =>
                    t._id === action.payload.task._id ? action.payload.task : t
                );
                toast.success(action.payload.message)
            })
            .addCase(updatetask.rejected, (state, action) => {
                state.taskStatus = 'rejected'
                toast.error(action.payload?.message )
            })
            .addCase(taskassign.pending, (state) => {
                state.taskStatus = 'pending'
            })
            .addCase(taskassign.fulfilled, (state, action) => {
                state.taskStatus = 'fulfilled'
                console.log(action.payload.task)

                state.tasks = state.tasks.map(t =>
                    t._id === action.payload.task._id ? action.payload.task : t
                )
                toast.success(action.payload.message)
            })
            .addCase(taskassign.rejected, (state, action) => {
                state.taskStatus = 'rejected'
                toast.error(action.payload?.message)
            })
            .addCase(getmembertasks.pending, (state) => {
                state.taskStatus = 'pending'
            })
            .addCase(getmembertasks.fulfilled, (state, action) => {
                state.taskStatus = 'fulfilled'
                console.log(action.payload.tasks)
                state.membertasks = action.payload.tasks
            })
            .addCase(getmembertasks.rejected, (state) => {
                state.taskStatus = 'rejected'
            })
            .addCase(statusupdate.pending, (state) => {
                state.taskStatus = 'pending'
            })
            .addCase(statusupdate.fulfilled, (state, action) => {
                state.taskStatus = 'fulfilled'
                state.membertasks = state.membertasks.map(t =>
                    t._id === action.payload.task._id ?action.payload.task : t
                );
                toast.success(action.payload.message)
            })
            .addCase(statusupdate.rejected, (state, action) => {
                state.taskStatus = 'rejected'
                console.log(action.payload)
                toast.error(action.payload?.message )
            })


    }



})
export const { } = TaskSlice.actions

export default TaskSlice.reducer