// Causal Loop Diagram — Gilded Age Industrial Economy (vis-network version)
// CANVAS_HEIGHT: 540
// Chapter 1: Historical Methods and Analytical Frameworks
// Bloom Level: Analyze (L4) — examine reinforcing and balancing feedback loops

document.addEventListener('DOMContentLoaded', function () {

  // ── Historical content ───────────────────────────────────────────────────
  const nodeContent = {
    industrial_output:     { label: 'Industrial Output',     color: '#3949ab', info: 'The total volume of manufactured goods produced — grew ~400% between 1865–1900 in the U.S.' },
    worker_wages:          { label: 'Worker Wages',          color: '#00897b', info: 'Average real wages for industrial workers. Rose in good times, but lagged far behind productivity gains — workers received a declining share of output.' },
    consumer_demand:       { label: 'Consumer Demand',       color: '#2e7d32', info: "Workers' purchasing power drove demand for goods. Henry Ford later recognized this: workers must be able to buy what they make." },
    corporate_profits:     { label: 'Corporate Profits',     color: '#e65100', info: "Profits soared in the Gilded Age — Carnegie's steel earned $25M/year by 1900. Concentrated in the hands of a few industrial barons." },
    capital_investment:    { label: 'Capital Investment',    color: '#7b1fa2', info: 'Reinvestment in machinery, rails, factories. Expanded productive capacity and raised barriers to entry. Made U.S. the world\'s largest economy by 1900.' },
    labor_unrest:          { label: 'Labor Unrest',          color: '#961e1e', info: 'Strikes, boycotts, union organizing. Major events: Railroad Strike of 1877, Haymarket (1886), Homestead (1892), Pullman Strike (1894).' },
    government_regulation: { label: 'Government Regulation', color: '#505050', info: 'Sherman Antitrust Act (1890), Interstate Commerce Act (1887), labor legislation. Often weak at first — the railroad strike of 1877 ended with federal troops, not reform.' }
  };

  const edgeContent = {
    e0: { loop: 'R1', pol: '+', info: 'Higher industrial output → higher wages (when labor was scarce). But this link was often weak in the Gilded Age as immigration kept wages down.' },
    e1: { loop: 'R1', pol: '+', info: "Higher wages → more consumer purchasing power → higher demand for goods. Ford's insight in 1914: pay workers $5/day so they can buy cars." },
    e2: { loop: 'R1', pol: '+', info: 'Higher consumer demand → factories need to produce more → industrial output rises. This reinforcing loop drove rapid industrialization.' },
    e3: { loop: 'R2', pol: '+', info: "More industrial output → more revenue → higher corporate profits. Carnegie's steel profits rose directly with output volume." },
    e4: { loop: 'R2', pol: '+', info: 'Higher profits → more capital available for reinvestment in new machinery and factories. Vertical integration strategies depended on this.' },
    e5: { loop: 'R2', pol: '+', info: 'More investment → expanded productive capacity → higher industrial output. This loop drove the investment-driven growth of the Gilded Age.' },
    e6: { loop: 'B1', pol: '−', info: 'Initially, rising output → rising employment → LESS labor unrest (workers had jobs). But long hours, dangerous conditions, and wage cuts eventually caused unrest DESPITE high output.' },
    e7: { loop: 'B1', pol: '+', info: 'Labor unrest → political pressure for regulation. Haymarket (1886) initially HURT labor but long-term pushed states toward 8-hour day laws.' },
    e8: { loop: 'B1', pol: '−', info: 'Government regulation (antitrust, labor laws, ICC) → limits on industrial practices → somewhat constrains industrial output growth. The BALANCING BRAKE on the system.' }
  };

  const loopDefs = {
    R1: { label: 'R1: Consumer Demand Growth Engine', type: 'Reinforcing', color: '#f9a825',
          desc: 'Industrial Output → (+) Worker Wages → (+) Consumer Demand → (+) Industrial Output. A REINFORCING loop: growth feeds growth. When strong, it supported rising living standards.' },
    R2: { label: 'R2: Investment Engine',             type: 'Reinforcing', color: '#ff7832',
          desc: 'Industrial Output → (+) Corporate Profits → (+) Capital Investment → (+) Industrial Output. Another REINFORCING loop: profits fund expansion. The engine of Gilded Age industrial growth.' },
    B1: { label: 'B1: Regulatory Brake',              type: 'Balancing',   color: '#00b4b4',
          desc: 'Industrial Output → (−) Labor Unrest → (+) Government Regulation → (−) Industrial Output. A BALANCING loop: high output creates conditions for reform that eventually slow growth. WEAK in the Gilded Age — regulation was slow and often toothless.' }
  };

  const traceSeqs = {
    R1: [
      { node: 'industrial_output',     edge: 'e0', text: "Step 1 — Industrial Output rises (e.g., Carnegie's steel mills double production)." },
      { node: 'worker_wages',          edge: 'e1', text: 'Step 2 — Higher output → (+) Worker Wages rise (when labor demand exceeded supply — rare in the Gilded Age).' },
      { node: 'consumer_demand',       edge: 'e2', text: 'Step 3 — Higher wages → (+) Consumer Demand rises (workers buy goods they produce).' },
      { node: 'industrial_output',     edge: null, text: 'Step 4 — Higher demand → (+) back to Industrial Output. REINFORCING LOOP COMPLETE ↺ (R loops amplify initial change).' }
    ],
    R2: [
      { node: 'industrial_output',     edge: 'e3', text: 'Step 1 — Industrial Output rises → revenues increase for Rockefeller, Carnegie, Morgan.' },
      { node: 'corporate_profits',     edge: 'e4', text: "Step 2 — Higher Output → (+) Corporate Profits soar. By 1900, Carnegie Steel earns $25M/year." },
      { node: 'capital_investment',    edge: 'e5', text: 'Step 3 — Higher Profits → (+) Capital Investment in new factories, rails, and machinery.' },
      { node: 'industrial_output',     edge: null, text: 'Step 4 — Investment → (+) back to Industrial Output. REINFORCING LOOP COMPLETE ↺ (Gilded Age engine of industrial expansion).' }
    ],
    B1: [
      { node: 'industrial_output',     edge: 'e6', text: 'Step 1 — Industrial Output rises → more factories, longer hours, lower real wages relative to productivity.' },
      { node: 'labor_unrest',          edge: 'e7', text: 'Step 2 — These conditions → (−) Labor Unrest increases. Haymarket (1886), Homestead (1892), Pullman (1894).' },
      { node: 'government_regulation', edge: 'e8', text: 'Step 3 — Labor Unrest → (+) Government Regulation (Sherman Act 1890, ICC 1887, later Progressive Era reforms).' },
      { node: 'industrial_output',     edge: null, text: 'Step 4 — Regulation → (−) back to Industrial Output (limits monopoly power). BALANCING LOOP ⊃ (B loops resist change — reform was slow and weak in the Gilded Age).' }
    ]
  };

  // ── vis DataSets ─────────────────────────────────────────────────────────
  const nodesDS = new vis.DataSet([
    { id: 'industrial_output',     label: 'Industrial\nOutput',      x: 300, y: 50,
      color: { background: '#3949ab', border: '#1a237e', highlight: { background: '#5c6bc0', border: '#f9a825' } },
      font: { color: 'white', size: 13 } },
    { id: 'worker_wages',          label: 'Worker\nWages',           x: 550, y: 200,
      color: { background: '#00897b', border: '#004d40', highlight: { background: '#26a69a', border: '#f9a825' } },
      font: { color: 'white', size: 13 } },
    { id: 'consumer_demand',       label: 'Consumer\nDemand',        x: 550, y: 430,
      color: { background: '#2e7d32', border: '#1b5e20', highlight: { background: '#43a047', border: '#f9a825' } },
      font: { color: 'white', size: 13 } },
    { id: 'corporate_profits',     label: 'Corporate\nProfits',      x: 50,  y: 430,
      color: { background: '#e65100', border: '#bf360c', highlight: { background: '#f4511e', border: '#f9a825' } },
      font: { color: 'white', size: 13 } },
    { id: 'capital_investment',    label: 'Capital\nInvestment',     x: 50,  y: 200,
      color: { background: '#7b1fa2', border: '#4a148c', highlight: { background: '#9c27b0', border: '#f9a825' } },
      font: { color: 'white', size: 13 } },
    { id: 'labor_unrest',          label: 'Labor\nUnrest',           x: 300, y: 550,
      color: { background: '#961e1e', border: '#6d1414', highlight: { background: '#c62828', border: '#f9a825' } },
      font: { color: 'white', size: 13 } },
    { id: 'government_regulation', label: 'Government\nRegulation',  x: 300, y: 310,
      color: { background: '#505050', border: '#333333', highlight: { background: '#757575', border: '#f9a825' } },
      font: { color: 'white', size: 13 } }
  ]);

  const edgesDS = new vis.DataSet([
    { id: 'e0', from: 'industrial_output',     to: 'worker_wages',          label: '+', loop: 'R1', smooth: { type: 'curvedCW',  roundness: 0.3  } },
    { id: 'e1', from: 'worker_wages',          to: 'consumer_demand',       label: '+', loop: 'R1', smooth: { type: 'curvedCW',  roundness: 0.2  } },
    { id: 'e2', from: 'consumer_demand',       to: 'industrial_output',     label: '+', loop: 'R1', smooth: { type: 'curvedCCW', roundness: 0.3  } },
    { id: 'e3', from: 'industrial_output',     to: 'corporate_profits',     label: '+', loop: 'R2', smooth: { type: 'curvedCCW', roundness: 0.3  } },
    { id: 'e4', from: 'corporate_profits',     to: 'capital_investment',    label: '+', loop: 'R2', smooth: { type: 'curvedCW',  roundness: 0.2  } },
    { id: 'e5', from: 'capital_investment',    to: 'industrial_output',     label: '+', loop: 'R2', smooth: { type: 'curvedCW',  roundness: 0.3  } },
    { id: 'e6', from: 'industrial_output',     to: 'labor_unrest',          label: '−', loop: 'B1', smooth: { type: 'curvedCW',  roundness: 0.55 } },
    { id: 'e7', from: 'labor_unrest',          to: 'government_regulation', label: '+', loop: 'B1', smooth: { type: 'curvedCCW', roundness: 0.3  } },
    { id: 'e8', from: 'government_regulation', to: 'industrial_output',     label: '−', loop: 'B1', smooth: { type: 'curvedCCW', roundness: 0.45 } }
  ]);

  // ── vis.Network options ──────────────────────────────────────────────────
  const networkOptions = {
    physics: { enabled: false },
    nodes: {
      shape: 'ellipse',
      size: 45,
      borderWidth: 2,
      borderWidthSelected: 3,
      font: { size: 13, face: 'Arial' }
    },
    edges: {
      arrows: { to: { enabled: true, scaleFactor: 0.8 } },
      color: { color: '#aaaaaa', highlight: '#f9a825', hover: '#f9a825' },
      font: { size: 14, bold: true, align: 'middle', color: '#333', strokeWidth: 3, strokeColor: '#ffffff' },
      width: 2,
      selectionWidth: 2
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      selectConnectedEdges: false
    },
    layout: { improvedLayout: false }
  };

  const container = document.getElementById('network-container');
  const network = new vis.Network(container, { nodes: nodesDS, edges: edgesDS }, networkOptions);

  // ── State ────────────────────────────────────────────────────────────────
  let showLoops = false;
  let traceMode = false;
  let traceLoop = 'R1';
  let traceStep = 0;

  // ── UI refs ──────────────────────────────────────────────────────────────
  const btnLoops  = document.getElementById('btn-loops');
  const btnTrace  = document.getElementById('btn-trace');
  const btnNext   = document.getElementById('btn-next');
  const btnReset  = document.getElementById('btn-reset');
  const infoPanel = document.getElementById('info-panel');
  const hintText  = document.getElementById('hint-text');

  // ── Edge color helpers ───────────────────────────────────────────────────
  function defaultColor() { return { color: '#aaaaaa', highlight: '#f9a825', hover: '#f9a825' }; }

  function colorEdgesByLoop() {
    edgesDS.getIds().forEach(id => {
      const e = edgesDS.get(id);
      const c = loopDefs[e.loop].color;
      edgesDS.update({ id, color: { color: c, highlight: c, hover: c }, width: 3 });
    });
  }

  function resetEdgeColors() {
    edgesDS.getIds().forEach(id => {
      edgesDS.update({ id, color: defaultColor(), width: 2 });
    });
  }

  function dimAllEdges() {
    edgesDS.getIds().forEach(id => {
      edgesDS.update({ id, color: { color: '#dddddd', highlight: '#dddddd', hover: '#dddddd' }, width: 1 });
    });
  }

  // ── Panel renderers ──────────────────────────────────────────────────────
  function renderLoopLegend() {
    infoPanel.innerHTML =
      '<div style="font-weight:bold;font-size:13px;margin-bottom:8px;color:#333">Loop Legend</div>' +
      Object.entries(loopDefs).map(([id, lp]) =>
        `<div style="border-left:4px solid ${lp.color};padding:6px 8px;margin-bottom:8px;background:#fff;border-radius:2px">
          <div style="font-weight:bold;font-size:12px;color:${lp.color}">${lp.label} (${lp.type})</div>
          <div style="font-size:12px;color:#444;margin-top:4px;line-height:1.4">${lp.desc}</div>
         </div>`
      ).join('');
  }

  function renderTracePanel() {
    const seq  = traceSeqs[traceLoop];
    const step = seq[traceStep];
    const lp   = loopDefs[traceLoop];
    const tabHTML = ['R1', 'R2', 'B1'].map(id => {
      const lpd = loopDefs[id];
      const active = traceLoop === id;
      return `<button onclick="window._cldSetTraceLoop('${id}')"
                style="padding:3px 8px;margin-right:4px;cursor:pointer;font-size:12px;border-radius:3px;border:1px solid #ccc;
                       background:${active ? lpd.color : '#eee'};color:${active ? 'white' : '#333'}">${id}</button>`;
    }).join('');

    infoPanel.innerHTML =
      `<div style="background:${lp.color};color:white;padding:6px 8px;border-radius:4px;margin-bottom:8px;font-weight:bold;font-size:13px">${lp.label}</div>
       <div style="margin-bottom:10px">${tabHTML}</div>
       <p style="font-size:13px;margin:0;color:#222;line-height:1.5">${step.text}</p>
       <p style="color:#999;font-size:11px;margin-top:10px">Step ${traceStep + 1} of ${seq.length} — click "Next Step ▶" to continue</p>`;
  }

  function renderNodeInfo(nodeId) {
    const nc = nodeContent[nodeId];
    if (!nc) return;
    infoPanel.innerHTML =
      `<div style="font-weight:bold;font-size:14px;color:${nc.color};margin-bottom:8px">${nc.label}</div>
       <div style="font-size:13px;color:#333;line-height:1.5">${nc.info}</div>
       <p style="color:#bbb;font-size:11px;margin-top:12px">Click on empty area to close.</p>`;
  }

  function renderEdgeInfo(edgeId) {
    const ec   = edgeContent[edgeId];
    if (!ec) return;
    const lp   = loopDefs[ec.loop];
    const edge = edgesDS.get(edgeId);
    const fromLabel = nodeContent[edge.from].label;
    const toLabel   = nodeContent[edge.to].label;
    infoPanel.innerHTML =
      `<div style="font-weight:bold;font-size:13px;color:${lp.color};margin-bottom:6px">${fromLabel} → ${toLabel}</div>
       <div style="font-size:12px;margin-bottom:8px">
         <strong>Polarity:</strong> ${ec.pol === '+' ? 'Positive (+)' : 'Negative (−)'}
         &nbsp;|&nbsp; <strong>Loop:</strong> <span style="color:${lp.color}">${ec.loop}</span>
       </div>
       <div style="font-size:13px;color:#333;line-height:1.5">${ec.info}</div>
       <p style="color:#bbb;font-size:11px;margin-top:12px">Click on empty area to close.</p>`;
  }

  function resetPanel() {
    infoPanel.innerHTML =
      '<p style="color:#999;font-style:italic;font-size:13px">Click a node or edge to see historical context.<br><br>Drag nodes to rearrange the diagram.</p>';
  }

  // ── Trace step highlight ─────────────────────────────────────────────────
  function applyTraceHighlight() {
    const step = traceSeqs[traceLoop][traceStep];
    const lp   = loopDefs[traceLoop];
    dimAllEdges();
    if (step.edge) {
      const c = lp.color;
      edgesDS.update({ id: step.edge, color: { color: c, highlight: c, hover: c }, width: 4 });
    }
    renderTracePanel();
  }

  // ── Button handlers ──────────────────────────────────────────────────────
  btnLoops.addEventListener('click', () => {
    showLoops = !showLoops;
    if (showLoops) {
      traceMode = false;
      btnTrace.textContent = 'Trace a Loop';
      btnTrace.classList.remove('active');
      btnNext.disabled = true;
      colorEdgesByLoop();
      renderLoopLegend();
      btnLoops.textContent = 'Hide Loops';
      btnLoops.classList.add('active');
      hintText.textContent = 'Edges colored by loop. Click nodes/edges for context.';
    } else {
      resetEdgeColors();
      btnLoops.textContent = 'Find Loops';
      btnLoops.classList.remove('active');
      resetPanel();
      hintText.textContent = 'Click nodes/edges for historical context';
    }
  });

  btnTrace.addEventListener('click', () => {
    traceMode = !traceMode;
    if (traceMode) {
      showLoops = false;
      btnLoops.textContent = 'Find Loops';
      btnLoops.classList.remove('active');
      traceLoop = 'R1';
      traceStep = 0;
      btnTrace.textContent = 'Stop Tracing';
      btnTrace.classList.add('active');
      btnNext.disabled = false;
      hintText.textContent = 'Select R1/R2/B1 in the panel, then click "Next Step ▶"';
      applyTraceHighlight();
    } else {
      traceMode = false;
      btnTrace.textContent = 'Trace a Loop';
      btnTrace.classList.remove('active');
      btnNext.disabled = true;
      resetEdgeColors();
      resetPanel();
      hintText.textContent = 'Click nodes/edges for historical context';
    }
  });

  btnNext.addEventListener('click', () => {
    if (!traceMode) return;
    traceStep = (traceStep + 1) % traceSeqs[traceLoop].length;
    applyTraceHighlight();
  });

  btnReset.addEventListener('click', () => {
    showLoops = false;
    traceMode = false;
    traceLoop = 'R1';
    traceStep = 0;
    resetEdgeColors();
    network.unselectAll();
    btnLoops.textContent = 'Find Loops';
    btnLoops.classList.remove('active');
    btnTrace.textContent = 'Trace a Loop';
    btnTrace.classList.remove('active');
    btnNext.disabled = true;
    resetPanel();
    hintText.textContent = 'Click nodes/edges for historical context';
    network.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
  });

  // Global hook for inline trace-loop tab buttons
  window._cldSetTraceLoop = function (id) {
    traceLoop = id;
    traceStep = 0;
    applyTraceHighlight();
  };

  // ── Network click ────────────────────────────────────────────────────────
  network.on('click', function (params) {
    if (traceMode) return;
    if (params.nodes.length > 0) {
      renderNodeInfo(params.nodes[0]);
    } else if (params.edges.length > 0) {
      renderEdgeInfo(params.edges[0]);
    } else {
      if (!showLoops) resetPanel();
    }
  });
});
