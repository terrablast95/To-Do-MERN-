
import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/index.js';


const app = express();
const PORT = 8000;
mongoose.set('strictQuery', true);

// middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', allRoutes);

app.use((err,req,res,next)=>{
  const status=err.statusCode||500;
  const message=err.message||'Internal Server Error';

  return res.status(status).json({message,stack:err.stack});
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/task_management_rec");
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err);  
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
