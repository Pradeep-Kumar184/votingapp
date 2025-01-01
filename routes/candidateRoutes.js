import express from "express";
import {
  createCandidateController,
  deleteCandidateController,
  getAllCandidateController,
  updateCandidateController,
  voteCandidateController,
  voteCountController,
} from "../controller/candidateController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/createCandidate",
  requireSignIn,
  isAdmin,
  createCandidateController
);
router.get("/getAll", getAllCandidateController);
router.put(
  "/updateCandidate/:id",
  requireSignIn,
  isAdmin,
  updateCandidateController
);
router.delete(
  "/deleteCandidate/:id",
  requireSignIn,
  isAdmin,
  deleteCandidateController
);
router.post("/vote/:candidateId", requireSignIn, voteCandidateController);
router.get("/voteCount", voteCountController);
export default router;
