// controllers/SearchController.ts

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import searchService from "../services/searchService";
class SearchController {
  public async search(req: Request, res: Response): Promise<Response> {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const query = req.query.query as string;

      if (!query) {
        return res.status(400).json({
          isSuccessful: false,
          message: "Query parameter is required",
        });
      }

      console.log(`Searching for query: ${query}`); // Add this line to debug
      const results = await searchService.search(query);

      return res.json({
        isSuccessful: true,
        data: results,
      });
    } catch (error) {
      console.error(`Error occurred: ${(error as any).message}`); // Add this line to debug
      return res.status(500).json({
        isSuccessful: false,
        message: "An error occurred while searching",
        error: (error as any).message,
      });
    }
  }
}

export default new SearchController();
