// Nombres de los animalitos N=38
const ANIMALES = {
    0: 'Ballena', 1: 'Carnero', 2: 'Toro', 3: 'Ciempiés', 4: 'Alacrán',
    5: 'León', 6: 'Rana', 7: 'Perico', 8: 'Ratón', 9: 'Águila',
    10: 'Tigre', 11: 'Gato', 12: 'Caballo', 13: 'Mono', 14: 'Paloma',
    15: 'Zorro', 16: 'Oso', 17: 'Pavo', 18: 'Burro', 19: 'Chivo',
    20: 'Cochino', 21: 'Gallo', 22: 'Camello', 23: 'Cebra', 24: 'Iguana',
    25: 'Gallina', 26: 'Vaca', 27: 'Perro', 28: 'Zamuro', 29: 'Elefante',
    30: 'Caimán', 31: 'Lapa', 32: 'Ardilla', 33: 'Pescado', 34: 'Venado',
    35: 'Jirafa', 36: 'Culebra'
};

let lottoData = [];
let granjitaData = [];

// Manejo de archivos
document.getElementById('lottoFile').addEventListener('change', (e) => {
    readCSV(e.target.files[0], 'lotto');
});
document.getElementById('granjitaFile').addEventListener('change', (e) => {
    readCSV(e.target.files[0], 'granjita');
});

function readCSV(file, type) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const parsed = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            const parts = line.split(',');
            if (parts.length >= 3) {
                let num = parseInt(parts[2].trim());
                // Normalizar 00 a 0
                if (isNaN(num)) num = 0; 
                parsed.push({
                    fecha: parts[0].trim(),
                    hora: parts[1].trim(),
                    numero: num
                });
            }
        }

        if (type === 'lotto') {
            lottoData = parsed;
            document.getElementById('lottoStatus').innerText = `✅ ${parsed.length} registros cargados`;
        } else {
            granjitaData = parsed;
            document.getElementById('granjitaStatus').innerText = `✅ ${parsed.length} registros cargados`;
        }

        checkReady();
    };
    reader.readAsText(file);
}

function checkReady() {
    const btn = document.getElementById('analyzeBtn');
    if (lottoData.length > 0 && granjitaData.length > 0) {
        btn.disabled = false;
        btn.innerText = "Analizar Datos";
    }
}

// Función principal de análisis
document.getElementById('analyzeBtn').addEventListener('click', () => {
    const mirrorDate = document.getElementById('mirrorDate').value;
    if (!mirrorDate) {
        alert("Por favor selecciona una fecha espejo");
        return;
    }

    // 1. Calcular frecuencias globales
    const freqLotto = getFrequencies(lottoData);
    const freqGranjita = getFrequencies(granjitaData);

    // 2. Obtener números del espejo
    const mirrorLotto = getMirrorNumbers(lottoData, mirrorDate);
    const mirrorGranjita = getMirrorNumbers(granjitaData, mirrorDate);

    if (mirrorLotto.length === 0 || mirrorGranjita.length === 0) {
        document.getElementById('errorMsg').innerText = "No hay datos para la fecha espejo seleccionada.";
        document.getElementById('errorMsg').classList.remove('hidden');
        return;
    }
    document.getElementById('errorMsg').classList.add('hidden');

    // 3. Rankear por frecuencia
    const topLotto = rankNumbers(mirrorLotto, freqLotto).slice(0, 4);
    const topGranjita = rankNumbers(mirrorGranjita, freqGranjita).slice(0, 4);

    // 4. Encontrar cruce Oro
    const gold = topLotto.filter(n => topGranjita.includes(n));

    // 5. Renderizar en pantalla
    renderTop(topLotto, freqLotto, 'lottoTop4');
    renderTop(topGranjita, freqGranjita, 'granjitaTop4');
    renderGold(gold, freqLotto, freqGranjita);

    document.getElementById('results').classList.remove('hidden');
});

function getFrequencies(data) {
    const freq = {};
    data.forEach(row => {
        freq[row.numero] = (freq[row.numero] || 0) + 1;
    });
    return freq;
}

function getMirrorNumbers(data, date) {
    const nums = new Set();
    data.forEach(row => {
        if (row.fecha === date) nums.add(row.numero);
    });
    return Array.from(nums);
}

function rankNumbers(numbersArray, frequencies) {
    return numbersArray.sort((a, b) => {
        const freqA = frequencies[a] || 0;
        const freqB = frequencies[b] || 0;
        if (freqB !== freqA) return freqB - freqA; // Mayor frecuencia primero
        return b - a; // Desempate
    });
}

function renderTop(numbers, frequencies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    numbers.forEach(num => {
        const div = document.createElement('div');
        div.style.marginBottom = '15px';
        div.innerHTML = `
            <div class="top-num">${num.toString().padStart(2, '0')}</div>
            <div class="animal-name">${ANIMALES[num] || 'Desconocido'}</div>
            <div class="freq">Frecuencia: ${frequencies[num]} veces</div>
        `;
        container.appendChild(div);
    });
}

function renderGold(goldNumbers, freqLotto, freqGranjita) {
    const container = document.getElementById('goldCandidates');
    container.innerHTML = '';
    if (goldNumbers.length === 0) {
        container.innerHTML = '<p>No hubo coincidencias en el Top 4 de ambas loterías.</p>';
        return;
    }
    goldNumbers.forEach(num => {
        const div = document.createElement('div');
        div.style.background = 'var(--panel)';
        div.style.padding = '15px';
        div.style.borderRadius = '8px';
        div.style.minWidth = '120px';
        div.innerHTML = `
            <div style="font-size: 2rem; color: var(--gold); font-weight:bold;">${num.toString().padStart(2, '0')}</div>
            <div style="font-weight: bold;">${ANIMALES[num]}</div>
            <div style="font-size: 0.8rem; color: #8b949e;">Lotto: ${freqLotto[num]} | Granjita: ${freqGranjita[num]}</div>
        `;
        container.appendChild(div);
    });
        }
