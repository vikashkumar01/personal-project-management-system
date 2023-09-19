

import './commonproject.scss'

import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProjectByIdFails,
  getProjectByIdRequest,
  getProjectByIdSuccess,
  updateProjectFails,
  updateProjectRequest,
  updateProjectSuccess,
  errorMessagePropsType,
  ProjectProps
} from '../../redux/projectSlice'
import { getProjectById, getUser, updateProject } from '../../utils/features'
import { userSuccess } from '../../redux/userSlice'


interface projectStatePropsType {
  project: {
    isSuccess: boolean,
    isLoading: boolean,
    umessage: string,
    errorMessage: errorMessagePropsType,
    project: ProjectProps
  };
}

const UpdateProject = () => {

  const { id } = useParams();

  const { isLoading, isSuccess, umessage, errorMessage, project } = useSelector((state:projectStatePropsType) => state.project);
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');


  const updateProjectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault()
    dispatch(updateProjectRequest())
    updateProject(Number(id), projectName, projectDescription, new Date(startDate), new Date(endDate))
      .then((res) => {
        dispatch(updateProjectSuccess(res.data))
        getUser().then((res) => {
          dispatch(userSuccess(res));
        })
      }).catch((err) => {
        dispatch(updateProjectFails(err))
      })
  }



  useEffect(() => {
    if (project) {
      if (project.id === Number(id)) {
        setProjectName(project.projectName)
        setProjectDescription(project.description)
        setStartDate(project.startDate)
        setEndDate(project.endDate)
      } else {
        dispatch(getProjectByIdRequest())
        getProjectById(Number(id)).then((res) =>
          dispatch(getProjectByIdSuccess(res.data)
          )).catch((err) => {
            dispatch(getProjectByIdFails(err))
          })

      }
    } else {
      dispatch(getProjectByIdRequest())
      getProjectById(Number(id)).then((res) =>
        dispatch(getProjectByIdSuccess(res.data)
        )).catch((err) => {
          dispatch(getProjectByIdFails(err))
        })
    }

  }, [id, project,dispatch])


  return (
    <div className='create-project-container'>
      <h1>Update Project</h1>
      <section>
        <form >

          <div>
            <label>Project Name</label>
            <input type="text"
              placeholder='Project Name'
              value={projectName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
            />
          </div>

          <div>
            <label>Project Description</label>
            <input type="text"
              placeholder='Project Description'
              value={projectDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectDescription(e.target.value)} />
          </div>

          <div>
            <label>Start Date</label>
            <input type="Date"
              value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)} />
          </div>

          <div>
            <label>End Date</label>
            <input type="Date"
              value={endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)} />
          </div>

          <button onClick={updateProjectHandler}>
            {isLoading ? "Loading..." : "Update Project"}
          </button>

        </form>
      </section>
       {(isSuccess && umessage) && <span>{JSON.stringify(umessage)}</span>}
       {(!isSuccess && errorMessage) && <span>{errorMessage.message}</span>}
    </div>
  )
}

export default UpdateProject