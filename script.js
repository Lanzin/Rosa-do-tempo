const segundosElement = document.getElementById('segundos');
const minutosElement = document.getElementById('minutos');
const horasElement = document.getElementById('horas');
const diasElement = document.getElementById('dias');
const mesesElement = document.getElementById('meses');
const mensagemEspecial = document.getElementById('mensagem-especial');
const broto = document.querySelector('.broto');
const mesesSelect = document.getElementById('meses-select');

const dataInicio = new Date(2024, 10, 19);
let timeoutVoltarAutomatico;

// Função para calcular a diferença entre as datas
function calcularDiferenca(dataInicio, dataAtual) {
    let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
    let meses = dataAtual.getMonth() - dataInicio.getMonth();
    let dias = dataAtual.getDate() - dataInicio.getDate();

    if (dias < 0) {
        meses--;
        let ultimoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0);
        dias += ultimoMes.getDate();
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    return { totalMeses: anos * 12 + meses, dias };
}

// Atualiza o contador real e o estágio do broto
function atualizarContador() {
    const agora = new Date();
    const diferenca = calcularDiferenca(dataInicio, agora);

    mesesElement.textContent = diferenca.totalMeses;
    diasElement.textContent = diferenca.dias;
    horasElement.textContent = '00';
    minutosElement.textContent = '00';
    segundosElement.textContent = '00';

    atualizarBroto(diferenca.totalMeses);
}

// Atualiza o estágio do broto
function atualizarBroto(estagio) {
    if (estagio >= 12) {
        broto.className = 'broto estagio-12';
        mensagemEspecial.style.display = 'block';
    } else {
        broto.className = 'broto estagio-' + (estagio + 1);
        mensagemEspecial.style.display = 'none';
    }
}

// Seleção manual do estágio do broto (dura 10 segundos)
mesesSelect.addEventListener('change', () => {
    clearTimeout(timeoutVoltarAutomatico);
    
    const estagioSelecionado = parseInt(mesesSelect.value);
    atualizarBroto(estagioSelecionado);

    // Após 10 segundos, volta ao modo automático
    timeoutVoltarAutomatico = setTimeout(() => {
        atualizarContador();
    }, 10000);
});

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);
atualizarContador();
