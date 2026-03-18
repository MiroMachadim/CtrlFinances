export class TransacaoController{
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.view.getValores(this.solicitarAddTransacao);
    }

    solicitarAddTransacao = (tipo, categoria, data, valor, descricao) => {
        this.model.addTransacao(tipo, categoria, data, valor, descricao);
    }
}