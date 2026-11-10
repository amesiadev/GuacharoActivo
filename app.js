// ==========================================
// TÓMBOLA OFICIAL CORREGIDA (00 = Ballena, 0 = Delfín)
// ==========================================
const DEFAULT_ANIMALS = [
    { num: "00", name: "Ballena", icon: "fa-fish" },
    { num: "0", name: "Delfín", icon: "fa-water" },
    { num: "01", name: "Carnero", icon: "fa-paw" },
    { num: "02", name: "Toro", icon: "fa-shield-cat" },
    { num: "03", name: "Ciempiés", icon: "fa-bug" },
    { num: "04", name: "Alacrán", icon: "fa-bug" },
    { num: "05", name: "León", icon: "fa-cat" },
    { num: "06", name: "Rana", icon: "fa-frog" },
    { num: "07", name: "Perico", icon: "fa-kiwi-bird" },
    { num: "08", name: "Ratón", icon: "fa-vcard" },
    { num: "09", name: "Águila", icon: "fa-crow" },
    { num: "10", name: "Tigre", icon: "fa-shield-cat" },
    { num: "11", name: "Gato", icon: "fa-cat" },
    { num: "12", name: "Caballo", icon: "fa-horse" },
    { num: "13", name: "Mono", icon: "fa-ghost" },
    { num: "14", name: "Paloma", icon: "fa-dove" },
    { num: "15", name: "Zorro", icon: "fa-dog" },
    { num: "16", name: "Oso", icon: "fa-paw" },
    { num: "17", name: "Pavo", icon: "fa-drumstick-bite" },
    { num: "18", name: "Burro", icon: "fa-horse-head" },
    { num: "19", name: "Chivo", icon: "fa-hippo" },
    { num: "20", name: "Cochino", icon: "fa-piggy-bank" },
    { num: "21", name: "Gallo", icon: "fa-feather" },
    { num: "22", name: "Camello", icon: "fa-scroll" },
    { num: "23", name: "Cebra", icon: "fa-horse" },
    { num: "24", name: "Iguana", icon: "fa-dragon" },
    { num: "25", name: "Gallina", icon: "fa-feather-pointed" },
    { num: "26", name: "Vaca", icon: "fa-cow" },
    { num: "27", name: "Perro", icon: "fa-dog" },
    { num: "28", name: "Zamuro", icon: "fa-crow" },
    { num: "29", name: "Elefante", icon: "fa-hippo" },
    { num: "30", name: "Caimán", icon: "fa-dragon" },
    { num: "31", name: "Lapa", icon: "fa-otter" },
    { num: "32", name: "Ardilla", icon: "fa-paw" },
    { num: "33", name: "Pescado", icon: "fa-fish" },
    { num: "34", name: "Venado", icon: "fa-mask" },
    { num: "35", name: "Jirafa", icon: "fa-highlighter" },
    { num: "36", name: "Culebra", icon: "fa-staff-snake" },
    { num: "37", name: "Tortuga", icon: "fa-otter" },
    { num: "38", name: "Búfalo", icon: "fa-cow" },
    { num: "39", name: "Lechuza", icon: "fa-feather" },
    { num: "40", name: "Avispa", icon: "fa-bug" },
    { num: "41", name: "Canguro", icon: "fa-paw" },
    { num: "42", name: "Tucán", icon: "fa-crow" },
    { num: "43", name: "Mariposa", icon: "fa-bug" },
    { num: "44", name: "Chigüire", icon: "fa-otter" },
    { num: "45", name: "Garza", icon: "fa-dove" },
    { num: "46", name: "Puma", icon: "fa-cat" },
    { num: "47", name: "Pavo Real", icon: "fa-feather-pointed" },
    { num: "48", name: "Puercoespín", icon: "fa-bug" },
    { num: "49", name: "Pereza", icon: "fa-face-rolling-eyes" },
    { num: "50", name: "Canario", icon: "fa-kiwi-bird" },
    { num: "51", name: "Pelícano", icon: "fa-dove" },
    { num: "52", name: "Pulpo", icon: "fa-disease" },
    { num: "53", name: "Caracol", icon: "fa-stroopwafel" },
    { num: "54", name: "Grillo", icon: "fa-bug" },
    { num: "55", name: "Oso Hormiguero", icon: "fa-paw" },
    { num: "56", name: "Tiburón", icon: "fa-fish-fins" },
    { num: "57", name: "Pato", icon: "fa-dove" },
    { num: "58", name: "Hormiga", icon: "fa-bug" },
    { num: "59", name: "Pantera", icon: "fa-cat" },
    { num: "60", name: "Camaleón", icon: "fa-dragon" },
    { num: "61", name: "Panda", icon: "fa-paw" },
    { num: "62", name: "Cachicamo", icon: "fa-shield-cat" },
    { num: "63", name: "Cangrejo", icon: "fa-disease" },
    { num: "64", name: "Gavilán", icon: "fa-crow" },
    { num: "65", name: "Araña", icon: "fa-spider" },
    { num: "66", name: "Lobo", icon: "fa-paw" },
    { num: "67", name: "Avestruz", icon: "fa-kiwi-bird" },
    { num: "68", name: "Jaguar", icon: "fa-cat" },
    { num: "69", name: "Conejo", icon: "fa-paw" },
    { num: "70", name: "Bisonte", icon: "fa-cow" },
    { num: "71", name: "Guacamaya", icon: "fa-kiwi-bird" },
    { num: "72", name: "Gorila", icon: "fa-ghost" },
    { num: "73", name: "Hipopótamo", icon: "fa-hippo" },
    { num: "74", name: "Turpial", icon: "fa-dove" },
    { num: "75", name: "Guácharo", icon: "fa-feather" }
];

// ESTADO GLOBAL
let animalsList = [];
let animalMap = {};
let drawHistory = [];

function normalizeNumStr(num) {
    if (num === undefined || num === null) return "00";
    let s = String(num).trim();
    if (s === "0" || s === "00") return s;
    if (s.length === 1) return "0" + s;
    return s;
}

function normalizeTimeStr(timeStr) {
    if (!timeStr) return "12:00 PM";
    let t = timeStr.trim().toUpperCase();
    if (/^\d:[0-5]\d\s*(AM|PM)$/.test(t)) {
        t = "0" + t;
    }
    return t;
}

function initApp() {
    loadAnimalsTable();
    loadHistoryData();
    populateAnimalSelects();
    renderAllViews();
    initClock();
    
    const dateInput = document.getElementById('input-draw-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
}

function loadAnimalsTable() {
    const saved = localStorage.getItem('guacharo_animals_db');
    if (saved) {
        try { animalsList = JSON.parse(saved); } catch(e) { animalsList = [...DEFAULT_ANIMALS]; }
    } else {
        animalsList = [...DEFAULT_ANIMALS];
    }
    rebuildAnimalMap();
}

function rebuildAnimalMap() {
    animalMap = {};
    animalsList.forEach(a => {
        let raw = String(a.num).trim();
        animalMap[raw] = a;
        if (raw.length === 1 && raw !== "0") {
            animalMap["0" + raw] = a;
        } else if (raw.length === 2 && raw.startsWith("0") && raw !== "00") {
            animalMap[raw.substring(1)] = a;
        }
    });
}

function loadHistoryData() {
    const saved = localStorage.getItem('guacharo_history_db');
    if (saved) {
        try { drawHistory = JSON.parse(saved); } catch(e) { drawHistory = []; }
    } else {
        drawHistory = [];
    }
}

function saveHistoryData() {
    localStorage.setItem('guacharo_history_db', JSON.stringify(drawHistory));
}

function clearHistoryData() {
    if (confirm('¿Vaciar por completo la base de datos activa?')) {
        drawHistory = [];
        saveHistoryData();
        renderAllViews();
    }
}

function populateAnimalSelects() {
    const select = document.getElementById('input-draw-animal');
    if (!select) return;
    select.innerHTML = '';
    animalsList.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.num;
        opt.innerText = `${a.num} - ${a.name}`;
        select.appendChild(opt);
    });
}

function getDecenaGroup(numStr) {
    if (numStr === "0" || numStr === "00") return "0";
    return numStr.length === 2 ? numStr.charAt(0) : "0";
}

// ==========================================
// MOTOR MHE (PROCESAMIENTO PURO DE BASE ACTIVA)
// ==========================================
function computeMHEModel(history) {
    if (!history || history.length < 3) return null;

    const n = history.length;
    const lastState = normalizeNumStr(history[n - 1].num);
    const prevLastState = normalizeNumStr(history[n - 2].num);

    const ultimo = lastState;
    const anteultimo = prevLastState;

    const markov2 = {};
    const markov1 = {};
    const globalFreq = {};

    animalsList.forEach(a => globalFreq[normalizeNumStr(a.num)] = 0);

    for (let i = 0; i < n; i++) {
        const current = normalizeNumStr(history[i].num);
        globalFreq[current] = (globalFreq[current] || 0) + 1;

        if (i >= 1) {
            const p1 = normalizeNumStr(history[i - 1].num);
            const pair = `${p1}->${current}`;
            markov1[pair] = (markov1[pair] || 0) + 1;
        }

        if (i >= 2) {
            const p2 = normalizeNumStr(history[i - 2].num);
            const p1 = normalizeNumStr(history[i - 1].num);
            const tri = `${p2}->${p1}->${current}`;
            markov2[tri] = (markov2[tri] || 0) + 1;
        }
    }

    const decenasCount = { '0':0, '1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0 };
    history.forEach(item => {
        const d = getDecenaGroup(normalizeNumStr(item.num));
        if (decenasCount[d] !== undefined) decenasCount[d]++;
    });

    const candidates = [];
    const lastDecena = getDecenaGroup(lastState);
    const lastTerminal = lastState.slice(-1);

    animalsList.forEach(animal => {
        const num = normalizeNumStr(animal.num);
        const triKey = `${prevLastState}->${lastState}->${num}`;
        const pairKey = `${lastState}->${num}`;

        const m2W = markov2[triKey] || 0;
        const m1W = markov1[pairKey] || 0;
        const baseFreq = ((globalFreq[num] || 0) / n) * 100;

        const dec = getDecenaGroup(num);
        const term = num.slice(-1);

        let mirrorBonus = 0;
        if (term === lastTerminal) mirrorBonus += 15;
        if (Math.abs(parseInt(dec) - parseInt(lastDecena)) === 1) mirrorBonus += 10;

        const decFatigue = decenasCount[dec] || 0;
        let poissonMult = 1.0;
        if (decFatigue >= 4) {
            poissonMult = 0.5;
        } else if (decFatigue === 0) {
            poissonMult = 1.6;
        }

        let score = ((m2W * 40) + (m1W * 25) + (baseFreq * 10) + mirrorBonus) * poissonMult;

        if (num === ultimo) {
            score -= 60.0;
        } else if (num === anteultimo) {
            score -= 30.0;
        }

        score += Math.random() * 2.0;

        candidates.push({
            num: animal.num,
            normNum: num,
            name: animal.name,
            icon: animal.icon || 'fa-gem',
            score: parseFloat(score.toFixed(2)),
            m2Weight: m2W,
            m1Weight: m1W,
            poissonMult: poissonMult.toFixed(2),
            decena: dec,
            terminal: term
        });
    });

    candidates.sort((a, b) => b.score - a.score);

    return {
        prevLastState,
        lastState,
        candidates,
        decenasCount
    };
}

// ==========================================
// PARSER CON REEMPLAZO DIRECTO (SIN HISTORIAL VIEJO)
// ==========================================
function parseAndInjectRawText(rawText) {
    let newDraws = [];
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const defaultDate = document.getElementById('input-draw-date').value || new Date().toISOString().split('T')[0];

    for (let i = 0; i < lines.length - 1; i += 2) {
        let line1 = lines[i];
        let line2 = lines[i + 1];

        let numStr = null;
        let animalName = null;
        let timeStr = null;

        const timeMatch1 = line1.match(/(0?[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)/i);
        const timeMatch2 = line2.match(/(0?[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)/i);

        if (timeMatch1) {
            timeStr = normalizeTimeStr(timeMatch1[0]);
            let numMatch = line2.match(/\b(00|0|[1-9]|[1-6][0-9]|7[0-5])\b/);
            if (numMatch) {
                numStr = numMatch[1];
                animalName = line2.replace(numStr, '').trim();
            }
        } else if (timeMatch2) {
            timeStr = normalizeTimeStr(timeMatch2[0]);
            let numMatch = line1.match(/\b(00|0|[1-9]|[1-6][0-9]|7[0-5])\b/);
            if (numMatch) {
                numStr = numMatch[1];
                animalName = line1.replace(numStr, '').trim();
            }
        }

        if (numStr !== null && timeStr !== null) {
            let cleanKey = String(numStr).trim();
            let animalObj = animalMap[cleanKey] || { name: animalName || 'Desconocido' };

            newDraws.push({
                id: Date.now() + Math.random(),
                date: defaultDate,
                time: timeStr,
                num: cleanKey,
                name: animalObj.name
            });
        }
    }

    if (newDraws.length > 0) {
        // SOBRESCRIBIR BASE COMPLETA
        drawHistory = newDraws;
        saveHistoryData();
        renderAllViews();
        alert(`¡Base sobrescrita con éxito! Se cargaron exactamente ${newDraws.length} sorteos activos.`);
    } else {
        alert('No se pudieron procesar los bloques. Asegúrate de pegar los pares en líneas alternas.');
    }
}

// ==========================================
// VISTAS Y CONTROLADORES
// ==========================================
function renderAllViews() {
    const mhe = computeMHEModel(drawHistory);
    
    const sampleElem = document.getElementById('global-sample-count');
    if (sampleElem) sampleElem.innerText = drawHistory.length;

    if (mhe) {
        renderPredictionTab(mhe);
        renderMarkovTab(mhe);
        renderPoissonDecenas(mhe.decenasCount);
    } else {
        document.getElementById('pred-num').innerText = "--";
        document.getElementById('pred-name').innerText = "Carga al menos 3 sorteos";
        document.getElementById('pred-confidence').innerText = "0.0%";
        document.getElementById('pred-confidence-bar').style.width = "0%";
    }

    renderDailyHistoryTable();
    renderAnimalsGrid();
    runBacktestAudit();
}

function renderPredictionTab(mhe) {
    const top1 = mhe.candidates[0];

    document.getElementById('pred-num').innerText = top1.num;
    document.getElementById('pred-name').innerText = top1.name;
    document.getElementById('pred-icon').innerHTML = `<i class="fa-solid ${top1.icon}"></i>`;

    const conf = Math.min(Math.round((top1.score / 130) * 100), 99);
    document.getElementById('pred-confidence').innerText = `${conf}%`;
    document.getElementById('pred-confidence-bar').style.width = `${conf}%`;

    document.getElementById('pred-markov-weight').innerText = `${top1.m2Weight} hit(s)`;
    document.getElementById('pred-poisson-mult').innerText = `${top1.poissonMult}x`;

    const pLastObj = animalMap[mhe.prevLastState] || { name: '?' };
    const lastObj = animalMap[mhe.lastState] || { name: '?' };
    document.getElementById('pred-input-vector').innerHTML = `
        ${mhe.prevLastState} (${pLastObj.name}) &rarr; ${mhe.lastState} (${lastObj.name})
    `;

    const container = document.getElementById('recent-chips-container');
    container.innerHTML = drawHistory.map((item, idx) => {
        const isLast = idx === drawHistory.length - 1;
        const norm = normalizeNumStr(item.num);
        const obj = animalMap[norm] || animalMap[item.num] || { name: item.name };
        return `
            <div class="flex items-center gap-1 px-2.5 py-1 rounded-lg ${isLast ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold' : 'bg-dark-900 border border-gray-800 text-gray-400'}">
                <span>${item.num}</span>
                <span class="text-[10px] opacity-75">(${obj.name})</span>
            </div>
        `;
    }).join('<i class="fa-solid fa-chevron-right text-gray-700 text-[10px]"></i>');
}

function renderMarkovTab(mhe) {
    const pLastObj = animalMap[mhe.prevLastState] || {};
    const lastObj = animalMap[mhe.lastState] || {};
    const vectorDesc = `${mhe.prevLastState} (${pLastObj.name || '?'}) &rarr; ${mhe.lastState} (${lastObj.name || '?'})`;
    document.getElementById('markov-current-vector').innerText = `Vector Actual: ${vectorDesc}`;

    const tbody = document.getElementById('markov-matrix-tbody');
    const topCandidates = mhe.candidates.slice(0, 10);

    tbody.innerHTML = topCandidates.map((c, i) => `
        <tr class="hover:bg-gray-800/40 transition">
            <td class="p-3 font-bold text-emerald-400">#${i + 1} - ${c.num}</td>
            <td class="p-3 font-semibold text-white flex items-center gap-2">
                <i class="fa-solid ${c.icon} text-gray-400"></i> ${c.name}
            </td>
            <td class="p-3 text-gray-300">${c.m2Weight} coincidencias</td>
            <td class="p-3 text-gray-300">${c.m1Weight} transiciones</td>
            <td class="p-3 text-gray-400">${c.poissonMult}x</td>
            <td class="p-3 text-right font-bold text-emerald-400 font-mono">${c.score} pts</td>
        </tr>
    `).join('');
}

function renderPoissonDecenas(decenasCount) {
    const container = document.getElementById('decenas-container');
    const maxVal = Math.max(...Object.values(decenasCount), 1);
    const decLabels = ['00-09', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-75'];

    container.innerHTML = Object.keys(decenasCount).map((d, i) => {
        const count = decenasCount[d];
        const pct = Math.round((count / maxVal) * 100);
        const isFatigued = count >= 4;

        return `
            <div>
                <div class="flex justify-between text-[11px] mb-1 font-mono">
                    <span class="text-gray-400">Decena ${decLabels[i]}</span>
                    <span class="${isFatigued ? 'text-rose-400 font-bold' : 'text-gray-300'}">${count} sal. ${isFatigued ? '(Fatiga)' : ''}</span>
                </div>
                <div class="w-full bg-dark-900 h-2 rounded-full overflow-hidden border border-gray-800">
                    <div class="h-full rounded-full transition-all duration-300 ${isFatigued ? 'bg-rose-500' : 'bg-emerald-500'}" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function renderDailyHistoryTable() {
    const tbody = document.getElementById('daily-table-body');
    const list = [...drawHistory].reverse();
    document.getElementById('daily-table-count').innerText = `${list.length} sorteos`;

    tbody.innerHTML = list.map(item => {
        const norm = normalizeNumStr(item.num);
        const animalObj = animalMap[norm] || animalMap[item.num] || { name: item.name || 'Desconocido' };

        return `
            <tr class="hover:bg-gray-800/30 transition">
                <td class="p-2 text-gray-400">${item.date || '--'}</td>
                <td class="p-2 text-emerald-400 font-semibold">${item.time}</td>
                <td class="p-2 font-bold text-white">${item.num}</td>
                <td class="p-2 text-gray-300">${animalObj.name}</td>
                <td class="p-2 text-right">
                    <button onclick="deleteDrawRecord(${item.id})" class="text-gray-500 hover:text-rose-400">
                        <i class="fa-solid fa-trash text-xs"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderAnimalsGrid() {
    const container = document.getElementById('animals-grid-container');
    container.innerHTML = animalsList.map(a => `
        <div class="bg-dark-900 p-2.5 rounded-xl border border-gray-800 flex items-center gap-2">
            <span class="font-mono text-emerald-400 font-bold w-7">${a.num}</span>
            <input type="text" id="animal-input-${a.num}" value="${a.name}" class="w-full bg-dark-950 border border-gray-700 rounded px-2 py-1 text-xs text-gray-200 font-mono focus:border-emerald-500 focus:outline-none">
        </div>
    `).join('');
}

async function readClipboardAndProcess() {
    try {
        const text = await navigator.clipboard.readText();
        if (!text || text.trim().length === 0) {
            alert('El portapapeles está vacío.');
            return;
        }
        parseAndInjectRawText(text);
    } catch (err) {
        alert('Pega el texto directamente en el recuadro inferior.');
    }
}

function processRawImportText() {
    const raw = document.getElementById('raw-import-textarea').value.trim();
    if (!raw) return;
    parseAndInjectRawText(raw);
    document.getElementById('raw-import-textarea').value = '';
}

const formInjector = document.getElementById('draw-injector-form');
if (formInjector) {
    formInjector.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('input-draw-date').value;
        const time = document.getElementById('input-draw-time').value;
        const num = document.getElementById('input-draw-animal').value;
        const cleanKey = String(num).trim();
        const animalObj = animalMap[cleanKey] || { name: 'Desconocido' };

        drawHistory.push({
            id: Date.now(),
            date: date,
            time: time,
            num: cleanKey,
            name: animalObj.name
        });

        saveHistoryData();
        renderAllViews();
    });
}

function deleteDrawRecord(id) {
    drawHistory = drawHistory.filter(h => h.id !== id);
    saveHistoryData();
    renderAllViews();
}

function exportDatabaseJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        animals: animalsList,
        historial: drawHistory
    }, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `guacharo_mhe_db_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchorElem.click();
}

function importDatabaseJSON(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const parsed = JSON.parse(e.target.result);
            const rawData = parsed.historial || parsed.history;
            
            if (rawData && Array.isArray(rawData)) {
                drawHistory = rawData.map(item => {
                    let rawNum = item.num !== undefined ? String(item.num).trim() : (item.numero !== undefined ? String(item.numero).trim() : "00");
                    let foundObj = animalMap[rawNum] || { name: item.animal || item.nombre || 'Desconocido' };

                    return {
                        id: item.id || (Date.now() + Math.random()),
                        date: item.date || (item.timestamp ? item.timestamp.split(' ')[0] : new Date().toISOString().split('T')[0]),
                        time: item.time || (item.timestamp ? item.timestamp.split(' ')[1] + ' ' + (item.timestamp.split(' ')[2] || '') : '12:00 PM'),
                        num: rawNum,
                        name: foundObj.name
                    };
                });

                if (parsed.animals && Array.isArray(parsed.animals)) {
                    animalsList = parsed.animals;
                }
                
                rebuildAnimalMap();
                saveHistoryData();
                renderAllViews();
                alert(`¡Base de datos JSON cargada con éxito! Se sincronizaron ${drawHistory.length} registros.`);
            } else {
                alert('El archivo JSON no contiene un historial válido.');
            }
        } catch(err) {
            console.error(err);
            alert('Error al leer el archivo JSON.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

function runBacktestAudit() {
    const selectElem = document.getElementById('backtest-window-select');
    if (!selectElem) return;
    const windowSize = parseInt(selectElem.value);

    if (drawHistory.length <= 3) {
        document.getElementById('audit-rate').innerText = 'N/A';
        document.getElementById('audit-detail-text').innerText = 'Insuficientes datos en base activa';
        return;
    }

    let hits = 0;
    let totalEvaluated = 0;
    let maxLoss = 0, currentLoss = 0;
    let maxWin = 0, currentWin = 0;
    const trend = [];

    for (let i = 2; i < drawHistory.length; i++) {
        const subHistory = drawHistory.slice(0, i);
        const actualNorm = normalizeNumStr(drawHistory[i].num);

        const mhe = computeMHEModel(subHistory);
        if (!mhe || mhe.candidates.length === 0) continue;

        totalEvaluated++;
        const isHit = normalizeNumStr(mhe.candidates[0].num) === actualNorm;

        if (isHit) {
            hits++;
            currentWin++;
            currentLoss = 0;
            if (currentWin > maxWin) maxWin = currentWin;
        } else {
            currentLoss++;
            currentWin = 0;
            if (currentLoss > maxLoss) maxLoss = currentLoss;
        }

        trend.push(parseFloat(((hits / totalEvaluated) * 100).toFixed(1)));
    }

    const rate = totalEvaluated > 0 ? ((hits / totalEvaluated) * 100).toFixed(1) : 0;
    document.getElementById('audit-rate').innerText = `${rate}%`;
    document.getElementById('audit-detail-text').innerText = `${hits} aciertos de ${totalEvaluated} evaluados`;
    document.getElementById('audit-max-loss').innerText = maxLoss;
    document.getElementById('audit-max-win').innerText = maxWin;
    document.getElementById('global-win-rate').innerText = `${rate}%`;

    renderCanvasChart(trend);
}

function renderCanvasChart(trendData) {
    const canvas = document.getElementById('audit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!trendData || trendData.length === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const pad = 20;

    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;
    for (let yPct of [0.25, 0.5, 0.75]) {
        ctx.beginPath();
        ctx.moveTo(pad, h * yPct);
        ctx.lineTo(w - pad, h * yPct);
        ctx.stroke();
    }

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const step = (w - pad * 2) / (trendData.length - 1 || 1);

    trendData.forEach((val, idx) => {
        const x = pad + (idx * step);
        const y = h - pad - ((val / 100) * (h - pad * 2));
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

function switchTab(tabId) {
    ['tab-prediction', 'tab-markov', 'tab-data', 'tab-backtest', 'tab-table'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const target = document.getElementById(tabId);
    if (target) target.classList.remove('hidden');
    
    const btnTarget = document.getElementById(`btn-${tabId}`);
    if (btnTarget) btnTarget.classList.add('active');

    if (tabId === 'tab-backtest') {
        setTimeout(runBacktestAudit, 100);
    }
}

function initClock() {
    setInterval(() => {
        const clock = document.getElementById('clock-display');
        if (clock) clock.innerText = new Date().toLocaleTimeString();
    }, 1000);
}

window.addEventListener('resize', () => {
    runBacktestAudit();
});

document.addEventListener('DOMContentLoaded', initApp);
