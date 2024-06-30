const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'praktika',
  password: '123',
  port: 5432,
});

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


app.get('/users', async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM users');
    if (results.rows.length === 0) {
      res.status(404).json({ message: 'Пользователи не найдены' });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (error) {
    console.error('Ошибка выполнения запроса', error);
    res.status(500).send('Ошибка получения данных из базы данных');
  }
});
app.delete('/users/:user_id', async (req, res) => {
  const user_id = req.params.user_id; 
  try {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
    if (result.rowCount > 0) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "DELETE");
      res.status(200).send({ message: `Пользователь с user_id:${user_id} успешно удален` });
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "DELETE");
      res.status(404).send({ message: `Пользователь с user_id:${user_id} не найден` });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "DELETE");
    res.status(500).send('Ошибка удаления пользователя из базы данных');
  }
});
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, patronymic, birthDate, phone, department, positionInRating } = req.body;

    const queryText = 'INSERT INTO users (first_name, last_name, patronymic, birth_date, phone, department, position_in_rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id';
    const values = [firstName, lastName, patronymic, birthDate, phone, department, positionInRating];

    const result = await pool.query(queryText, values);
    const user_id = result.rows[0].user_id; 

    res.status(201).json({ user_id, message: 'Пользователь добавлен в базу данных' }); 
  } catch (error) {
    console.error('Ошибка добавления пользователя:', error);
    res.status(500).send('Ошибка добавления пользователя в базу данных.');
  }
});
app.put('/users/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const { first_name, last_name, patronymic, birth_date, phone, department, position_in_rating } = req.body;

    const queryText = `
      UPDATE users 
      SET 
      first_name = $1, 
      last_name = $2, 
      patronymic = $3, 
      birth_date = $4, 
      phone = $5, 
      department = $6, 
      position_in_rating = $7 
      WHERE user_id = $8
      RETURNING user_id
    `;

    const values = [first_name, last_name, patronymic, birth_date, phone, department, position_in_rating, userId];

    const result = await pool.query(queryText, values);

    if (result.rowCount > 0) {
      res.status(200).json({ user_id: result.rows[0].user_id, message: 'Пользователь обновлен в базе данных' });
    } else {
      res.status(404).send('Пользователь не найден');
    }
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    res.status(500).send('Ошибка при обновлении пользователя в базе данных');
  }
});
const port = 5000;
app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
