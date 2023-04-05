import axios from 'axios';
import qs from 'query-string'

const httpClient = axios.create({
  // подключение к ресурсу для работы, запрос клиента за адресом сервера
  baseURL: 'http://localhost:3000/api',
});

export const getUsers = (
  { options={}} //axios-запрос всегда возвращает promice => передается в userSlice(reduser) => Middleware(работает с посторонними эфектами) и dispatch(action) передается в userSlice - extraReducers и изменяется state (зв'язали  back i front)
) => {
  const defaultOptions = {
    limit:5,
    offset:0
  }
  const readyOptions={
    ...defaultOptions,
    ...options
  }
  return httpClient.get(`/users?${qs.stringify(readyOptions)}`)};

export const postUser = (values) => httpClient.post('/users', values);
