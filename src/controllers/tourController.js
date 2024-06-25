import Tour from "../models/Tour.js";
export const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    return res.status(201).json({
      success: true,
      message: "Create new Tour succeed !",
      data: savedTour,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getTours = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    return res.status(200).json({
      success: true,
      message: "Get All Tours Succeed !",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server !",
    });
  }
};
export const getSingleTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    // const tour = await Tour.find({ _id: tourId });
    const tour = await Tour.findById(tourId).populate("reviews");
    return res.status(200).json({
      success: true,
      message: "Get single tour Succeed !",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server !",
    });
  }
};
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const savedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Update Tour succeed !",
      data: savedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failure !",
    });
  }
};
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Delete Tour succeed !",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failure to delete !",
    });
  }
};
