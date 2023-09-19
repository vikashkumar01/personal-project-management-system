
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom'

import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import CreateProject from './pages/Project/CreateProject';
import UpdateProject from './pages/Project/UpdateProject';
import Project from './pages/Project/Project';
import ViewAllTask from './pages/ProjectTask/ViewAllTask';
import AddTask from './pages/ProjectTask/AddTask';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrorState, errorMessagePropsType, tokenPropsType } from './redux/userSlice';
import { AppDispatch } from './redux/store';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import { userFails, userRequest, userSuccess } from './redux/userSlice';
import { getUser } from './utils/features';

interface rootState {
  user: {
    isLoading: boolean;
    isAuthenticated: boolean;
    token: tokenPropsType | null;
    errorMessage: errorMessagePropsType | null;
  }
}


function App() {

  const { isLoading, isAuthenticated,errorMessage } = useSelector((state: rootState) => state.user);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    const tokenA: string | null = localStorage.getItem('authToken');
    if(tokenA!==null) {
      dispatch(userRequest())
      getUser().then(res=>{
        dispatch(userSuccess(res))
      }).catch(err=>{
        dispatch(userFails(err))
        localStorage.removeItem('authToken')
      })
    }
  },[dispatch])

  useEffect(()=>{

    setTimeout(()=>{
      if(errorMessage){
        dispatch(clearErrorState())
      }
    },3000)

  },[dispatch,errorMessage])

  if (isLoading) {
    return <span>Loading...</span>
  }


  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />} >
            <Route path="/" element={<Project />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/update-project/:id" element={<UpdateProject />} />
            <Route path='/project/:projectId/view-all-task' element={<ViewAllTask />} />
            <Route path='/project/:projectId/add-task' element={<AddTask />} />
          </Route>
          <Route path="/login" element={isAuthenticated?<Navigate to={"/"}/>:<Login />} />
          <Route path="/register" element={isAuthenticated?<Navigate to={"/"}/>:<Register />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </Router>


    </>
  )
}

export default App
