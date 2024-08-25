export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    get data() {
        const data = new Date(this._data.getTime()); //defensive programming
        return data;
    }
    static criaDe(dataStr, quantidadeStr, valorStr) {
        const date = new Date(dataStr.replace('-', ','));
        const qtd = parseInt(quantidadeStr);
        const valor = parseFloat(valorStr);
        return new Negociacao(date, qtd, valor);
    }
}
