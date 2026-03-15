export class TransacaoModel {
    constructor(){
        const dataBase = localStorage.getItem('transacao');
        this.transacoes = dataBase ? JSON.parse(dataBase) : [];
    }

    _commit() {
        localStorage.setItem('transacao', JSON.stringify(this.transacoes));
    }

    addTransacao(Categoria, Tipo, Data, Descricao=null){
        const transacao = {
        uniqueId: crypto.randomUUID(),
        categoria: Categoria,
        tipo: Tipo,
        data: Data,
        descricao: Descricao,
        }
        this.transacoes.push(transacao);
        this._commit();
    }
}