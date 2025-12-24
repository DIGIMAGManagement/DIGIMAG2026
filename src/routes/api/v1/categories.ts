import { Router } from "express";
import CategoryController from "../../../controllers/category.controller";
import { authenticate } from "../../../middlewares/auth";
import { requireRole } from "../../../middlewares/rbac";

const router = Router();

router.get("/", CategoryController.list);
router.get("/:id", CategoryController.get);

router.post(
  "/",
  authenticate,
  requireRole(["editorial_admin", "super_admin", "writer"]),
  CategoryController.create
);
router.put(
  "/:id",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  CategoryController.update
);
router.delete(
  "/:id",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  CategoryController.remove
);

export default router;
