import { createSlice } from '@reduxjs/toolkit'

const codeSlice = createSlice({
    name:'codeSlice',
  initialState: {
    code: '',
    language: 'javascript'
  },
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    }
  }
})

export const {setCode,setLanguage} = codeSlice.actions
export default codeSlice