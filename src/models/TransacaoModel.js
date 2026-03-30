export class TransacaoModel {
    constructor() {
        const dataBase = localStorage.getItem('transacao');
        this.transacoes = dataBase ? JSON.parse(dataBase) : [];
    }

    _commit() {
        localStorage.setItem('transacao', JSON.stringify(this.transacoes));
    }

    addTransacao(Tipo, Categoria, Data, Valor, Descricao = "") {
        const transacao = {
            uniqueId: crypto.randomUUID(),
            tipo: Tipo,
            categoria: Categoria,
            data: Data,
            valor: parseFloat(Valor),
            descricao: Descricao
        };
        this.transacoes.push(transacao);
        this._commit();
    }

    getTransacoes() {
        return [...this.transacoes].sort((a, b) => new Date(b.data) - new Date(a.data));
    }

    getSaldoTotal() {
        return this.transacoes.reduce((acc, t) => {
            return t.tipo === 'receita' ? acc + t.valor : acc - t.valor;
        }, 0);
    }

    getResumoMensal() {
        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();

        return this.transacoes.reduce((acc, t) => {
            const dataT = new Date(t.data + 'T00:00:00');
            if (dataT.getMonth() === mesAtual && dataT.getFullYear() === anoAtual) {
                if (t.tipo === 'receita') acc.receitas += t.valor;
                else acc.despesas += t.valor;
            }
            return acc;
        }, { receitas: 0, despesas: 0 });
    }

    getDespesasPorCategoria() {
        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();

        const grupos = this.transacoes
            .filter(t => {
                const dataT = new Date(t.data + 'T00:00:00');
                return t.tipo === 'despesa' && dataT.getMonth() === mesAtual && dataT.getFullYear() === anoAtual;
            })
            .reduce((acc, t) => {
                acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
                return acc;
            }, {});

        return {
            labels: Object.keys(grupos),
            values: Object.values(grupos)
        };
    }
}