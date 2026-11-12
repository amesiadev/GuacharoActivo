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
    // Manejo de ceros a la izquierda (00-09)
    if (num.toString().trim() === '00') return "Delfín";
    if (num < 10 && num.toString().startsWith('0')) {
        let key = num.toString().trim();
        return animalitosMap[key] || "Desconocido";
    }
    let strKey = num < 10 ? '0' + num : num.toString();
    return animalitosMap[strKey] || animalitosMap[num.toString()] || "Desconocido";
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

    // Extraer solo los dígitos del input anterior (ej. "23 Cebra" -> "23")
    const numAnteriorStr = inputCrudo.replace(/\D/g, '');
    if (!numAnteriorStr) {
        alert('Ingresa un número válido para el resultado anterior.');
        return;
    }

    const numAnterior = parseInt(numAnteriorStr, 10);
    const animalAnteriorNombre = obtenerNombreAnimalito(numAnterior);

    // 1. Procesar fecha (DDMMAA) y unir con el número anterior
    const partesFecha = fechaStr.split('-'); // [YYYY, MM, DD]
    const anioCorto = partesFecha[0].slice(-2);
    const mes = partesFecha[1];
    const dia = partesFecha[2];
    
    let baseString = `${dia}${mes}${anioCorto}${numAnteriorStr}`;
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
    let cierrePiramide = parseInt(fila.join(''), 10);
    // Ajuste al rango de la lotería (0-75) si se pasa
    let animalPiramide = cierrePiramide > 75 ? cierrePiramide % 100 : cierrePiramide;
    if (animalPiramide > 75) animalPiramide = Math.floor(animalPiramide / 10);
    let animalPiramideStr = animalPiramide < 10 ? '0' + animalPiramide : animalPiramide;

    document.getElementById('piramideOutput').textContent = piramideHTML;
    document.getElementById('reduccionFinal').textContent = `Cierre de pirámide: ${animalPiramideStr} (${obtenerNombreAnimalito(animalPiramide)})`;

    // 2. Ley de Atracción (Jaladera)
    const espejoStr = numAnteriorStr.split('').reverse().join('');
    let espejo = parseInt(espejoStr, 10);
    if (espejo > 75) espejo = numAnterior; // Resguardo si el espejo sale de tabla
    const espejoFormat = espejo < 10 ? '0' + espejo : espejo;

    const terminal = numAnterior % 10;
    // Buscar un par de jaladeras con el mismo terminal dentro del rango 00-75
    let jala1 = terminal < 10 ? '0' + terminal : terminal;
    let jala2 = (10 + terminal <= 75) ? (10 + terminal) : terminal;

    const atraccionList = document.getElementById('atraccionList');
    atraccionList.innerHTML = `
        <li><strong>Espejo / Reverso:</strong> ${espejoFormat} — ${obtenerNombreAnimalito(espejo)}</li>
        <li><strong>Jaladera por Terminal (${terminal}):</strong> ${jala1} (${obtenerNombreAnimalito(jala1)}) y ${jala2} (${obtenerNombreAnimalito(jala2)})</li>
    `;

    // 3. Selección Final / Jugada Maestra (Combinando Espejo y Cierre Pirámide en rango 00-75)
    let jugadaPrincipal = espejo;
    if (jugadaPrincipal > 75 || jugadaPrincipal === numAnterior) {
        jugadaPrincipal = animalPiramide;
    }
    let principalFormat = jugadaPrincipal < 10 ? '0' + jugadaPrincipal : jugadaPrincipal;
    let nombrePrincipal = obtenerNombreAnimalito(jugadaPrincipal);

    // Mostrar resultados en pantalla
    document.getElementById('lblHoraSorteo').textContent = horaSorteo;
    document.getElementById('finalOutput').innerHTML = `
        Animalito Fijo: <span style="color: var(--accent);">${principalFormat} - ${nombrePrincipal.toUpperCase()}</span>
    `;

    document.getElementById('resultados').classList.remove('hidden');
}
