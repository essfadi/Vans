const moongose = require("mongoose");


const schduleSchema = moongose.Schema(
  {
    driver: {
        type: String,
        required: [true, "Please, driver is required"],
    },
    startDateTime: {
      type: Date,
      required: [true, "Please, time is required"],
    },
    endDateTime: {
      type: Date,
      required: [true, "Please, time is required"],
    },
    points: {
      type: [String],
      required: [true, "Please, trajectory is required"],
    },
    numberOfPassengers: {
      type: Number,
      required: [true, "Please, number of passengers is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongose.model("Schedule", schduleSchema);