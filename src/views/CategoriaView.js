export class CategoriaView {
    constructor() {
        this.form = document.getElementById("categoria-form");
        this.inputNome = document.getElementById("categoria-nome");
    }

    getValores(solicitarAdd) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = this.inputNome.value.trim();

            if (nome) {
                solicitarAdd(nome);
                this.inputNome.value = '';
            }
        });
    }
}