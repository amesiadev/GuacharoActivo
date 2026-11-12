document.addEventListener('DOMContentLoaded', () => {
    // Autocompletar la fecha de hoy por defecto
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fechaInput').value = today;

    document.getElementById('calcularBtn').addEventListener('click', ejecutarCalculo);
});

function ejecutarCalculo() {
    const fechaStr = document.getElementById('fechaInput').value;
    const anteriorStr = document.getElementById('anteriorInput').value.trim();

    if (!fechaStr || !anteriorStr) {
        alert('Por favor, ingresa la fecha y el resultado anterior.');
        return;
    }

    // Procesar fecha formato DDMMYY o YYYY-MM-DD
    const partesFecha = fechaStr.split('-'); // [YYYY, MM, DD]
    const anioCorto = partesFecha[0].slice(-2);
    const mes = partesFecha[1];
    const dia = partesFecha[2];
    
    // Base numérica: DD + MM + YY + Anteriormenente salido
    let baseString = `${dia}${mes}${anioCorto}${anteriorStr}`.replace(/\D/g, '');
    let fila = baseString.split('').map(Number);

    let piramideHTML = '';
    let filasPiramide = [fila.join('   ')];

    // Construcción de la pirámide numérica
    while (fila.length > 2) {
        let nuevaFila = [];
        for (let i = 0; i < fila.length - 1; i++) {
            let suma = fila[i] + fila[i + 1];
            nuevaFila.push(suma % 10); // Conservar solo la unidad
        }
        fila = nuevaFila;
        // Agregar espacios para formatear visualmente en bloque centrado
        let espacios = ' '.repeat(filasPiramide.length * 2);
        filasPiramide.push(espacios + fila.join('   '));
    }

    piramideHTML = filasPiramide.join('\n');
    
    // Reducción final (últimos dos números de la cúspide)
    let ultimaFila = fila;
    let reduccion = ultimaFila.join('');
    let sumaFinal = ultimaFila.reduce((a, b) => a + b, 0);
    let reduccionUnidad = sumaFinal >= 10 ? (sumaFinal % 10 + Math.floor(sumaFinal / 10)) : sumaFinal;

    document.getElementById('piramideOutput').textContent = piramideHTML;
    document.getElementById('reduccionFinal').textContent = `Reducción base cierre: ${reduccion} (Suma total: ${sumaFinal})`;

    // Ley de Atracción basada en el número anterior
    const numAnterior = parseInt(anteriorStr, 10);
    const espejo = parseInt(anteriorStr.split('').reverse().join(''), 10);
    const sumaDigitos = numAnterior < 10 ? numAnterior : Math.floor(numAnterior / 10) + (numAnterior % 10);
    
    const atraccionList = document.getElementById('atraccionList');
    atraccionList.innerHTML = `
        <li><strong>Espejo (Inverso):</strong> ${espejo < 10 ? '0' + espejo : espejo}</li>
        <li><strong>Suma de dígitos:</strong> ${sumaDigitos < 10 ? '0' + sumaDigitos : sumaDigitos}</li>
        <li><strong>Terminales afines (${numAnterior % 10}):</strong> ${numAnterior % 10}, ${10 + (numAnterior % 10)}, ${20 + (numAnterior % 10)}</li>
    `;

    // Selección Final combinada dentro del rango 00-75
    let principal = espejo <= 75 ? (espejo < 10 ? '0' + espejo : espejo) : (reduccion <= 75 ? reduccion : '32');
    
    document.getElementById('finalOutput').innerHTML = `
        Número Principal: <strong>${principal}</strong><br>
        <span style="font-size: 0.85rem; font-weight: normal;">(Respaldado por simetría de espejo y pirámide)</span>
    `;

    document.getElementById('resultados').classList.remove('hidden');
}
