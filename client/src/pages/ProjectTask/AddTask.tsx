
import './viewalltask.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import {
    clearErrorState,
    createProjectTaskFails,
    createProjectTaskRequest,
    createProjectTaskSuccess,
    errorMessagePropsType
} from '../../redux/projectTaskSlice'
import { createProjectTask, getUser } from '../../utils/features'
import { useParams } from 'react-router-dom'
import { userSuccess } from '../../redux/userSlice'

interface projectStateProps {
    projectTask: {
        isSuccess: boolean,
        isLoading: boolean,
        cmessage: string,
        errorMessage: errorMessagePropsType
    }
}

const AddTask = () => {

    const { isLoading, isSuccess, cmessage, errorMessage } = useSelector((state: projectStateProps) => state.projectTask)
    const dispatch: AppDispatch = useDispatch()
    const { projectId } = useParams()

    const [title, setTitle] = useState<string>('')
    const [summary, setSummary] = useState<string>('')
    const [dueDate, setDueDate] = useState<string>('')


    const addProjectTaskHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(createProjectTaskRequest())
        createProjectTask(Number(projectId), title, summary, new Date(dueDate)).then((res) => {
            dispatch(createProjectTaskSuccess(res.data))
            getUser().then((res) => {
                dispatch(userSuccess(res))
            })
        }).catch((err) => {
            console.log(err)
            dispatch(createProjectTaskFails(err))
        })

        setTitle('')
        setSummary('')
        setDueDate('')

    }

    useEffect(() => {
        setTimeout(() => {
            if (cmessage || errorMessage) {
                dispatch(clearErrorState())
            }
        }, 3000)

    }, [dispatch,cmessage,errorMessage])


    return (
        <div className='add-task-container'>
            <h1>Add New Task</h1>
            <section>
                <form>
                    <div>
                        <label>Task Name</label>
                        <input type="text" placeholder='Enter the task name'
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                    </div>

                    <div>
                        <label>Task Description</label>
                        <input type="text" placeholder='Enter the task description'
                            value={summary}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSummary(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>End Date</label>
                        <input type="date" placeholder='Enter the task name'
                            value={dueDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)} />
                    </div>

                    <button disabled={!title || !summary || !dueDate} onClick={addProjectTaskHandler}>
                        {
                            isLoading ? "Loading..." : "Add Task"
                        }
                    </button>


                </form>
            </section>
            {(isSuccess && cmessage) && <span>{JSON.stringify(cmessage)}</span>}
            {(isSuccess && errorMessage) && <span>{errorMessage.message}</span>}
        </div>
    )
}

export default AddTask