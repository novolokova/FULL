import axios from 'axios';
import qs from 'query-string';
import FormData from 'form-data';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api',
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

// ***********Task*************

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

// ***********Group*************

export const postGroup = (values) => {
  // навчаємо axios приймати json з файлом(обгортаємо значення яке прийщлоз input = GroupForm)
  const formDataValues = new FormData();
  //записується через forIn це утілітка, можна винести її 1:09 107/1
  formDataValues.append('name', values.name);
  formDataValues.append('userId', values.userId);
  formDataValues.append('image', values.image);
  return httpClient.post('/groups', formDataValues, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
