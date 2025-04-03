const broto = document.querySelector('.broto');
const diasElement = document.getElementById('dias');
const horasElement = document.getElementById('horas');
const minutosElement = document.getElementById('minutos');
const segundosElement = document.getElementById('segundos');

// Defina a data em que o relacionamento começou (ano, mês (0-11), dia)
const dataInicio = new Date(2024, 10, 15); // Exemplo: 15 de Novembro de 2024

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora.getTime() - dataInicio.getTime(2024, 09, 19);

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
    const broto = document.querySelector('.broto');
    const dateSlider = document.getElementById('date-slider');

    dateSlider.addEventListener('input', () => {
        const value = dateSlider.value;

        if (value < 33) {
            broto.classList.remove('estagio-2', 'estagio-3');
            broto.classList.add('estagio-1');
        } else if (value < 66) {
            broto.classList.remove('estagio-1', 'estagio-3');
            broto.classList.add('estagio-2');
        } else {
            broto.classList.remove('estagio-1', 'estagio-2');
            broto.classList.add('estagio-3');
        }
    });
});
// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);

// Chamada inicial para evitar um "0" inicial por muito tempo
atualizarContador(1000);

