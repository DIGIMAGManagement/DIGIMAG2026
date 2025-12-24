import { Router } from "express";
import AuthorController from "../../../controllers/author.controller";
import { authenticate } from "../../../middlewares/auth";
import { requireRole } from "../../../middlewares/rbac";

const router = Router();

router.get("/", AuthorController.list);
router.get("/:id", AuthorController.get);

router.post(
  "/",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  AuthorController.create
);
router.put(
  "/:id",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  AuthorController.update
);
router.delete(
  "/:id",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  AuthorController.remove
);

export default router;
