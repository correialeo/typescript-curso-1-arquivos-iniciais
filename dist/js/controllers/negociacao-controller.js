import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQtd = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    criaNegociacao() {
        const exp = /-/g; //pegando todos os hifens
        //fazendo replace(substituindo) em todos os hifens (variavel exp) por vírgula (2° parametro)
        const date = new Date(this.inputData.value.replace(exp, ','));
        const qtd = parseInt(this.inputQtd.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, qtd, valor);
    }
    limpaForm() {
        this.inputData.value = '';
        this.inputQtd.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    adiciona() {
        const negociacao = this.criaNegociacao();
        negociacao.data.setDate(12);
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.lista());
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
        this.limpaForm();
    }
}
