const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dataSchema = new Schema({
  openedPrograms: { type: Number, required: true },
  frameNumber: { type: Number, required: true },
  eyeAspectRatio: { type: Number, required: true },
  mouthAspectRatio: { type: Number, required: true },
  headTiltDegree: { type: Number, required: true },
  eyePupil: { type: Number, required: true },
  cluster: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = DataSchema = model("data", dataSchema);
