import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './database/db.js';
import userRoutes from './routes/user.js'
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';
import cors from "cors";

dotenv.config()
const app = express();
const port = process.env.PORT;
app.use(cors())

app.use(express.json());
app.use("/uploads",express.static("uploads"))

app.get('/', (req, res) => {
    res.send('Server is listening on port ' + port);
})

app.use('/api',userRoutes);
app.use('/api',courseRoutes);
app.use('/api',adminRoutes);

app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`)
    connectDb()
})