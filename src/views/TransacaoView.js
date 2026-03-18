export class TransacaoView {
    constructor(){
        this.form = document.getElementById("transacao-form");
        this.inputTipo = document.getElementById("transacao-tipo")
        this.inputCategoria = document.getElementById("transacao-categoria");
        this.inputData = document.getElementById("transacao-data");
        this.inputValor = document.getElementById("transacao-valor")
        this.inputDescricao = document.getElementById("transacao-descricao");
    }

    getValores(solicitarAdd){
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const tipo = this.inputTipo.value.trim();
            const categoria = this.inputCategoria.value.trim();
            const data = this.inputData.value.trim();
            const valor = this.inputValor.value;
            const descricao = this.inputDescricao.value.trim();

            if (tipo && categoria && data && valor){
                solicitarAdd(tipo, categoria, data, descricao);

                this.inputTipo.value = '';
                this.inputCategoria.value = '';
                this.inputData.value = '';
                this.inputValor.value = '';
                this.inputDescricao = '';
            }
        });
    }
}