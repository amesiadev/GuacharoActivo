// Tabla Oficial Exacta de Guácharo Activo (0, 00 hasta el 75)
const listaAnimalitos = [
    { num: "0", nombre: "Delfín" },
    { num: "00", nombre: "Ballena" },
    { num: "01", nombre: "Carnero" },
    { num: "02", nombre: "Toro" },
    { num: "03", nombre: "Ciempiés" },
    { num: "04", nombre: "Alacrán" },
    { num: "05", nombre: "León" },
    { num: "06", nombre: "Rana" },
    { num: "07", nombre: "Perico" },
    { num: "08", nombre: "Ratón" },
    { num: "09", nombre: "Águila" },
    { num: "10", nombre: "Tigre" },
    { num: "11", nombre: "Gato" },
    { num: "12", nombre: "Caballo" },
    { num: "13", nombre: "Mono" },
    { num: "14", nombre: "Paloma" },
    { num: "15", nombre: "Zorro" },
    { num: "16", nombre: "Oso" },
    { num: "17", nombre: "Pavo" },
    { num: "18", nombre: "Burro" },
    { num: "19", nombre: "Chivo" },
    { num: "20", nombre: "Cochino" },
    { num: "21", nombre: "Gallo" },
    { num: "22", nombre: "Camello" },
    { num: "23", nombre: "Cebra" },
    { num: "24", nombre: "Iguana" },
    { num: "25", nombre: "Gallina" },
    { num: "26", nombre: "Vaca" },
    { num: "27", nombre: "Perro" },
    { num: "28", nombre: "Zamuro" },
    { num: "29", nombre: "Elefante" },
    { num: "30", nombre: "Caimán" },
    { num: "31", nombre: "Lapa" },
    { num: "32", nombre: "Ardilla" },
    { num: "33", nombre: "Pescado" },
    { num: "34", nombre: "Venado" },
    { num: "35", nombre: "Jirafa" },
    { num: "36", nombre: "Culebra" },
    { num: "37", nombre: "Tortuga" },
    { num: "38", nombre: "Búfalo" },
    { num: "39", nombre: "Lechuza" },
    { num: "40", nombre: "Avispa" },
    { num: "41", nombre: "Canguro" },
    { num: "42", nombre: "Tucán" },
    { num: "43", nombre: "Mariposa" },
    { num: "44", nombre: "Chigüire" },
    { num: "45", nombre: "Garza" },
    { num: "46", nombre: "Puma" },
    { num: "47", nombre: "Pavo Real" },
    { num: "48", nombre: "Puercoespín" },
    { num: "49", nombre: "Pereza" },
    { num: "50", nombre: "Canario" },
    { num: "51", nombre: "Pelícano" },
    { num: "52", nombre: "Pulpo" },
    { num: "53", nombre: "Caracol" },
    { num: "54", nombre: "Grillo" },
    { num: "55", nombre: "Oso Hormiguero" },
    { num: "56", nombre: "Tiburón" },
    { num: "57", nombre: "Pato" },
    { num: "58", nombre: "Hormiga" },
    { num: "59", nombre: "Pantera" },
    { num: "60", nombre: "Camaleón" },
    { num: "61", nombre: "Panda" },
    { num: "62", nombre: "Cachicamo" },
    { num: "63", nombre: "Cangrejo" },
    { num: "64", nombre: "Gavilán" },
    { num: "65", nombre: "Araña" },
    { num: "66", nombre: "Lobo" },
    { num: "67", nombre: "Avestruz" },
    { num: "68", nombre: "Jaguar" },
    { num: "69", nombre: "Conejo" },
    { num: "70", nombre: "Bisonte" },
    { num: "71", nombre: "Guacamaya" },
    { num: "72", nombre: "Gorila" },
    { num: "73", nombre: "Hipopótamo" },
    { num: "74", nombre: "Turpial" },
    { num: "75", nombre: "Guácharo" }
];

function buscarAnimalito(codigo) {
    if (codigo === "0" || codigo === "00") {
        return listaAnimalitos.find(a => a.num === codigo);
    }
    const numEntero = parseInt(codigo, 10);
    const numFormateado = numEntero < 10 ? "0" + numEntero : numEntero.toString();
    return listaAnimalitos.find(a => a.num === numFormateado) || { num: numFormateado, nombre: "Desconocido" };
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar fecha actual
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fechaInput').value = today;

    // 2. Poblar el selector con los 77 animalitos
    const selectAnimal = document.getElementById('anteriorSelect');
    listaAnimalitos.forEach(item => {
        const option = document.createElement('option');
        option.value = item.num;
        option.textContent = `${item.num} - ${item.nombre}`;
        if (item.num === "23") option.selected = true; // 23 Cebra seleccionado por defecto
        selectAnimal.appendChild(option);
    });

    document.getElementById('calcularBtn').addEventListener('click', ejecutarCalculo);
});

function ejecutarCalculo() {
    const fechaStr = document.getElementById('fechaInput').value;
    const horaSorteo = document.getElementById('horaInput').value;
    const codigoAnterior = document.getElementById('anteriorSelect').value;

    if (!fechaStr) {
        alert('Selecciona la fecha del sorteo.');
        return;
    }

    const animalAnterior = buscarAnimalito(codigoAnterior);
    const numEntero = parseInt(codigoAnterior, 10);

    // --- MÉTODO 1: LA PIRÁMIDE ---
    const partesFecha = fechaStr.split('-'); // [YYYY, MM, DD]
    const anioCorto = partesFecha[0].slice(-2);
    const mes = partesFecha[1];
    const dia = partesFecha[2];
    
    // Base: DD + MM + AA + Número Anterior (ej. "00" aporta dos ceros, "0" uno)
    const digitosBase = `${dia}${mes}${anioCorto}${codigoAnterior}`.split('').map(Number);
    let fila = [...digitosBase];
    let filasPiramide = [fila.join(' ')];

    while (fila.length > 2) {
        let nuevaFila = [];
        for (let i = 0; i < fila.length - 1; i++) {
            nuevaFila.push((fila[i] + fila[i + 1]) % 10);
        }
        fila = nuevaFila;
        filasPiramide.push(fila.join(' '));
    }

    const piramideHTML = filasPiramide.join('\n');
    let cierreNum = parseInt(fila.join(''), 10);
    
    // Si el cierre pasa de 75, se reduce sumando sus dígitos (ej. 89 -> 17 Pavo)
    if (cierreNum > 75) {
        cierreNum = Math.floor(cierreNum / 10) + (cierreNum % 10);
    }
    const animalPiramide = buscarAnimalito(cierreNum === 0 ? "00" : cierreNum);

    document.getElementById('piramideOutput').textContent = piramideHTML;
    document.getElementById('reduccionFinal').textContent = `Cierre de Pirámide: ${animalPiramide.num} (${animalPiramide.nombre})`;

    // --- MÉTODO 2: LEY DE ATRACCIÓN (JALADERA) ---
    // A) Espejo (Invertir dígitos)
    let codigoInvertido = codigoAnterior.length === 1 ? codigoAnterior + "0" : codigoAnterior.split('').reverse().join('');
    let numEspejo = parseInt(codigoInvertido, 10);
    let animalEspejo;
    
    if (codigoAnterior === "0") {
        animalEspejo = buscarAnimalito("00");
    } else if (codigoAnterior === "00") {
        animalEspejo = buscarAnimalito("0");
    } else if (numEspejo > 75 || numEspejo === numEntero) {
        // Si el espejo pasa de 75 (ej. 29 -> 92) o es capicúa (ej. 22), jala la suma de sus dígitos
        const sumaDigitos = Math.floor(numEntero / 10) + (numEntero % 10);
        animalEspejo = buscarAnimalito(sumaDigitos);
    } else {
        animalEspejo = buscarAnimalito(numEspejo);
    }

    // B) Jaladera por Terminal
    const terminal = numEntero % 10;
    let jaladera1Num = terminal === numEntero ? (terminal + 10) : terminal;
    let jaladera2Num = (terminal + 20) !== numEntero ? (terminal + 20) : (terminal + 30);
    
    const animalJala1 = buscarAnimalito(jaladera1Num);
    const animalJala2 = buscarAnimalito(jaladera2Num);

    const atraccionList = document.getElementById('atraccionList');
    atraccionList.innerHTML = `
        <li><strong>Espejo / Inverso:</strong> <b>${animalEspejo.num} ${animalEspejo.nombre}</b> — Reflexión directa del ${animalAnterior.num} (${animalAnterior.nombre}).</li>
        <li><strong>Arrastre por Terminal (${terminal}):</strong> <b>${animalJala1.num} ${animalJala1.nombre}</b> y <b>${animalJala2.num} ${animalJala2.nombre}</b> — Mantienen la misma terminación en tabla.</li>
    `;

    // --- ARMADO DEL CUADRO DE JUGADAS (DATO FIJO + RESGUARDOS) ---
    document.getElementById('lblHoraSorteo').textContent = horaSorteo;
    const jugadasGrid = document.getElementById('jugadasGrid');

    // Evitar duplicados entre el Fijo y el Resguardo de Pirámide
    const resguardoPiramide = animalPiramide.num !== animalEspejo.num ? animalPiramide : animalJala1;
    const motivoResguardo = animalPiramide.num !== animalEspejo.num 
        ? `Cierre exacto de la pirámide formada con la fecha y el ${animalAnterior.num}.`
        : `Coincidencia de cierre piramidal y arrastre directo de terminal ${terminal}.`;

    jugadasGrid.innerHTML = `
        <div class="play-item fijo">
            <div class="play-header">
                <span class="play-animal">${animalEspejo.num} - ${animalEspejo.nombre.toUpperCase()}</span>
                <span class="play-tag">Dato Fijo</span>
            </div>
            <p class="play-reason">Por Ley de Atracción: Es el espejo/inverso directo que jala el <strong>${animalAnterior.num} (${animalAnterior.nombre})</strong>.</p>
        </div>

        <div class="play-item">
            <div class="play-header">
                <span class="play-animal">${resguardoPiramide.num} - ${resguardoPiramide.nombre}</span>
                <span class="play-tag">Resguardo Pirámide</span>
            </div>
            <p class="play-reason">${motivoResguardo}</p>
        </div>

        <div class="play-item">
            <div class="play-header">
                <span class="play-animal">${animalJala2.num} - ${animalJala2.nombre}</span>
                <span class="play-tag">Batacazo / Terminal</span>
            </div>
            <p class="play-reason">Por repetición de terminal <strong>${terminal}</strong> en la escala media de la tabla.</p>
        </div>
    `;

    document.getElementById('resultados').classList.remove('hidden');
}
