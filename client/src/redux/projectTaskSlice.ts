
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ProjectTaskProps {
    id: number;
    title: string;
    summary: string;
    status: string | null;
    dueDate: string | null;
    created_At: string;
    updated_At: string;
  }

  export interface projectTaskProps{
    cmessage?: string;
    dmessage?: string;
    umessage?: string;
  }

  export interface errorMessagePropsType{
    title?: string;
    summary?: string;
    dueDate?: string;
    message?: string;
  }

  const initialState = {
    isSuccess: false as boolean,
    isLoading: false as boolean,
    dmessage:{} as projectTaskProps|null,
    cmessage:{} as projectTaskProps|null,
    umessage:{} as projectTaskProps|null,
    projectTask:{} as ProjectTaskProps|null,
    errorMessage: {} as errorMessagePropsType|null
}


  const projectTaskSlice = createSlice({
     name:"projectTask",
     initialState,

     reducers:{
        createProjectTaskRequest:(state)=>{
            state.isLoading = true;
        },
        createProjectTaskSuccess:(state,action:PayloadAction<projectTaskProps>)=>{
            state.isLoading = false;
            state.isSuccess= true;
            state.cmessage = action.payload
        },
        createProjectTaskFails:(state,action:PayloadAction<errorMessagePropsType>)=>{
            state.isLoading = false;
            state.isSuccess= true;
            state.errorMessage = action.payload
        },

        updateProjectTaskRequest:(state)=>{
            state.isLoading = true;
        },
        updateProjectTaskSuccess:(state,action:PayloadAction<projectTaskProps>)=>{
            state.isLoading = false;
            state.isSuccess= true;
            state.umessage = action.payload
        },
        updateProjectTaskFails:(state,action:PayloadAction<errorMessagePropsType>)=>{
            state.isLoading = false;
            state.isSuccess= false;
            state.errorMessage = action.payload
        },

        deleteProjectTaskByIdRequest:(state)=>{
            state.isLoading = true;
        },
        deleteProjectTaskByIdSuccess:(state,action:PayloadAction<projectTaskProps>)=>{
            state.isLoading = false;
            state.isSuccess= true;
            state.dmessage = action.payload
        },
        deleteProjectTaskByIdFails:(state,action:PayloadAction<errorMessagePropsType>)=>{
            state.isLoading = false;
            state.isSuccess= false;
            state.errorMessage = action.payload
        },

        clearErrorState:(state)=>{
            state.errorMessage = null;
            state.cmessage = null;
            state.umessage = null;
            state.dmessage = null;
        }



     }
  })


  export const { 
    createProjectTaskRequest,
    createProjectTaskSuccess,
    createProjectTaskFails,
    updateProjectTaskRequest,
    updateProjectTaskSuccess,
    updateProjectTaskFails,
    deleteProjectTaskByIdRequest,
    deleteProjectTaskByIdSuccess,
    deleteProjectTaskByIdFails,
    clearErrorState
   } = projectTaskSlice.actions

  export default projectTaskSlice.reducer