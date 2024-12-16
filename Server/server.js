import { configDotenv } from "dotenv";
configDotenv();
import app from "./app.js";
import { connectDB } from "./db/dbConfig.js";

connectDB();

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});