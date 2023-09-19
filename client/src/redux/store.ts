import { configureStore } from '@reduxjs/toolkit'
import  registerSlice  from './registerSlice'
import userSlice from './userSlice'
import projectSlice from './projectSlice'
import projectTaskSlice from './projectTaskSlice'

export const store = configureStore({
  reducer: {
    register:registerSlice,
    user:userSlice,
    project:projectSlice,
    projectTask:projectTaskSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch