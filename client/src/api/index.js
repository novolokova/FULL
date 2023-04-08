import axios from 'axios';
import qs from 'query-string';
import FormData from 'form-data'
import CONSTANTS from '../constants';

const httpClient = axios.create({
  // подключение к ресурсу для работы, запрос клиента за адресом сервера
  baseURL: 'http://localhost:3000/api',
});

//axios-запрос всегда возвращает promice => передается в userSlice(reduser) => Middleware(работает с посторонними эфектами) и dispatch(action)=> передается в userSlice - extraReducers и изменяется state (зв'язали  back i front)



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
