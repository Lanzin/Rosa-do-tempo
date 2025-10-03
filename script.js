const segundosElement = document.getElementById('segundos');
const minutosElement = document.getElementById('minutos');
const horasElement = document.getElementById('horas');
const diasElement = document.getElementById('dias');
const mesesElement = document.getElementById('meses');
const mensagemEspecial = document.getElementById('mensagem-especial');
const broto = document.querySelector('.broto');
const mesesSelect = document.getElementById('meses-select');
const apressadinhaImg = document.getElementById('apressadinha');

// Data de início: 19/11/2024 (mês começa em 0, então 10 é novembro)
const dataInicio = new Date(2024, 10, 19);
let contadorAtivo = true;

// Função para obter horário local (corrigida)
function obterHorarioBrasilia() {
    // Retorna o horário local do navegador
    return new Date();
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

// Atualiza o broto ou exibe a imagem "Apressadinha"
function atualizarBroto(estagio) {
    if (estagio >= 12) {
        broto.className = 'broto estagio-12';
        mensagemEspecial.style.display = 'block';
    } else {
        broto.className = 'broto estagio-' + (estagio + 1);
        mensagemEspecial.style.display = 'none';
    }
}

// Seleção manual do estágio e controle da imagem "Apressadinha"
mesesSelect.addEventListener('change', () => {
    const estagioSelecionado = parseInt(mesesSelect.value);
    const agora = obterHorarioBrasilia();
    const diferenca = calcularDiferenca(dataInicio, agora);
    const mesAtual = diferenca.totalMeses;

    if (estagioSelecionado === 0) {
        // Volta para o modo automático
        contadorAtivo = true;
        apressadinhaImg.style.display = 'none'; // Esconde a "Apressadinha"
        broto.style.display = 'block'; // Exibe o broto normal
        atualizarContador();
    } else {
        // Pausa o contador e mostra a data correspondente
        contadorAtivo = false;

        let dataFicticia = new Date(dataInicio);
        dataFicticia.setMonth(dataInicio.getMonth() + estagioSelecionado);
        
        let diferencaManual = calcularDiferenca(dataInicio, dataFicticia);

        mesesElement.textContent = diferencaManual.totalMeses;
        diasElement.textContent = diferencaManual.dias;
        horasElement.textContent = '00';
        minutosElement.textContent = '00';
        segundosElement.textContent = '00';

        // Se for acima do mês atual, troca o broto pela "Apressadinha"
        if (estagioSelecionado > mesAtual) {
            broto.style.display = 'none';
            apressadinhaImg.style.display = 'block';
        } else {
            broto.style.display = 'block';
            apressadinhaImg.style.display = 'none';
            atualizarBroto(estagioSelecionado);
        }
    }
});

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);
atualizarContador();
