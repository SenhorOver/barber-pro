import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use("/webhooks", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(cors());
app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
});

app.listen(3333, () => console.log("SERVER ONLINE !!"));
