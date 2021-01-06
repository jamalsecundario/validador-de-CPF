class ValidaCPF{
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    Valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.sequencia()) return false;
        this.geraNovoCpf()

        return this.novoCPF === this.cpfLimpo
    }
    
    geraNovoCpf(){
        const cpfParcial = this.cpfLimpo.slice(0, -2)
        const digito1 = ValidaCPF.criaDigito(cpfParcial)
        const digito2 = ValidaCPF.criaDigito(cpfParcial + digito1)
        this.novoCPF = cpfParcial + digito1 + digito2
        // return novoCPF === this.cpfLimpo
    }
    
    static criaDigito(cpfParcial) {
        let total = 0;
        let reverso = cpfParcial.length + 1;
        
        for(let stringNumerica of cpfParcial) {
            total += reverso * Number(stringNumerica)
            reverso--
        }
        
        const digito = 11 - (total % 11)
        return digito > 9 ? '0' : String(digito)
    }
    
    
    sequencia() {
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    }
}

let resultado = document.querySelector('#resultado')

let forma = document.querySelector('.form')
function total() {

    forma.addEventListener('button', function(e){
        e.preventDefault();
    })   
}
total()

function validar() {    
    let cpfNumber = String(document.querySelector('.cpfNumber').value)

    const Validacpf = new ValidaCPF(cpfNumber) 

    if(Validacpf.Valida()){
        console.log(`CPF Válido`)
        resultado.innerHTML = ''
        resultado.style.backgroundColor = '#89ff0b'
        const p = document.createElement('p')
        p.innerHTML = `${cpfNumber} <br>`
        p.innerHTML += `CPF VÁLIDO`
        resultado.appendChild(p)
    }else{
        console.log(`CPF Inválido`)
        resultado.innerHTML = ''
        resultado.style.backgroundColor = '#ff0000'
        const p = document.createElement('p')
        p.innerHTML = `${cpfNumber} <br>`
        p.innerHTML += `CPF INVÁLIDO`
        resultado.appendChild(p)
    }
}