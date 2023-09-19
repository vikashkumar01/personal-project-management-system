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

export interface ProjectProps {
    id: number;
    projectName: string;
    description: string;
    startDate: string | null;
    endDate: string | null;
    createdAt: string;
    updatedAt: string | null;
    projectTaskList: ProjectTaskProps[];
}

export interface userPropsType {
    id: number,
    name: string,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date,
    projectList: ProjectProps[]
}

export interface tokenPropsType {
    token?: string
}

export interface errorMessagePropsType {
    message?: string,
}



const initialState = {
    token: {} as tokenPropsType | null,
    user: {} as userPropsType | null,
    isLoading: false as boolean,
    isAuthenticated: false as boolean,
    errorMessage: {} as errorMessagePropsType | null
}


const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {

        loginRequest: (state) => {
            state.isLoading = true;
        },

        loginSuccess: (state, action: PayloadAction<tokenPropsType>) => {

            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = action.payload;

        },

        loginFails: (state, action: PayloadAction<errorMessagePropsType>) => {
            state.isLoading = false;
            state.errorMessage = action.payload
        },

        loginCleartState: (state) => {
            state.errorMessage = null;
        },

        logoutState: (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
        },

        userRequest: (state) => {
            state.isLoading = true;
        },

        userSuccess: (state, action: PayloadAction<userPropsType>) => {
            state.isLoading = false;
            state.isAuthenticated = true
            state.user = action.payload;
        },

        userFails: (state, action: PayloadAction<errorMessagePropsType>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.errorMessage = action.payload;

        },

        removeUser: (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        },

        clearErrorState: (state) => {
            state.errorMessage = null;
        }
    }
})

export const { userRequest,
    userSuccess,
    userFails,
    removeUser,
    clearErrorState,
    loginRequest,
    loginSuccess,
    loginFails,
    loginCleartState, 
    logoutState } = userSlice.actions


export default userSlice.reducer    
