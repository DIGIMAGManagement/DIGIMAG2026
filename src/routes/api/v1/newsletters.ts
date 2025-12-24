import { Router } from "express";
import NewsletterController from "../../../newsletter/newsletterController";
import NewsletterRoutesController from "../../../controllers/newsletterRoutes.controller";
import { authenticate } from "../../../middlewares/auth";
import { requireRole } from "../../../middlewares/rbac";

const router = Router();

// admin creates newsletter (already in newsletterController)
router.post(
  "/",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  NewsletterController.create
);

// schedule/send
router.post(
  "/:id/schedule",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  NewsletterRoutesController.schedule
);
router.post(
  "/:id/send",
  authenticate,
  requireRole(["editorial_admin", "super_admin"]),
  NewsletterRoutesController.schedule
);

// public tracking endpoints
router.get(
  "/track/open/:newsletterId/:subscriberId",
  NewsletterRoutesController.trackOpen
);
router.get(
  "/track/click/:newsletterId/:subscriberId",
  NewsletterRoutesController.trackClick
);

// subscribe/unsubscribe
router.post("/subscribe", NewsletterController.subscribe);
router.post("/unsubscribe", NewsletterController.unsubscribe);

export default router;
