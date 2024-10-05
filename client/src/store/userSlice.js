import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name:'users',
  initialState: {
    userId: ''
  },
  reducers:{
    setUser : (state,action)=>{
        state.userId = action.payload
    }
  }
})

export const userActions = userSlice.actions
export default userSlice
