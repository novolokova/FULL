import axios from 'axios';
import qs from 'query-string';
import FormData from 'form-data';
import { REQUEST_DATA, CONSTANTS } from '../constants';

const { PORT_SERVER, HOST, MAIN_URL } = REQUEST_DATA;
const httpClient = axios.create({
  baseURL: `${HOST}:${PORT_SERVER}/${MAIN_URL}`,
});

export const getUsers = (options = {}) => {
  const defaultOptions = {
    limit: CONSTANTS.MIN_LIMIT,
    offset: 0,
  };
  const readyOptions = {
    ...defaultOptions,
    ...options,
  };
  return httpClient.get(`/users?${qs.stringify(readyOptions)}`);
};
export const postUser = (values) => httpClient.post('/users', values);
export const getUser = (idUser) => httpClient.get(`/users/${idUser}`);
export const patchUser = ({ idUser, values }) =>
  httpClient.patch(`/users/${idUser}`, values);
export const deleteUser = (idUser) => httpClient.delete(`/users/${idUser}`);

export const postTask = ({ idUser, values }) =>
  httpClient.post(`tasks/users/${idUser}`, values);
export const getTasks = ({ limit, offset }) =>
  httpClient.get(`/tasks?${qs.stringify({ limit, offset })}`);
export const getTask = ({ idUser, idTask }) =>
  httpClient.get(`/tasks/users/${idUser}/${idTask}`);
export const getUserTasks = (idUser) =>
  httpClient.get(`/tasks/users/${idUser}`);
export const patchTask = ({ idTask, values }) =>
  httpClient.patch(`/tasks/${idTask}`, values);
export const deleteTask = ({ userId, id }) =>
  httpClient.delete(`/tasks/users/${userId}/${id}`);

export const postGroup = (values) => {
  const formDataValues = new FormData();
  formDataValues.append('name', values.name);
  formDataValues.append('userId', values.userId);
  formDataValues.append('image', values.image);
  return httpClient.post('/groups', formDataValues, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const getAllGroups = () => httpClient.get('/groups');
export const getUserGroups = (idUser) =>
  httpClient.get(`/groups/users/${idUser}`);
export const addUserToGroups = ({ idGroup, values }) =>
  httpClient.post(`/groups/${idGroup}`, values);
