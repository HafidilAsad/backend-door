import express from "express";
const router = express.Router();

import VisitorController from "../controllers/visitorController.js";

router.get("/visitors", VisitorController.getAll);
router.get("/visitors/:id", VisitorController.getById);
router.post("/visitors", VisitorController.create);
router.put("/visitors/:id", VisitorController.update);
router.delete("/visitors/:id", VisitorController.delete);

export default router;