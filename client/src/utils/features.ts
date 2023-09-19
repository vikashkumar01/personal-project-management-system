
import axios, { AxiosError } from 'axios';

const apiUrl = 'http://localhost:8080/api/v1'

const token = 'Bearer ' + localStorage.getItem('authToken');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
};


export const registerUser = async (name: string, email: string, password: string) => {
    try {

        const res = await axios.post(`${apiUrl}/user/register`,
            { name, email, password },
            {
                headers
            })
        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                name: err?.response.data?.name,
                email: err?.response.data?.email,
                password: err?.response.data?.password,
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}

export const loginUser = async (email: string, password: string) => {

    try {

        const res = await axios.post(`${apiUrl}/user/login`,
            { email, password },
            {
                headers
            })

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}


export const getUser = async () => {

    try {

        const res = await axios.get(`${apiUrl}/user/current-user`, { headers })

        return res.data;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data
            };
        } else {
            throw err;
        }
    }
}

export const logout = async () => {

    try {

        const res = await axios.get(`${apiUrl}/user/logout`, { headers })

        console.log(res)

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}

export const createProject = async (projectName: string,
    description: string, startDate: Date, endDate: Date) => {

    try {

        const res = await axios.post(`${apiUrl}/project/create`,
            { projectName, description, startDate, endDate },
            { headers }
        )

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                projectName: err?.response.data?.projectName,
                description: err?.response.data?.description,
                startDate: err?.response.data?.startDate,
                endDate: err?.response.data?.endDate,
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}

export const getProjectById = async (id: number) => {

    try {

        const res = await axios.get(`${apiUrl}/project/${id}`, { headers })

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}

export const updateProject = async (id: number, projectName: string,
    description: string, startDate: Date, endDate: Date) => {

    try {

        const res = await axios.put(`${apiUrl}/project/${id}`,
            { projectName, description, startDate, endDate },
            { headers })

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}


export const deleteProject = async (id: number) => {

    try {

        const res = await axios.delete(`${apiUrl}/project/${id}`, { headers })

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}

export const createProjectTask = async (projectId: number, title: string,
    summary: string, dueDate: Date) => {

    try {

        const res = await axios.post(`${apiUrl}/${projectId}/projectTask/create-task`,
            { title, summary, dueDate },
            { headers }
        )


        return res

    } catch (err) {


        if (err instanceof AxiosError && err.response) {
            throw {
                title:err?.response?.data?.title,
                summary:err?.response?.data?.summary,
                dueDate:err?.response?.data?.dueDate,
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}

export const updateProjectTask = async (projectTaskId: number) => {

    try {

        const res = await axios.get(`${apiUrl}/projectTask/${projectTaskId}/update`,
            { headers }
        )

        return res

    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}


export const deleteProjectTaskById = async (projectTaskId: number) => {

    try {

        const res = await axios.delete(`${apiUrl}/projectTask/${projectTaskId}`,
            { headers }
        )

        return res

    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response.data?.message
            };
        } else {
            throw err;
        }
    }
}

