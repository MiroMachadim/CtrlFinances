import { TransacaoModel } from "./models/TransacaoModel";

import { TransacaoView } from "./views/TransacaoView";

import { TransacaoController } from "./controllers/TransacaoController";

const transacaoModel = new TransacaoModel();

const transacaoView = new TransacaoView();

const transacaoController = new TransacaoController(transacaoModel, transacaoView);