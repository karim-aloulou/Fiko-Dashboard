const DataSchema = require("../models/dataModel");

exports.getData = async (req, res) => {
  try {
    // Parse query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200; // Adjust the limit as needed
    const openedProgramsValue = parseInt(req.query.openedPrograms);
    console.log("openedPrograms",openedProgramsValue)

    // Calculate the skip value based on page and limit
    const skip = (page - 1) * limit;

    // Retrieve data with pagination, sorted by created time in descending order
    const data = await DataSchema.find({ openedPrograms: openedProgramsValue })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
      .skip(skip)
      .limit(limit);

    // Count the total number of documents in the collection
    const totalCount = await DataSchema.countDocuments();

    res.status(200).send({ data: data, totalCount: totalCount });
  } catch (error) {
    res.status(500).send(error);
  }
};
