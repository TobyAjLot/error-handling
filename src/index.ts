import express from "express";
import { AppError } from "./errors/AppError";
import { errorHandler } from "./errors/ErrorHandler";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to home route");
});

app.post("/products", (req, res, next) => {
  const { productToAdd } = req.body;

  try {
    if (!productToAdd) {
      throw new AppError({
        statusCode: 400,
        message: "No product to add",
        logging: true,
        isOperational: true,
        context: { hint: "Check that you're parsing a valid json" },
      });
    }
  } catch (error) {
    next(new AppError());
  }
});

// Error Handling Middleware
app.use(async (err: Error, req: any, res: any, next: (arg0: any) => void) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  const { statusCode, errors } = await errorHandler.handleError(err);
  return res.status(statusCode).send({ errors });
});
app.listen(3000, () => console.log("Server is listening on port 3000..."));
