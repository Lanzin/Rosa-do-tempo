const segundosElement = document.getElementById('segundos');
const minutosElement = document.getElementById('minutos');
const horasElement = document.getElementById('horas');
const diasElement = document.getElementById('dias');
const dateSlider = document.getElementById('date-slider');
const mensagemEspecial = document.getElementById('mensagem-especial');
const broto = document.querySelector('.broto'); // Adicionado

// Defina a data em que o relacionamento começou (ano, mês (0-11), dia)
const dataInicio = new Date(2024, 10, 19);

let contadorAtivo = true;

function atualizarContador() {
    if (!contadorAtivo) return;

    const agora = new Date();
    const diferenca = agora.getTime() - dataInicio.getTime();

    const segundosTotais = Math.floor(diferenca / 1000);
    const minutosTotais = Math.floor(segundosTotais / 60);
    const horasTotais = Math.floor(minutosTotais / 60);
    const diasTotais = Math.floor(horasTotais / 24);
    const mesesTotais = Math.floor(diasTotais / 30);

    const segundos = segundosTotais % 60;
    const minutos = minutosTotais % 60;
    const horas = horasTotais % 24;

    diasElement.textContent = diasTotais;
    horasElement.textContent = horas < 10 ? '0' + horas : horas;
    minutosElement.textContent = minutos < 10 ? '0' + minutos : minutos;
    segundosElement.textContent = segundos < 10 ? '0' + segundos : segundos;

    if (mesesTotais >= 12) {
        broto.classList.add('estagio-12');
        mensagemEspecial.style.display = 'block';
    } else {
        broto.className = 'broto estagio-' + (mesesTotais + 1);
        mensagemEspecial.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    dateSlider.addEventListener('input', () => {
        const value = dateSlider.value;
        const diasTotais = Math.floor(value * 365 / 100);
        const mesesTotais = Math.floor(diasTotais / 30);
        const estagio = Math.min(mesesTotais + 1, 12);

        const agora = new Date();
        const maxDiasTotais = Math.floor((agora.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24));

        diasElement.textContent = diasTotais > maxDiasTotais ? maxDiasTotais : diasTotais;
        horasElement.textContent = '00';
        minutosElement.textContent = '00';
        segundosElement.textContent = '00';

        broto.className = 'broto estagio-' + estagio;
        mensagemEspecial.style.display = estagio >= 12 ? 'block' : 'none';

        contadorAtivo = false;
    });
});

setInterval(atualizarContador, 1000);
atualizarContador();
