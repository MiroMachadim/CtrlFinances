import { TransacaoModel } from "./models/TransacaoModel.js";
import { CategoriaModel } from "./models/CategoriaModel.js";

import { TransacaoView } from "./views/TransacaoView.js";
import { CategoriaView } from "./views/CategoriaView.js";

import { TransacaoController } from "./controllers/TransacaoController.js";
import { CategoriaController } from "./controllers/CategoriaController.js";

import { TransacaoTipo } from "./constants/TransacaoTipo.js";

const transacaoModel = new TransacaoModel();
const categoriaModel = new CategoriaModel();

const transacaoView = new TransacaoView(TransacaoTipo);
const categoriaView = new CategoriaView();

const transacaoController = new TransacaoController(transacaoModel, transacaoView, categoriaModel);
const categoriaController = new CategoriaController(categoriaModel, categoriaView);