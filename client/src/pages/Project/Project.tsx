
import './commonproject.scss'


import { Link } from 'react-router-dom'

import { AiFillEdit, AiFillDelete, AiOutlineFolderView } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectProps, removeUser, userPropsType, userSuccess } from '../../redux/userSlice';
import { errorMessagePropsType, projectDeleteFails, projectDeleteRequest, projectDeleteSuccess } from '../../redux/projectSlice';
import { deleteProject, getUser, logout } from '../../utils/features';
import { logoutState } from '../../redux/userSlice';
import { Navigate } from 'react-router-dom'


interface userProjectPropsType {
    user: {
        isLoading: boolean;
        user: userPropsType;

    }

}

interface deleteProjectPropsType {
    project: {
        isLoading: boolean;
        isSuccess: boolean;
        dmessage: string;
        errorMessage: errorMessagePropsType;

    }

}


const Project = () => {

    const { isLoading, user } = useSelector((state: userProjectPropsType) => state.user)
    const { isSuccess, errorMessage, dmessage } = useSelector((state: deleteProjectPropsType) => state.project)
    const dispatch = useDispatch();


    const deleteProjectHandle = (id: number) => {
        dispatch(projectDeleteRequest())
        deleteProject(id).then((res) => {
            dispatch(projectDeleteSuccess(res.data))
            getUser().then((res) => {
                dispatch(userSuccess(res));
            })
        }).catch((err) => {
            dispatch(projectDeleteFails(err))
        })
    }

    function logoutHandler() {
        logout().then((res) => {
            localStorage.removeItem('authToken')
            dispatch(logoutState(res.data))
            dispatch(removeUser())

        })
        return <Navigate to={"/"} />

    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className='project-container'>

            <h1>List of All Projects</h1>

            <Link to={'/create-project'}>Create Project</Link>

            <div className='userContainer'>
                <h3>{user?.name}</h3>
                <button onClick={logoutHandler}>Logout</button>
            </div>


            {
                (isSuccess && dmessage) ? <span>{JSON.stringify(dmessage)}</span> : null
            }
            {
                errorMessage && <span>{errorMessage.message}</span>
            }

            <section>
                <table>
                    <thead>
                        <tr>
                            <th>pNo</th>
                            <th>Projecr_Name</th>
                            <th>Projecr_Desc</th>
                            <th>Start_date</th>
                            <th>End_date</th>
                            <th>Created_At</th>
                            <th>Updated_At</th>
                            <th>delete_project</th>
                            <th>Update_project</th>
                            <th>View_projet_task</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            user?.projectList?.map((item: ProjectProps, i: number) => (
                                <tr key={i}>
                                    <td>#0{i + 1}</td>
                                    <td>{item.projectName}</td>
                                    <td>{item.description}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>{item?.updatedAt?.substring(0, 10)}</td>
                                    <td>
                                        <button onClick={() => deleteProjectHandle(item.id)}>
                                            <AiFillDelete />
                                        </button>
                                    </td>
                                    <td>
                                        <div>
                                            <Link to={`/update-project/${item.id}`}>
                                                <AiFillEdit />
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <Link to={`/project/${item.id}/view-all-task`}>
                                                <AiOutlineFolderView />
                                            </Link>
                                        </div>
                                    </td>

                                </tr>))
                        }
                    </tbody>
                </table>

            </section>

        </div>
    )
}

export default Project