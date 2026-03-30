export class TransacaoController {
    constructor(model, view, categoriaModel) {
        this.model = model;
        this.view = view;
        this.categoriaModel = categoriaModel;

        this.view.iniciarSelectTipos();
        this.view.iniciarSelectCategorias(this.categoriaModel.getCategorias());
        
        this.view.getValores(this.solicitarAddTransacao, this.atualizarUI);
        
        this.atualizarUI();
    }

    solicitarAddTransacao = (tipo, categoria, data, valor, descricao) => {
        this.model.addTransacao(tipo, categoria, data, valor, descricao);
    }

    atualizarUI = () => {
        const transacoes = this.model.getTransacoes();
        const saldo = this.model.getSaldoTotal();
        const resumo = this.model.getResumoMensal();
        const dadosGrafico = this.model.getDespesasPorCategoria();

        this.view.renderizarLista(transacoes);
        this.view.renderizarDashboard(saldo, resumo);
        this.view.renderizarGrafico(dadosGrafico);
    }
}