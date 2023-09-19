
import './viewalltask.scss'

import { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectTaskProps, ProjectProps, userSuccess } from '../../redux/userSlice';
import { userPropsType } from '../../redux/userSlice';
import { AppDispatch } from '../../redux/store';
import {
  clearErrorState,
  deleteProjectTaskByIdFails,
  deleteProjectTaskByIdRequest,
  deleteProjectTaskByIdSuccess,
  updateProjectTaskRequest,
  updateProjectTaskSuccess
} from '../../redux/projectTaskSlice';
import { deleteProjectTaskById, getUser, updateProjectTask } from '../../utils/features';
import { updateProjectFails } from '../../redux/projectSlice';

interface userStateProps {
  user: {
    isLoading: boolean,
    user: userPropsType
  }
}

interface projectStateProps {
  projectTask: {
    isSuccess: boolean,
    isLoading: boolean,
    umessage: string,
    dmessage: string,
  }
}

const ViewAllTask = () => {

  const { isLoading, user } = useSelector((state: userStateProps) => state.user)
  const { isSuccess, dmessage, umessage } = useSelector((state: projectStateProps) => state.projectTask)
  const { projectId } = useParams()
  const dispatch: AppDispatch = useDispatch()

  const [projectTask, setProjectTask] = useState<ProjectTaskProps[]>([])

  useEffect(() => {

    if (user && user.projectList) {
      const foundProject = user.projectList.find((proj: ProjectProps) => proj.id === Number(projectId));
      if (foundProject) {
        setProjectTask(foundProject.projectTaskList);
      }
    }
  }, [projectId, user])

  const deleteProjectTaskHandler = (id: number) => {
    dispatch(deleteProjectTaskByIdRequest())
    deleteProjectTaskById(id).then((res) => {
      dispatch(deleteProjectTaskByIdSuccess(res.data))
      getUser().then((res) => {
        dispatch(userSuccess(res));
      })
    }).catch((err) => {
      dispatch(deleteProjectTaskByIdFails(err))
    })
  }

  const updateProjectTaskHandler = (id: number) => {
    dispatch(updateProjectTaskRequest())
    updateProjectTask(id).then((res) => {
      dispatch(updateProjectTaskSuccess(res.data))
      getUser().then((res) => {
        dispatch(userSuccess(res));
      }).catch((err) => {
        dispatch(updateProjectFails(err))
      })
    })
  }

  useEffect(() => {
    setTimeout(() => {
      if (dmessage || umessage) {
        dispatch(clearErrorState())
      }
    }, 5000)
  }, [dmessage, umessage, dispatch,])


  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <div className="view-all-task">
      <h1>View All Task</h1>

      <Link to={`/project/${projectId}/add-task`}>Add New Task</Link>

      {(isSuccess && dmessage) && <span>{JSON.stringify(dmessage)}</span>}
      {(isSuccess && umessage) && <span>{JSON.stringify(umessage)}</span>}

      <div>
        <section className='section-border'>
          <span>Not Started Task</span>

          <div>
            <div>
              <h2>Title</h2>
              <h2>Summary</h2>
              <h2>DueDate</h2>
              <h2>Status</h2>
              <h2>Start</h2>
              <h2>Delete</h2>

            </div>

            {
              projectTask.filter((task: ProjectTaskProps) => task.status === 'Not_Started')
                .map((task: ProjectTaskProps, i: number) => (
                  <div key={i}>
                    <h3>{task?.title}</h3>
                    <h3>{task?.summary}</h3>
                    <h3>{task?.dueDate}</h3>
                    <h3>{task?.status}</h3>
                    <button onClick={() => updateProjectTaskHandler(task.id)}>start</button>
                    <button onClick={() => deleteProjectTaskHandler(task.id)}>
                      <AiFillDelete />
                    </button>
                  </div>
                ))
            }



          </div>

        </section>

        <section className='section-border'>
          <span>On Going Task</span>
          <div>

            <div>
              <h2>Title</h2>
              <h2>Summary</h2>
              <h2>DueDate</h2>
              <h2>Status</h2>
              <h2>Start</h2>
              <h2>Delete</h2>

            </div>
            {
              projectTask.filter((task: ProjectTaskProps) => task.status === 'On_Going')
                .map((task: ProjectTaskProps, i: number) => (
                  <div key={i}>
                    <h3>{task?.title}</h3>
                    <h3>{task?.summary}</h3>
                    <h3>{task?.dueDate}</h3>
                    <h3>{task?.status}</h3>
                    <button onClick={() => updateProjectTaskHandler(task.id)}>Complete</button>
                    <button onClick={() => deleteProjectTaskHandler(task.id)}>
                      <AiFillDelete />
                    </button>
                  </div>
                ))
            }


          </div>

        </section>

        <section >
          <span>Completed Task</span>

          <div>
            <div>
              <h2>Title</h2>
              <h2>Summary</h2>
              <h2>DueDate</h2>
              <h2>Status</h2>
              <h2>Start</h2>
              <h2>Delete</h2>

            </div>

            {
              projectTask.filter((task: ProjectTaskProps) => task.status === 'Completed')
                .map((task: ProjectTaskProps, i: number) => (
                  <div key={i}>
                    <h3>{task?.title}</h3>
                    <h3>{task?.summary}</h3>
                    <h3>{task?.dueDate}</h3>
                    <h3>{task?.status}</h3>
                    <button onClick={() => deleteProjectTaskHandler(task.id)}>
                      <AiFillDelete />
                    </button>
                  </div>
                ))
            }

          </div>

        </section>
      </div>
    </div>
  )
}

export default ViewAllTask