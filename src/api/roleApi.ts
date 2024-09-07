import { IBackendRes, IRole, IModelPaginate } from "../types/backend"
import axios from "../config/axios"

export const callCreateRole = (role: IRole) => {
    console.log('role: ', role);    
    return axios.post<IBackendRes<IRole>>('/api/v1/roles/create', role, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const callUpdateRole = (role: IRole, id: string) => {
    return axios.put<IBackendRes<IRole>>(`/api/v1/roles/update/${id}`, { id, ...role })
}

export const callDeleteRole = (id: string) => {
    return axios.delete<IBackendRes<IRole>>(`/api/v1/roles/delete/${id}`);
}

export const callFetchRole = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IRole>>>(`/api/v1/roles/getAll?${query}`);
}

export const callFetchRoleById = (id: string) => {
    return axios.get<IBackendRes<IRole>>(`/api/v1/roles/${id}`);
}