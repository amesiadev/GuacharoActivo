// Tabla oficial de animalitos de Guácharo Activo (00 al 75)
const animalitosMap = {
    "0": "Delfín", "00": "Delfín", "1": "Carnero", "2": "Toro", "3": "Ciempiés", 
    "4": "Alacrán", "5": "León", "6": "Ratón", "7": "Calamar", "8": "Iguana", 
    "9": "Búfalo", "10": "Ballena", "11": "Tigre", "12": "Burro", "13": "Cabra", 
    "14": "Mono", "15": "Paloma", "16": "Zorro", "17": "Oso", "18": "Pavo", 
    "19": "Águila", "20": "Cochino", "21": "Gallo", "22": "Camello", "23": "Cebra", 
    "24": "Iguana", "25": "Gallina", "26": "Vaca", "27": "Perro", "28": "Zamuro", 
    "29": "Elefante", "30": "Caimán", "31": "Lapa", "32": "Ardilla", "33": "Pescado", 
    "34": "Venado", "35": "Jirafas", "36": "Culebra", "37": "Tortuga", "38": "Tiburón", 
    "39": "Pantera", "40": "Conejo", "41": "Leopardo", "42": "Becerro", "43": "Tucán", 
    "44": "Caballo", "45": "Oso Hormiguero", "46": "Camaleón", "47": "Tigrito", "48": "Gaceta", 
    "49": "Elefancito", "50": "Culebrita", "51": "Zorrillo", "52": "Loro", "53": "Cotorra", 
    "54": "Hormiga", "55": "Oso Pardo", "56": "León Marino", "57": "Tigre de Bengala", "58": "Cisne", 
    "59": "Flamenco", "60": "Pato", "61": "Búho", "62": "Halcón", "63": "Guacamaya", 
    "64": "Colibrí", "65": "Canario", "66": "Cardenal", "67": "Gaviota", "68": "Pelícano", 
    "69": "Cigüeña", "70": "Zorzal", "71": "Golondrina", "72": "Ruiseñor", "73": "Gorrión", 
    "74": "Halcón Peregrino", "75": "Zamuro Real"
};

function obtenerNombreAnimalito(num) {
    let limpio = parseInt(num, 10).toString();
    if (num.toString().trim() === '00' || limpio === '0') return "Delfín";
    let strKey = num < 10 && !num.toString().startsWith('0') ? '0' + num : num.toString().trim();
    if (strKey.length === 1) strKey = '0' + strKey;
    return animalitosMap[strKey] || animalitosMap[limpo] || "Desconocido";
}

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fechaInput').value = today;
    document.getElementById('calcularBtn').addEventListener('click', ejecutarCalculo);
});

function ejecutarCalculo() {
    const fechaStr = document.getElementById('fechaInput').value;
    const horaSorteo = document.getElementById('horaInput').value;
    const inputCrudo = document.getElementById('anteriorInput').value.trim();

    if (!fechaStr || !inputCrudo) {
        alert('Por favor, ingresa la fecha y el animalito anterior.');
        return;
    }

    const numAnteriorStr = inputCrudo.replace(/\D/g, '');
    if (!numAnteriorStr) {
        alert('Ingresa un número válido para el resultado anterior.');
        return;
    }

    const numAnterior = parseInt(numAnteriorStr, 10);
    const formatoAnterior = numAnterior < 10 ? '0' + numAnterior : numAnterior.toString();

    // 1. Pirámide
    const partesFecha = fechaStr.split('-');
    const anioCorto = partesFecha[0].slice(-2);
    const mes = partesFecha[1];
    const dia = partesFecha[2];
    
    let baseString = `${dia}${mes}${anioCorto}${numAnteriorStr}`;
    let fila = baseString.split('').map(Number);
    let filasPiramide = [fila.join(' ')];

    while (fila.length > 2) {
        let nuevaFila = [];
        for (let i = 0; i < fila.length - 1; i++) {
            let suma = fila[i] + fila[i + 1];
            nuevaFila.push(suma % 10);
        }
        fila = nuevaFila;
        filasPiramide.push(fila.join(' '));
    }

    let piramideHTML = filasPiramide.join('\n');
    let cierrePiramide = parseInt(fila.join(''), 10);
    if (cierrePiramide > 75) cierrePiramide = cierrePiramide % 100;
    if (cierrePiramide > 75) cierrePiramide = Math.floor(cierrePiramide / 10);
    let cierreFormat = cierrePiramide < 10 ? '0' + cierrePiramide : cierrePiramide;

    document.getElementById('piramideOutput').textContent = piramideHTML;
    document.getElementById('reduccionFinal').textContent = `Cierre de pirámide: ${cierreFormat} — ${obtenerNombreAnimalito(cierrePiramide)}`;

    // 2. Ley de Atracción (Jaladera)
    const espejoStr = numAnteriorStr.split('').reverse().join('');
    let espejo = parseInt(espejoStr, 10);
    if (espejo > 75) espejo = numAnterior > 75 ? 23 : numAnterior;
    let espejoFormat = espejo < 10 ? '0' + espejo : espejo;

    const terminal = numAnterior % 10;
    let jalaNum1 = terminal;
    let jalaNum2 = terminal + 10 <= 75 ? terminal + 10 : terminal + 20;
    if (jalaNum2 > 75) jalaNum2 = terminal;

    let jala1Format = jalaNum1 < 10 ? '0' + jalaNum1 : jalaNum1;
    let jala2Format = jalaNum2 < 10 ? '0' + jalaNum2 : jalaNum2;

    const atraccionList = document.getElementById('atraccionList');
    atraccionList.innerHTML = `
        <li><strong>Espejo / Reverso:</strong> <code>${espejoFormat}</code> (${obtenerNombreAnimalito(espejo)}) — <em>Porque invierte los dígitos del resultado anterior (${formatoAnterior}).</em></li>
        <li><strong>Jaladera por Terminal (${terminal}):</strong> <code>${jala1Format}</code> (${obtenerNombreAnimalito(jalaNum1)}) y <code>${jala2Format}</code> (${obtenerNombreAnimalito(jalaNum2)}) — <em>Porque arrastran la misma terminal numérica del sorteo previo.</em></li>
    `;

    // 3. Selección Final (Jugada Maestra)
    let jugadaPrincipal = espejo;
    let motivoPrincipal = `Espejo directo del ${formatoAnterior}`;
    
    if (jugadaPrincipal === numAnterior) {
        jugadaPrincipal = cierrePiramide;
        motivoPrincipal = `Cierre directo de la pirámide numérica`;
    }
    let principalFormat = jugadaPrincipal < 10 ? '0' + jugadaPrincipal : jugadaPrincipal;

    document.getElementById('lblHoraSorteo').textContent = horaSorteo;
    document.getElementById('finalOutput').innerHTML = `
        <div style="font-size: 1.4rem; color: var(--accent); margin-bottom: 6px;">${principalFormat} — ${obtenerNombreAnimalito(jugadaPrincipal).toUpperCase()}</div>
        <div style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">Fundamento: ${motivoPrincipal} cruzado con la base de la fecha.</div>
    `;

    document.getElementById('resultados').classList.remove('hidden');
}
