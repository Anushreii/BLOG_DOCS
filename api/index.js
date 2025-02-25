import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser';
import uploadroutes from './routes/upload.route.js';
import commentRoutes from './routes/comment.route.js';
//import path from 'path';

dotenv.config();

const app = express();
app.use(cors());

// Increase body size limit
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO)
.then(()=>{  //debuging
    console.log("Mongodb connected sucessfully")
})
.catch((err)=>{
   console.log(err);
});

//const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());



app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes);
app.use("/api", uploadroutes);
app.use('/api/comment', commentRoutes);
app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*',(req, res) =>{
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })


app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});