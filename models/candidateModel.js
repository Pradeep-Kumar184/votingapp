import mongoose from "mongoose";
const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  party: {
    type: String,
    require: true,
    unique: true,
  },
  age: {
    type: Number,
    require: true,
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("candidate", candidateSchema);
