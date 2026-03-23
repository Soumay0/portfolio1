const dotenv = require("dotenv");
const app = require("./src/app");
const connectDatabase = require("./src/config/database");

dotenv.config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Portfolio API running on http://localhost:${port}`);
  });
}

bootstrap();
