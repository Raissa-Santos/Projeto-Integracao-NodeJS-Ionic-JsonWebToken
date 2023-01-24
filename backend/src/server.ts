import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import * as dotenv from "dotenv";

const PORT = process.env.PORT || 3333;

var cors = require('cors')

const app = express();

/*
autorizar para um link especifico 

var corsOptions = {
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

*/
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(routes);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT as number, () =>
      console.log(`Listening on all interfaces:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
