import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController{
    private inputData: HTMLInputElement;
    private inputQtd: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor(){
        this.inputData = document.querySelector('#data');
        this.inputQtd = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor')
        this.negociacoesView.update(this.negociacoes);
    }

    criaNegociacao(): Negociacao{
        const exp = /-/g; //pegando todos os hifens
        //fazendo replace(substituindo) em todos os hifens (variavel exp) por vírgula (2° parametro)
        const date = new Date(this.inputData.value.replace(exp, ',')); 
        const qtd = parseInt(this.inputQtd.value);
        const valor = parseFloat(this.inputValor.value);

        return new Negociacao(date, qtd, valor);
    }

    limpaForm(): void{
        this.inputData.value = '';
        this.inputQtd.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    adiciona(): void{
        
        const negociacao = this.criaNegociacao();
        negociacao.data.setDate(12)
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.lista());
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso')
        this.limpaForm();
    }
}