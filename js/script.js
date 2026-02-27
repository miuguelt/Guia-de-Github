console.log("Matemática Discreta Interactive Module Loaded");

/* Lógica */
function calculateLogic() {
    const p = document.getElementById('propP').checked;
    const q = document.getElementById('propQ').checked;
    const op = document.getElementById('logicOp').value;
    let result = false;

    switch(op) {
        case 'AND': result = p && q; break;
        case 'OR': result = p || q; break;
        case 'NOT': result = !p; break; // Uses only P
        case 'IMPLIES': result = (!p) || q; break;
    }

    const resultText = result ? "VERDADERO" : "FALSO";
    document.getElementById('logicResult').innerText = `Resultado: ${resultText}`;
}

/* Teoría de Conjuntos */
function drawVenn(type) {
    const canvas = document.getElementById('vennCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Set A
    ctx.beginPath();
    ctx.arc(width/3, height/2, 60, 0, 2 * Math.PI);
    ctx.strokeStyle = '#39a900'; // SENA Green
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(57, 169, 0, 0.1)';
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.fillText("A", width/3 - 10, height/2);

    // Draw Set B
    ctx.beginPath();
    ctx.arc(2*width/3, height/2, 60, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fc7323'; // SENA Orange
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(252, 115, 35, 0.1)';
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.fillText("B", 2*width/3 + 5, height/2);

    // Highlight logic based on type
    ctx.globalCompositeOperation = 'destination-over'; // Draw behind existing strokes

    if (type === 'UNION') {
        // Fill A
        ctx.beginPath();
        ctx.arc(width/3, height/2, 60, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(57, 169, 0, 0.5)';
        ctx.fill();
        // Fill B
        ctx.beginPath();
        ctx.arc(2*width/3, height/2, 60, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(252, 115, 35, 0.5)';
        ctx.fill();
    } else if (type === 'INTERSECTION') {
        // To highlight intersection, we use clipping or composite operations.
        // Simple approach: Fill A, then restrict B to only draw where A is.
        ctx.save();
        ctx.beginPath();
        ctx.arc(width/3, height/2, 60, 0, 2 * Math.PI);
        ctx.clip(); // Restrict drawing to inside A
        ctx.beginPath();
        ctx.arc(2*width/3, height/2, 60, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Darker intersection
        ctx.fill();
        ctx.restore();
    } else if (type === 'DIFFERENCE') {
         // A - B
         ctx.save();
         ctx.beginPath();
         ctx.arc(width/3, height/2, 60, 0, 2 * Math.PI);
         ctx.clip(); // Restrict to A

         // Now cut out B? Easier to just fill A and then 'erase' B?
         // Better: Fill A, then composite 'destination-out' with B
         ctx.fillStyle = 'rgba(57, 169, 0, 0.5)';
         ctx.fill();

         ctx.globalCompositeOperation = 'destination-out';
         ctx.beginPath();
         ctx.arc(2*width/3, height/2, 60, 0, 2 * Math.PI);
         ctx.fill();
         ctx.restore();
    }

    ctx.globalCompositeOperation = 'source-over'; // Reset

    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    let text = "";
    if (type === 'UNION') text = "A ∪ B (Unión)";
    if (type === 'INTERSECTION') text = "A ∩ B (Intersección)";
    if (type === 'DIFFERENCE') text = "A - B (Diferencia)";

    ctx.fillText(text, width/2, height - 20);
}

/* Grafos */
// Simple placeholder for graph visualizer
const graphCanvas = document.getElementById('graphCanvas');
if (graphCanvas) {
    const ctx = graphCanvas.getContext('2d');
    let nodes = [];

    function addNode() {
        const x = Math.random() * (graphCanvas.width - 40) + 20;
        const y = Math.random() * (graphCanvas.height - 40) + 20;
        nodes.push({x, y});
        drawGraph();
    }

    function clearGraph() {
        nodes = [];
        const ctx = graphCanvas.getContext('2d');
        ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
    }

    function drawGraph() {
        const ctx = graphCanvas.getContext('2d');
        ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

        // Draw edges (connect all for simplicity in this demo)
        ctx.strokeStyle = "#888";
        ctx.beginPath();
        if(nodes.length > 1) {
            for(let i=0; i<nodes.length-1; i++) {
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[i+1].x, nodes[i+1].y);
            }
        }
        ctx.stroke();

        // Draw nodes
        nodes.forEach((n, i) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 10, 0, 2*Math.PI);
            ctx.fillStyle = "#39a900";
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.fillText(i+1, n.x-3, n.y+3);
        });
    }

    // Expose to global scope for button clicks
    window.addNode = addNode;
    window.clearGraph = clearGraph;
}


/* Combinatoria */
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function calculateCombinatorics() {
    const n = parseInt(document.getElementById('combN').value);
    const r = parseInt(document.getElementById('combR').value);
    const resultDiv = document.getElementById('combResult');

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
        resultDiv.innerHTML = "<p style='color:red'>Por favor ingrese valores válidos (n >= 0, r >= 0).</p>";
        return;
    }

    if (r > n) {
        resultDiv.innerHTML = "<p style='color:red'>r no puede ser mayor que n.</p>";
        return;
    }

    const p = factorial(n) / factorial(n - r);
    const c = factorial(n) / (factorial(r) * factorial(n - r));

    resultDiv.innerHTML = `
        <p><strong>Permutación P(${n},${r}):</strong> ${p}</p>
        <p><strong>Combinación C(${n},${r}):</strong> ${c}</p>
    `;
}

/* Álgebra de Boole */
let stateA = 0;
let stateB = 0;

function toggleInput(input) {
    const btn = document.getElementById(`btn${input}`);
    if (input === 'A') {
        stateA = stateA === 0 ? 1 : 0;
        btn.innerText = `A: ${stateA}`;
        btn.style.backgroundColor = stateA ? "#39a900" : "#fc7323";
    } else {
        stateB = stateB === 0 ? 1 : 0;
        btn.innerText = `B: ${stateB}`;
        btn.style.backgroundColor = stateB ? "#39a900" : "#fc7323";
    }
    updateGates();
}

function updateGates() {
    document.getElementById('outAND').innerText = (stateA && stateB) ? 1 : 0;
    document.getElementById('outOR').innerText = (stateA || stateB) ? 1 : 0;
}
