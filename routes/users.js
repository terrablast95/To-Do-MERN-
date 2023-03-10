import express from 'express';
import {getUserInfo,updateUser} from '../controllers/user.js';

const Router=express.Router();

Router.get('/me',getUserInfo);
Router.put('/me',updateUser);
export default Router;