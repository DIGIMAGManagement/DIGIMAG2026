import { Router } from "express";
import TagController from "../../../controllers/tag.controller";
import { authenticate } from "../../../middlewares/auth";
import { requireRole } from "../../../middlewares/rbac";

const router = Router();

router.get("/", TagController.list);
router.get("/:id", TagController.get);

router.post(
  "/",
  authenticate,
  requireRole(["editorial_admin", "super_admin", "writer"]),
  TagController.create
);
router.put(
  "/:id",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  TagController.update
);
router.delete(
  "/:id",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  TagController.remove
);

export default router;
