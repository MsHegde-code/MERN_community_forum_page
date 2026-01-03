import app from "./app.js";
import { dbConnection } from "./config/db.js";

const PORT = 5000;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
