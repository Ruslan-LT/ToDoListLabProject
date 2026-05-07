const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const Task = require('./models/Task');
const app = express();
app.use(cors());
app.use(express.json());
User.hasMany(Task);
Task.belongsTo(User);

app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;

    const task = await Task.create({
        title,
        description,
        status: 'pending'
    });

    res.json(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll();

    res.json(tasks);
});

app.put('/tasks/:id', async (req, res) => {
    const { status } = req.body;

    await Task.update(
        { status },
        {
            where: {
                id: req.params.id
            }
        }
    );

    res.json({ message: 'Task updated' });
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.destroy({
        where: {
            id: req.params.id
        }
    });

    res.json({ message: 'Task deleted' });
});


async function start() {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync();

        app.listen(3000, () => {
            console.log('Server started: http://localhost:3000');
        });

    } catch (error) {
        console.log(error);
    }
}

start();