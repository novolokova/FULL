import axios from 'axios';

const httpClient = axios.create({
  // подключение к ресурсу для работы, запрос клиента за адресом сервера
  baseURL: 'http://localhost:3000/api',
});

export const getUsers = (
  { limit, offset } //axios-запрос всегда возвращает promice => передается в userSlice(reduser) => Middleware(работает с посторонними эфектами) и dispatch(action) передается в userSlice - extraReducers и изменяется state (зв'язали  back i front)
) => httpClient.get('/users?limit=2&offset=0');

export const postUser = (values) => httpClient.post('/users', values);
