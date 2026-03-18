export class TransacaoModel {
    constructor(){
        const dataBase = localStorage.getItem('transacao');
        this.transacoes = dataBase ? JSON.parse(dataBase) : [];
    }

    _commit() {
        localStorage.setItem('transacao', JSON.stringify(this.transacoes));
    }

    addTransacao(Tipo, Categoria, Data, Valor, Descricao=null){
        const transacao = {
        uniqueId: crypto.randomUUID(),
        tipo: Tipo,
        categoria: Categoria,
        data: Data,
        valor: Valor,
        descricao: Descricao,
        }
        this.transacoes.push(transacao);
        this._commit();
    }
}