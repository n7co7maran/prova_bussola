import {app} from "./app";

const initServer = () => {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000.");
  });
};

initServer();