import { useState } from 'react';

import './commonproject.scss'
import { createProject, getUser } from '../../utils/features';

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store';
import {
  clearErrorState,
  createProjectFails,
  createProjectRequest,
  createProjectSuccess,
  errorMessagePropsType
} from '../../redux/projectSlice';
import { userSuccess } from '../../redux/userSlice';

interface projectStatePropsType {
  project: {
    isSuccess: boolean,
    isLoading: boolean,
    cmessage: string | null,
    errorMessage: errorMessagePropsType | null
  };
}

const CreateProject = () => {

  const { isLoading, isSuccess, cmessage, errorMessage } = useSelector((state: projectStatePropsType) => state.project)
  const dispatch: AppDispatch = useDispatch()

  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const createProjectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault()
    dispatch(clearErrorState())
    dispatch(createProjectRequest())
    createProject(projectName, projectDescription, new Date(startDate), new Date(endDate))
      .then((res) => {
        dispatch(createProjectSuccess(res.data))
        getUser().then((res)=>{
          dispatch(userSuccess(res));
      })
      }).catch((err) => {
        dispatch(createProjectFails(err))
      })

      setProjectName("")
      setProjectDescription("")
      setEndDate("")
      setStartDate("")
  }


  return (
    <div className='create-project-container'>
      <h1>Create Project</h1>
      <section>
        <form >

          <div>
            <label>Project Name</label>
            <input
              type="text"
              placeholder='Project Name'
              value={projectName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
            />
            {errorMessage && <span>{errorMessage.projectName}</span>}
          </div>

          <div>
            <label>Project Description</label>
            <input type="text"
              placeholder='Project Description'
              value={projectDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectDescription(e.target.value)}
            />
            {errorMessage && <span>{errorMessage.description}</span>}
          </div>

          <div>
            <label>Start Date</label>
            <input type="Date"
              value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
            />
            {errorMessage && <span>{errorMessage?.startDate}</span>}
          </div>

          <div>
            <label>End Date</label>
            <input type="Date"
              value={endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
            />
            {errorMessage && <span>{errorMessage?.endDate}</span>}
          </div>

          <button onClick={createProjectHandler}>
            {isLoading ? 'Loading...' : 'Create New Project'}
          </button>

        </form>


      </section>
      {(isSuccess && cmessage) && <span>{cmessage}</span>}
      {errorMessage && <span>{errorMessage.message}</span>}
    </div>
  )
}

export default CreateProject