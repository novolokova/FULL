const express = require('express');
const cors = require('cors');
const {
  errorValidateHandle,
  errorHandle,
} = require('./middlewares/error.handlers');
const router = require('./routes');

const app = express();
app.use(cors()); // ф-я которая позволяет делать запрос на другой порт Cross-Origin Resource Sharing (CORS)

app.use(express.static('public')); // можливість працювати з статичними файлами (з папки public)
app.use(express.json()); // Content-Type: application/json - если не пропишем в requests то этот метод не будет работать не сможет читать

//http://localhost:3000/api
app.use('/api', router);

app.use(errorValidateHandle);
app.use(errorHandle);

module.exports = app;
