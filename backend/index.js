console.clear();

const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");

const app = express();
app.use(cors());
require("dotenv").config();
connectDB();

// const dataSchema = new mongoose.Schema({
//   openedPrograms: { type: Number },
//   frameNumber: { type: Number },
//   eyeAspectRatio: { type: Number },
//   mouthAspectRatio: { type: Number },
//   headTiltDegree: { type: Number },
//   eyePupil: { type: Number },
//   cluster: { type: Number },
//   createdAt: { type: Date, default: Date.now() },
// });

//const DataModel = mongoose.model('Data', dataSchema);

// const connect = async () => {
//   try {
//     await connectDB();
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1);
//   }
// };
app.use("/api/data", require("./router/dataRouter"));

// const disconnect = async () => {
//   try {
//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   } catch (error) {
//     console.error('Error disconnecting from MongoDB:', error.message);
//   }
// };

// const insertDataIntoMongoDB = async (data) => {
//   try {
//     await connect(); // Ensure the connection is established before insertion
//     const result = await DataModel.insertMany(data);
//     console.log(`${result.length} documents inserted`);
//   } catch (error) {
//     console.error('Error inserting data into MongoDB:', error.message);
//   } finally {
//     await disconnect(); // Disconnect after insertion
//   }
// };

// const fs = require('fs');
// const csv = require('csv-parser');

// const results = [];

// fs.createReadStream('ClassifiedFIKO (1).csv')
//   .pipe(csv())
//   .on('data', (data) => {
//     const transformedData = {
//       openedPrograms: Number(data['Opened Programs']),
//       frameNumber: Number(data['Frame Number']),
//       eyeAspectRatio: Number(data['Eye Aspect Ratio']),
//       mouthAspectRatio: Number(data['Mouth Aspect Ratio']),
//       headTiltDegree: Number(data['Head Tilt Degree']),
//       eyePupil: Number(data['Eye Pupil']),
//       cluster: Number(data['Cluster']),
//     };

//     results.push(transformedData);
//   })
//   .on('end', () => {
//     insertDataIntoMongoDB(results);
//   });

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`Server is running on PORT ${PORT}`)
);
