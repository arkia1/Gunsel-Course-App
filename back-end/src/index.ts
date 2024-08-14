import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import { Request, Response } from "express";
import routes from "./routes";
import sequelize from "./config/db";
import searchRoutes from "./routes/searchRoute";

const app = express();

app.use(cors());

app.use(bodyparser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

// http://localhost:3000/api/
app.use("/api", routes, searchRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    sequelize
      .sync({ alter: true })
      .then(
        () => {
          console.log("Database & tables created!");
          app.listen(3000, () => {
            console.log("Server started & listening port 3000");
          });
        },
        (err) => {
          console.error("An error occurred while creating the table:", err);
        }
      )
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
