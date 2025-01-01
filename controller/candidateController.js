import candidateModel from "../models/candidateModel.js";
import userModel from "../models/userModel.js";

// create candidate
export const createCandidateController = async (req, res) => {
  try {
    const { name, party, age, votes, voteCount } = req.body;
    // validators
    if (!name) {
      res.send({ message: "please provide name" });
    }
    if (!party) {
      res.send({ message: "please provide party" });
    }
    if (!age) {
      res.send({ message: "please provide age" });
    }
    // chk user
    const existingCandidate = await candidateModel.findOne({ party });
    if (existingCandidate) {
      return res.status(401).send({
        success: false,
        message: "Candidate Already Available",
      });
    }
    // create candidate
    const candidate = new candidateModel({ name, age, party });
    await candidate.save();
    return res.status(201).send({
      success: true,
      message: "candidate created successfully",
      candidate,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create candidate",
      error,
    });
  }
};
// update candidate controller
export const updateCandidateController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age, party } = req.body;
    const updatedCandidate = await candidateModel.findByIdAndUpdate(
      id,
      {
        name,
        age,
        party,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Candidate Updated Successfully",
      updatedCandidate,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update candidate",
      error,
    });
  }
};
// delete candidate
export const deleteCandidateController = async (req, res) => {
  try {
    const id = req.params.id;
    const candidate = await candidateModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Candidate deleted successfully",
      candidate,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in delete candidate",
      error,
    });
  }
};
// get all candidate
export const getAllCandidateController = async (req, res) => {
  try {
    const candidates = await candidateModel.find({});
    return res.status(200).send({
      success: true,
      message: "Successfully get all candidate list",
      candidates,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getAll candidate",
      error,
    });
  }
};
// vote candidate
export const voteCandidateController = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const userId = req.user.id;

    // find candidate
    const candidate = await candidateModel.findById(candidateId);
    if (!candidate) {
      return res.status(401).send({
        success: false,
        message: "Candidate not found",
      });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "user not available",
      });
    }
    if (user.role == "admin") {
      return res.status(403).json({ message: "admin is not allowed" });
    }
    if (user.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();
    // update is voted
    user.isVoted = true;
    await user.save();

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in vote to candidate",
      error,
    });
  }
};
// vote count
export const voteCountController = async (req, res) => {
  try {
    // Find all candidates and sort them by voteCount in descending order
    const candidate = await candidateModel.find().sort({ voteCount: "desc" });
    // Map candidates to only return name and voteCount
    const voteRecord = candidate.map((data) => {
      return {
        party: data.party,
        voteCount: data.voteCount,
      };
    });
    return res.status(200).send({
      success: true,
      message: "vote count get successfully",
      voteRecord,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get vote count",
      error,
    });
  }
};
