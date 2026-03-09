import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks:[],
    status: 'success'

}
export const createAitask = createAsyncThunk('post/createAitask',async({projectId,prompt})=>{
       console.log("Thunk called", projectId, prompt)
    const res = await api.post('/ai/createAitask',projectId,prompt) 
    return res.data

})
const AiSlice = createSlice({

    name: 'ai',
    initialState,
    reducers: {
      

    },
    extraReducers(builder){
        builder.addCase(createAitask.pending, (state) => {
            state.status = 'pending'
        })
        .addCase(createAitask.fulfilled, (state,action) => {
            state.status = 'fulfilled'
            state.tasks=action.payload.tasks
        })
        .addCase(createAitask.rejected, (state) => {
            state.status = 'rejected'
        })
    }



})
export const {  } = AiSlice.actions

export default AiSlice.reducer