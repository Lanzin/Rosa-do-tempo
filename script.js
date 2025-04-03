const broto = document.querySelector('.broto');
const diasElement = document.getElementById('dias');
const horasElement = document.getElementById('horas');
const minutosElement = document.getElementById('minutos');
const segundosElement = document.getElementById('segundos');
const dateSlider = document.getElementById('date-slider');

// Defina a data em que o relacionamento começou (ano, mês (0-11), dia)
const dataInicio = new Date(2024, 10, 15); // Exemplo: 15 de Novembro de 2024

let contadorAtivo = true; // Variável para controlar o estado do contador

function atualizarContador() {
    if (!contadorAtivo) return; // Se o contador não estiver ativo, não atualiza

    const agora = new Date();
    const diferenca = agora.getTime() - dataInicio.getTime();

    const segundosTotais = Math.floor(diferenca / 1000);
    const minutosTotais = Math.floor(segundosTotais / 60);
    const horasTotais = Math.floor(minutosTotais / 60);
    const diasTotais = Math.floor(horasTotais / 24);

    const segundos = segundosTotais % 60;
    const minutos = minutosTotais % 60;
    const horas = horasTotais % 24;

    diasElement.textContent = diasTotais;
    horasElement.textContent = horas < 10 ? '0' + horas : horas;
    minutosElement.textContent = minutos < 10 ? '0' + minutos : minutos;
    segundosElement.textContent = segundos < 10 ? '0' + segundos : segundos;

    // Simulação de crescimento do broto (ajuste os tempos conforme preferir)
    if (diasTotais > 7) {
        broto.classList.add('estagio-1');
    }
    if (diasTotais > 30) {
        broto.classList.add('estagio-2');
    }
    if (diasTotais > 90) {
        broto.classList.add('estagio-3');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    dateSlider.addEventListener('input', () => {
        const value = dateSlider.value;
        const diasTotais = Math.floor(value * 90 / 100); // Converter o valor do slider para dias

        diasElement.textContent = diasTotais;
        horasElement.textContent = '00';
        minutosElement.textContent = '00';
        segundosElement.textContent = '00';

        if (diasTotais < 33) {
            broto.classList.remove('estagio-2', 'estagio-3');
            broto.classList.add('estagio-1');
        } else if (diasTotais < 66) {
            broto.classList.remove('estagio-1', 'estagio-3');
            broto.classList.add('estagio-2');
        } else {
            broto.classList.remove('estagio-1', 'estagio-2');
            broto.classList.add('estagio-3');
        }

        contadorAtivo = false; // Desativar o contador ao mover o slider
    });
});

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);

// Chamada inicial para evitar um "0" inicial por muito tempo
atualizarContador();
