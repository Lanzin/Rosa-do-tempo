const segundosElement = document.getElementById('segundos');
const minutosElement = document.getElementById('minutos');
const horasElement = document.getElementById('horas');
const diasElement = document.getElementById('dias');
const mesesElement = document.getElementById('meses');
const mensagemEspecial = document.getElementById('mensagem-especial');
const broto = document.querySelector('.broto');
const mesesSelect = document.getElementById('meses-select');

const dataInicio = new Date(2024, 10, 19);
let contadorAtivo = true;

// Função para obter horário de Brasília
function obterHorarioBrasilia() {
    let agora = new Date();
    let offset = -3; // UTC-3 para horário de Brasília
    let brasilia = new Date(agora.getTime() + offset * 3600 * 1000);
    return brasilia;
}

// Função para calcular a diferença entre datas
function calcularDiferenca(dataInicio, dataAtual) {
    let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
    let meses = dataAtual.getMonth() - dataInicio.getMonth();
    let dias = dataAtual.getDate() - dataInicio.getDate();
    let horas = dataAtual.getHours();
    let minutos = dataAtual.getMinutes();
    let segundos = dataAtual.getSeconds();

    if (dias < 0) {
        meses--;
        let ultimoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0);
        dias += ultimoMes.getDate();
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    return { totalMeses: anos * 12 + meses, dias, horas, minutos, segundos };
}

// Atualiza o contador real de tempo
function atualizarContador() {
    if (!contadorAtivo) return;

    const agora = obterHorarioBrasilia();
    const diferenca = calcularDiferenca(dataInicio, agora);

    mesesElement.textContent = diferenca.totalMeses;
    diasElement.textContent = diferenca.dias;
    horasElement.textContent = String(diferenca.horas).padStart(2, '0');
    minutosElement.textContent = String(diferenca.minutos).padStart(2, '0');
    segundosElement.textContent = String(diferenca.segundos).padStart(2, '0');

    atualizarBroto(diferenca.totalMeses);
}

// Atualiza o broto conforme o estágio
function atualizarBroto(estagio) {
    if (estagio >= 12) {
        broto.className = 'broto estagio-12';
        mensagemEspecial.style.display = 'block';
    } else {
        broto.className = 'broto estagio-' + (estagio + 1);
        mensagemEspecial.style.display = 'none';
    }
}

// Seleção manual do estágio e congelamento do contador
mesesSelect.addEventListener('change', () => {
    const estagioSelecionado = parseInt(mesesSelect.value);

    if (estagioSelecionado === 0) {
        // Volta para o modo automático
        contadorAtivo = true;
        atualizarContador();
    } else {
        // Pausa o contador e mostra a data correspondente
        contadorAtivo = false;

        let dataFicticia = new Date(dataInicio);
        dataFicticia.setMonth(dataInicio.getMonth() + estagioSelecionado);
        
        let diferenca = calcularDiferenca(dataInicio, dataFicticia);

        mesesElement.textContent = diferenca.totalMeses;
        diasElement.textContent = diferenca.dias;
        horasElement.textContent = '00';
        minutosElement.textContent = '00';
        segundosElement.textContent = '00';

        atualizarBroto(estagioSelecionado);
    }
});

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);
atualizarContador();
