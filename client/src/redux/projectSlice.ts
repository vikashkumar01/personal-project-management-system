
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ProjectTaskProps {
    id: number;
    title: string;
    summary: string;
    status: string ;
    dueDate: string ;
    created_At: string;
    updated_At: string;
  }
  
 export  interface ProjectProps {
    id: number;
    projectName: string;
    description: string;
    startDate: string ;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    projectTaskList: ProjectTaskProps[];
  }

 export interface projectProps{
    cmessage?: string;
    dmessage?: string;
    umessage?: string;
  }

  export interface errorMessagePropsType{
    projectName?: string;
    description?: string;
    startDate?: string;
    endDate?:string;
    message?: string;
  }




const initialState = {
    isSuccess: false as boolean,
    isLoading: false as boolean,
    dmessage:{} as projectProps|null,
    cmessage:{} as projectProps|null,
    umessage:{} as projectProps|null,
    project:{} as ProjectProps|null,
    errorMessage: {} as errorMessagePropsType|null
}


const projectSlice = createSlice({
    name: "project",
    initialState,

    reducers: {

        createProjectRequest: (state) => {
            state.isLoading = true;
        },

        createProjectSuccess: (state,action:PayloadAction<projectProps>) => {
             state.isLoading=false;
             state.isSuccess = true;
             state.cmessage = action.payload;
        },

        createProjectFails:(state,action:PayloadAction<errorMessagePropsType>)=>{
            state.isLoading = false;
            state.isSuccess=false;
            state.errorMessage = action.payload;

        },

        updateProjectRequest: (state) => {
            state.isLoading = true;
        },

        updateProjectSuccess: (state,action:PayloadAction<projectProps>) => {
             state.isLoading=false;
             state.isSuccess = true;
             state.umessage = action.payload;
        },

        updateProjectFails:(state,action:PayloadAction<errorMessagePropsType>)=>{
            state.isLoading = false;
            state.isSuccess=false;
            state.errorMessage = action.payload;

        },

        getProjectByIdRequest: (state) => {
            state.isLoading = true;
        },

        getProjectByIdSuccess: (state,action:PayloadAction<ProjectProps>) => {
             state.isLoading=false;
             state.isSuccess = true;
             state.project = action.payload;
        },

        getProjectByIdFails:(state,action:PayloadAction<errorMessagePropsType>)=>{
            state.isLoading = false;
            state.isSuccess=false;
            state.errorMessage = action.payload;

        },

        projectDeleteRequest: (state) => {
            state.isLoading = true;
        },

        projectDeleteSuccess: (state,action:PayloadAction<projectProps>) => {
             state.isLoading=false;
             state.isSuccess = true;
             state.dmessage = action.payload;
        },

        projectDeleteFails:(state,action:PayloadAction<errorMessagePropsType>)=>{
            state.isLoading = false;
            state.isSuccess=false;
            state.errorMessage = action.payload;

        },

        clearErrorState:(state)=>{
            state.errorMessage = null;
            state.cmessage = null;
            state.dmessage = null;
        }
    }
})

export const {
    createProjectRequest,
    createProjectSuccess,
    createProjectFails,
    updateProjectRequest,
    updateProjectSuccess,
    updateProjectFails,
    getProjectByIdRequest,
    getProjectByIdSuccess,
    getProjectByIdFails,
    projectDeleteFails,
    projectDeleteRequest,
    projectDeleteSuccess,
    clearErrorState} = projectSlice.actions


export default projectSlice.reducer    