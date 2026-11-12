document.addEventListener('DOMContentLoaded', () => {
    // Autocompletar la fecha de hoy por defecto
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fechaInput').value = today;

    document.getElementById('calcularBtn').addEventListener('click', ejecutarCalculo);
});

function ejecutarCalculo() {
    const fechaStr = document.getElementById('fechaInput').value;
    const horaSorteo = document.getElementById('horaInput').value;
    const anteriorStr = document.getElementById('anteriorInput').value.trim();

    if (!fechaStr || !anteriorStr) {
        alert('Por favor, ingresa la fecha y el resultado anterior.');
        return;
    }

    // 1. Procesar fecha (DDMMAA) y unir con resultado anterior
    const partesFecha = fechaStr.split('-'); // [YYYY, MM, DD]
    const anioCorto = partesFecha[0].slice(-2);
    const mes = partesFecha[1];
    const dia = partesFecha[2];
    
    // Base de la pirámide: Fecha + Anterior
    let baseString = `${dia}${mes}${anioCorto}${anteriorStr}`.replace(/\D/g, '');
    let fila = baseString.split('').map(Number);

    let filasPiramide = [fila.join(' ')];

    // Construcción iterativa de la pirámide numérica
    while (fila.length > 2) {
        let nuevaFila = [];
        for (let i = 0; i < fila.length - 1; i++) {
            let suma = fila[i] + fila[i + 1];
            nuevaFila.push(suma % 10); // Solo la unidad
        }
        fila = nuevaFila;
        filasPiramide.push(fila.join(' '));
    }

    let piramideHTML = filasPiramide.join('\n');
    let ultimaDecena = parseInt(fila.join(''), 10);

    document.getElementById('piramideOutput').textContent = piramideHTML;
    document.getElementById('reduccionFinal').textContent = `Cierre de pirámide: ${ultimaDecena < 10 ? '0' + ultimaDecena : ultimaDecena}`;

    // 2. Ley de Atracción (Jaladera)
    const numAnterior = parseInt(anteriorStr, 10);
    const espejoStr = anteriorStr.split('').reverse().join('');
    const espejo = parseInt(espejoStr, 10);
    const terminal = numAnterior % 10;

    const atraccionList = document.getElementById('atraccionList');
    atraccionList.innerHTML = `
        <li><strong>Espejo directo:</strong> ${espejo < 10 ? '0' + espejo : espejo}</li>
        <li><strong>Terminal afín (${terminal}):</strong> ${terminal < 10 ? '0' + terminal : terminal}, ${10 + terminal}, ${20 + terminal}</li>
    `;

    // 3. Selección dentro del rango válido 00 - 75 de Guácharo Activo
    let principal = espejo;
    if (principal > 75) {
        principal = ultimaDecena <= 75 ? ultimaDecena : numAnterior;
    }
    const principalStr = principal < 10 ? '0' + principal : principal;

    // Mostrar resultados en pantalla
    document.getElementById('lblHoraSorteo').textContent = horaSorteo;
    document.getElementById('finalOutput').innerHTML = `
        Número Principal: <strong>${principalStr}</strong><br>
        <span style="font-size: 0.85rem; font-weight: normal;">(Atracción y validación en rango 00-75)</span>
    `;

    document.getElementById('resultados').classList.remove('hidden');
}
