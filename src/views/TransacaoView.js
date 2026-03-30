export class TransacaoView {
    constructor(transacaoTipo) {
        this.form = document.getElementById("transacao-form");
        this.inputTipo = document.getElementById("transacao-tipo");
        this.inputCategoria = document.getElementById("transacao-categoria");
        this.inputData = document.getElementById("transacao-data");
        this.inputValor = document.getElementById("transacao-valor");
        this.inputDescricao = document.getElementById("transacao-descricao");
        this.listaTbody = document.getElementById("lista-transacoes-tbody");

        this.resumoSaldo = document.getElementById("resumo-saldo");
        this.resumoReceitas = document.getElementById("resumo-receitas");
        this.resumoDespesas = document.getElementById("resumo-despesas");
        
        this.ctxGrafico = document.getElementById("grafico-categorias");
        this.chartInstance = null;

        this.tipoTransacao = transacaoTipo;
    }

    iniciarSelectTipos() {
        this.inputTipo.innerHTML = '<option value="">Selecione...</option>';
        Object.values(this.tipoTransacao).forEach(tipo => {
            const option = document.createElement("option");
            option.value = tipo;
            option.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
            this.inputTipo.appendChild(option);
        });
    }

    iniciarSelectCategorias(categorias) {
        this.inputCategoria.innerHTML = '<option value="Outros">Selecione...</option>';
        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.nome;
            option.textContent = categoria.nome;
            this.inputCategoria.appendChild(option);
        });
    }

    getValores(solicitarAdd, atualizarUI) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const tipo = this.inputTipo.value;
            const categoria = this.inputCategoria.value;
            const data = this.inputData.value;
            const valor = this.inputValor.value;
            const descricao = this.inputDescricao.value.trim();

            if (tipo && data && valor) {
                solicitarAdd(tipo, categoria, data, valor, descricao);
                this.form.reset();
                atualizarUI();
            }
        });
    }

    renderizarDashboard(saldo, resumoMensal) {
        this.resumoSaldo.textContent = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        this.resumoSaldo.className = saldo >= 0 ? 'fw-bold text-dark' : 'fw-bold text-danger';
        
        this.resumoReceitas.textContent = resumoMensal.receitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        this.resumoDespesas.textContent = resumoMensal.despesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    renderizarGrafico(dados) {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        if (dados.labels.length === 0) return;

        this.chartInstance = new Chart(this.ctxGrafico, {
            type: 'doughnut',
            data: {
                labels: dados.labels,
                datasets: [{
                    data: dados.values,
                    backgroundColor: [
                        '#0d6efd', '#6610f2', '#6f42c1', '#d63384', 
                        '#dc3545', '#fd7e14', '#ffc107', '#198754'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    renderizarLista(transacoes) {
        this.listaTbody.innerHTML = '';
        transacoes.slice(0, 5).forEach(transacao => {
            const dataF = new Date(transacao.data + 'T00:00:00').toLocaleDateString('pt-BR');
            const valorF = transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="small">${dataF}</td>
                <td><span class="badge bg-light text-dark border">${transacao.categoria}</span></td>
                <td class="text-truncate" style="max-width: 150px;">${transacao.descricao || '-'}</td>
                <td class="text-end fw-medium ${transacao.tipo === 'receita' ? 'text-success' : 'text-danger'}">
                    ${transacao.tipo === 'receita' ? '+' : '-'} ${valorF}
                </td>
            `;
            this.listaTbody.appendChild(tr);
        });
    }
}