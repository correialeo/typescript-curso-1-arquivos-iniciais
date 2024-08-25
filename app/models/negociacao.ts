export class Negociacao{
    
    constructor(
        private _data: Date,
        public readonly quantidade: number, 
        public readonly valor: number) {}


    get volume(): number{
        return this.quantidade * this.valor;
    }

    get data(): Date{
        const data = new Date(this._data.getTime()); //defensive programming
        return data;
    }

    public static criaDe(dataStr: string, quantidadeStr: string, valorStr: string): Negociacao{
        const date = new Date(dataStr.replace('-', ',')); 
        const qtd = parseInt(quantidadeStr);
        const valor = parseFloat(valorStr);

        return new Negociacao(date, qtd, valor);
    }
}