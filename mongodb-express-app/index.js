import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
const uri = "mongodb+srv://darrenikinepule:Kohsamui08!@cluster1.dx6bxgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&appName=cluster1"
mongoose.connect(uri);

// Define Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  courses: [String],
  address: {
    street: String,
    city: String,
    postcode: String
  }
});

const Student = mongoose.model('Student', studentSchema);

// API Endpoints
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

app.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});