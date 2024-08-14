// routes/searchRoutes.ts

import { Router } from "express";
import { query } from "express-validator";
import searchController from "../controllers/searchController";

const router = Router();

// Define the search route
router.get(
  "/search",
  [query("query").isString().withMessage("Query must be a string")],
  searchController.search
);

export default router;
