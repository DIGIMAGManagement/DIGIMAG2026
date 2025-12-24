import { Router } from "express";
import ArticleController from "../../../controllers/article.controller";
import { authenticate } from "../../../middlewares/auth";
import { requireRole } from "../../../middlewares/rbac";

const router = Router();

// Public list and get
router.get("/", ArticleController.list);
router.get("/:id", ArticleController.get);

// Admin routes
router.post(
  "/",
  authenticate,
  requireRole(["editorial_admin", "super_admin", "writer"]),
  ArticleController.create
);
router.put(
  "/:id",
  authenticate,
  requireRole(["editorial_admin", "super_admin", "writer"]),
  ArticleController.update
);
router.delete(
  "/:id",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  ArticleController.remove
);

export default router;
