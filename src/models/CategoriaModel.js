export class CategoriaModel {
    constructor() {
        const dataBase = localStorage.getItem('categoria');
        if (dataBase) {
            this.categorias = JSON.parse(dataBase);
        } else {
            this.categorias = [
                { uniqueId: crypto.randomUUID(), nome: "Alimentação", padrao: true },
                { uniqueId: crypto.randomUUID(), nome: "Transporte", padrao: true },
                { uniqueId: crypto.randomUUID(), nome: "Moradia", padrao: true },
                { uniqueId: crypto.randomUUID(), nome: "Saúde", padrao: true },
                { uniqueId: crypto.randomUUID(), nome: "Lazer", padrao: true },
                { uniqueId: crypto.randomUUID(), nome: "Educação", padrao: true },
                { uniqueId: crypto.randomUUID(), nome: "Receita (Salário)", padrao: true },
                { uniqueId: crypto.randomUUID(), nome: "Receita (Outros)", padrao: true }
            ];
            this._commit();
        }
    }

    _commit() {
        localStorage.setItem('categoria', JSON.stringify(this.categorias));
    }

    addCategoria(Nome, Padrao = false) {
        const categoria = {
            uniqueId: crypto.randomUUID(),
            nome: Nome,
            padrao: Padrao
        };
        this.categorias.push(categoria);
        this._commit();
    }

    getCategorias() {
        return this.categorias;
    }
}