import express from 'Express';
import {createTask,getAllTasks,getCurrentUserTasks,updateTask,deleteTask} from '../controllers/task.js';

const Router=express.Router();

Router.get('/hello', (req,res) => {
    res.json('Its working!!');
});

Router.post('/',createTask);
Router.get('/all',getAllTasks);
Router.get('/myTasks', getCurrentUserTasks);
Router.put('/:taskId', updateTask);
Router.delete('/:taskId', deleteTask);
export default Router;
