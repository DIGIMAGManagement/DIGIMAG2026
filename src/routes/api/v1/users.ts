import { Router } from "express";
import UserController from "../../../controllers/user.controller";
import { authenticate } from "../../../middlewares/auth";
import { requireRole } from "../../../middlewares/rbac";

const router = Router();

router.get(
  "/",
  authenticate,
  requireRole(["super_admin", "tech_admin"]),
  UserController.list
);
router.get(
  "/:id",
  authenticate,
  requireRole(["super_admin", "tech_admin"]),
  UserController.get
);
router.put(
  "/:id",
  authenticate,
  requireRole(["super_admin", "tech_admin"]),
  UserController.update
);
router.delete(
  "/:id",
  authenticate,
  requireRole(["super_admin"]),
  UserController.remove
);

export default router;
