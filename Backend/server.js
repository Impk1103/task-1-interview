const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./model.js');
const fs = require('fs');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const storage = multer.memoryStorage();
const upload = multer({
  dest: 'uploads/',
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          const dir = path.join(__dirname, 'uploads');
          if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
          }
          cb(null, dir);
      },
      filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
      },
  }),
});

mongoose
  .connect('mongodb+srv://impk1103:pk339900@cluster0.drrzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.post('/users', upload.array('images'), async (req, res) => {
  try {
    console.log(req.files);
    const { name, socialMediaHandle } = req.body;
    const imageBase64Array = req.files.map((file) => {
      const filePath = file.path;
      const fileData = fs.readFileSync(filePath);
      const base64Image = fileData.toString('base64');
      fs.unlinkSync(filePath); 
      return base64Image;
  });
    const user = new User({ name, socialMediaHandle, imageBase64Array});
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(5000);

