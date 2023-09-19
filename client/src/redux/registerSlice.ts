import { PayloadAction, createSlice, } from "@reduxjs/toolkit";

export interface UserPropsType{
    id:number,
    name:string,
    email:string,
    password:string,
    created_at:Date,
    updated_at:Date,
}

export interface errorMessagePropsType{
    name?:string,
    email?:string,
    password?:string,
    message?:string
}



 const initialState = {
    user: {} as UserPropsType|null,
    isLoading: false as boolean,
    isSuccess: false as boolean,
    errorMessage: {} as errorMessagePropsType|null
  }

 const registerSlice = createSlice({
      name:"register",
      initialState,
      reducers:{

        registerRequest: (state)=>{
            state.isLoading= true;
        },

        registerSuccess: (state,action:PayloadAction<UserPropsType>)=>{
            
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload
        },

        registerFails:(state,action:PayloadAction<errorMessagePropsType>)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage=action.payload
        },

        registerCleartState:(state)=>{
            state.isSuccess = false;
            state.errorMessage=null;
        }

      }
})




 export const { registerRequest,registerSuccess,registerFails,registerCleartState } = registerSlice.actions

export default registerSlice.reducer