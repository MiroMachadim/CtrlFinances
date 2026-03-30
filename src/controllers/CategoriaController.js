export class CategoriaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.getValores(this.solicitarAddCategoria);
    }

    solicitarAddCategoria = (nome) => {
        this.model.addCategoria(nome);
    }
}