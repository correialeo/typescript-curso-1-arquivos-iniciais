import { DiasDaSemana } from "../enums/dias-da-semana.js";
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

    private criaNegociacao(): Negociacao{
        const date = new Date(this.inputData.value.replace('-', ',')); 
        const qtd = parseInt(this.inputQtd.value);
        const valor = parseFloat(this.inputValor.value);

        return new Negociacao(date, qtd, valor);
    }

    public adiciona(): void{
        const negociacao = this.criaNegociacao();

        if(!this.eDiaUtil(negociacao.data)){
            this.mensagemView.update('Negociações só são aceitas em dias úteis');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limpaForm();
        this.atualizaView();
        
    }

    private eDiaUtil(date: Date){
        return date.getDay() > DiasDaSemana.DOMINGO && 
               date.getDay() < DiasDaSemana.SABADO;
    }

    private limpaForm(): void{
        this.inputData.value = '';
        this.inputQtd.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }    
    
    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso')
    }
}