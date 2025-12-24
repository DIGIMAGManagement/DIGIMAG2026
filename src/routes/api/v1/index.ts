import { Router } from "express";
import articles from "./articles";
import auth from "./auth";
import categories from "./categories";
import tags from "./tags";
import authors from "./authors";
import users from "./users";
import newsletters from "./newsletters";

const router = Router();

router.use("/articles", articles);
router.use("/auth", auth);
router.use("/categories", categories);
router.use("/tags", tags);
router.use("/authors", authors);
router.use("/users", users);
router.use("/newsletters", newsletters);

export default router;
