import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView', true);
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQtd = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQtd.value, this.inputValor.value);
        if (!this.eDiaUtil(negociacao.data)) {
            this.mensagemView.update('Negociações só são aceitas em dias úteis');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limpaForm();
        this.atualizaView();
    }
    eDiaUtil(date) {
        return date.getDay() > DiasDaSemana.DOMINGO &&
            date.getDay() < DiasDaSemana.SABADO;
    }
    limpaForm() {
        this.inputData.value = '';
        this.inputQtd.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
