/* Reform Movement Network MicroSim
 * Antebellum reform movements (1830–1860) as an interactive graph.
 * Library: vis-network
 */

(function () {
    'use strict';

    // Color and shape conventions per node type
    var TYPE_STYLE = {
        movement: {
            shape: 'dot',
            size: 32,
            color: { background: '#f0b400', border: '#9c7400', highlight: { background: '#ffd54a', border: '#9c7400' } },
            font: { color: '#212529', size: 16, face: 'Segoe UI, sans-serif', bold: true }
        },
        person: {
            shape: 'dot',
            size: 22,
            color: { background: '#5b4ea3', border: '#33285f', highlight: { background: '#8779c9', border: '#33285f' } },
            font: { color: '#ffffff', size: 13, face: 'Segoe UI, sans-serif', strokeWidth: 0 }
        },
        organization: {
            shape: 'box',
            size: 16,
            color: { background: '#1f9c8a', border: '#0f5e52', highlight: { background: '#4cc2b1', border: '#0f5e52' } },
            font: { color: '#ffffff', size: 12, face: 'Segoe UI, sans-serif' },
            margin: 8
        },
        idea: {
            shape: 'diamond',
            size: 22,
            color: { background: '#f59e0b', border: '#a8660a', highlight: { background: '#fbbf5a', border: '#a8660a' } },
            font: { color: '#212529', size: 12, face: 'Segoe UI, sans-serif' }
        }
    };

    // Movement membership map: which nodes "belong to" each movement filter
    var MOVEMENT_FILTERS = {
        abolitionism: {
            label: 'Abolitionism only',
            include: function (node, edges) {
                if (node.id === 'abolitionism') return true;
                // include nodes directly connected to abolitionism
                return edges.some(function (e) {
                    return (e.from === 'abolitionism' && e.to === node.id) ||
                           (e.to === 'abolitionism' && e.from === node.id);
                });
            }
        },
        'womens-rights': {
            label: "Women's Rights only",
            include: function (node, edges) {
                if (node.id === 'womens-rights') return true;
                return edges.some(function (e) {
                    return (e.from === 'womens-rights' && e.to === node.id) ||
                           (e.to === 'womens-rights' && e.from === node.id);
                });
            }
        }
    };

    var rawData = null;
    var network = null;
    var nodesDataset = null;
    var edgesDataset = null;
    var allNodes = [];   // built vis-network node objects
    var allEdges = [];   // built vis-network edge objects
    var currentFilter = 'all';

    function buildNodes(data) {
        return data.nodes.map(function (n) {
            var style = TYPE_STYLE[n.type] || TYPE_STYLE.idea;
            return {
                id: n.id,
                label: wrapLabel(n.label),
                title: n.label + ' (' + capitalize(n.type) + ')',
                shape: style.shape,
                size: style.size,
                color: style.color,
                font: style.font,
                margin: style.margin,
                // Carry domain metadata for click handlers
                _type: n.type,
                _name: n.label,
                _description: n.description
            };
        });
    }

    function buildEdges(data) {
        return data.edges.map(function (e, i) {
            var strong = e.strength === 'strong';
            return {
                id: 'e' + i,
                from: e.from,
                to: e.to,
                label: e.label,
                arrows: 'to',
                width: strong ? 2.5 : 1,
                dashes: strong ? false : [4, 6],
                color: {
                    color: strong ? '#666666' : '#a8a8a8',
                    highlight: '#1a3a6c',
                    hover: '#1a3a6c'
                },
                font: {
                    color: '#444',
                    size: 10,
                    face: 'Segoe UI, sans-serif',
                    align: 'middle',
                    background: 'rgba(255,255,255,0.7)',
                    strokeWidth: 0
                },
                smooth: { type: 'continuous' },
                _label: e.label,
                _explanation: e.explanation,
                _strength: e.strength
            };
        });
    }

    function wrapLabel(text) {
        // Wrap long labels onto two lines for readability inside circles/boxes
        if (text.length <= 14) return text;
        var words = text.split(' ');
        if (words.length === 1) return text;
        var mid = Math.ceil(words.length / 2);
        return words.slice(0, mid).join(' ') + '\n' + words.slice(mid).join(' ');
    }

    function capitalize(s) {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function createNetwork(container) {
        nodesDataset = new vis.DataSet(allNodes);
        edgesDataset = new vis.DataSet(allEdges);

        var data = { nodes: nodesDataset, edges: edgesDataset };

        var options = {
            interaction: {
                hover: true,
                tooltipDelay: 200,
                zoomView: true,
                dragView: true,
                navigationButtons: false
            },
            physics: {
                enabled: true,
                solver: 'forceAtlas2Based',
                forceAtlas2Based: {
                    gravitationalConstant: -55,
                    centralGravity: 0.012,
                    springLength: 130,
                    springConstant: 0.08,
                    damping: 0.6,
                    avoidOverlap: 0.6
                },
                stabilization: {
                    enabled: true,
                    iterations: 250,
                    fit: true
                },
                minVelocity: 0.5
            },
            nodes: {
                borderWidth: 2,
                shadow: { enabled: true, size: 4, x: 1, y: 2, color: 'rgba(0,0,0,0.15)' }
            },
            edges: {
                selectionWidth: 1.5,
                hoverWidth: 0.5
            }
        };

        network = new vis.Network(container, data, options);

        network.on('stabilizationIterationsDone', function () {
            // Damp physics so the layout doesn't keep wandering after click
            network.setOptions({ physics: { enabled: false } });
        });

        network.on('click', function (params) {
            if (params.nodes && params.nodes.length > 0) {
                showNodeDetail(params.nodes[0]);
            } else if (params.edges && params.edges.length > 0) {
                showEdgeDetail(params.edges[0]);
            } else {
                showEmptyPanel();
            }
        });
    }

    function connectionsFor(nodeId) {
        var out = [];
        allEdges.forEach(function (e) {
            if (e.from === nodeId || e.to === nodeId) out.push(e);
        });
        return out;
    }

    function findNodeById(id) {
        for (var i = 0; i < allNodes.length; i++) {
            if (allNodes[i].id === id) return allNodes[i];
        }
        return null;
    }

    function showNodeDetail(nodeId) {
        var node = findNodeById(nodeId);
        if (!node) return;
        var conns = connectionsFor(nodeId);

        var related = conns.map(function (e) {
            var otherId = (e.from === nodeId) ? e.to : e.from;
            var other = findNodeById(otherId);
            var dir = (e.from === nodeId) ? '→' : '←';
            return '<li>' + dir + ' ' + escapeHtml(other ? other._name : otherId) +
                   ' <span style="color:#888;">(' + escapeHtml(e._label) + ')</span></li>';
        }).join('');

        var html =
            '<h2>' + escapeHtml(node._name) + '</h2>' +
            '<span class="type-tag ' + node._type + '">' + capitalize(node._type) + '</span>' +
            '<p class="desc">' + escapeHtml(node._description) + '</p>' +
            '<div class="meta-row"><strong>Connections:</strong> ' + conns.length + '</div>' +
            (conns.length ? '<ul>' + related + '</ul>' : '');

        document.getElementById('panel').innerHTML = html;
    }

    function showEdgeDetail(edgeId) {
        var edge = null;
        for (var i = 0; i < allEdges.length; i++) {
            if (allEdges[i].id === edgeId) { edge = allEdges[i]; break; }
        }
        if (!edge) return;
        var fromNode = findNodeById(edge.from);
        var toNode = findNodeById(edge.to);
        var strengthText = edge._strength === 'strong' ? 'Strong / direct' : 'Indirect';

        var html =
            '<h2>Relationship</h2>' +
            '<span class="type-tag edge">Edge</span>' +
            '<div class="meta-row"><strong>' + escapeHtml(fromNode ? fromNode._name : edge.from) +
                '</strong> &rarr; <strong>' + escapeHtml(toNode ? toNode._name : edge.to) + '</strong></div>' +
            '<div class="meta-row"><strong>Label:</strong> ' + escapeHtml(edge._label) + '</div>' +
            '<div class="meta-row"><strong>Strength:</strong> ' + strengthText + '</div>' +
            '<p class="desc" style="margin-top:10px;">' + escapeHtml(edge._explanation) + '</p>';

        document.getElementById('panel').innerHTML = html;
    }

    function showEmptyPanel() {
        document.getElementById('panel').innerHTML =
            '<h2>Reform Movement Network</h2>' +
            '<p class="empty-hint">Click any node to see its description and connections. ' +
            'Click an edge to read a short historical note about that relationship. ' +
            'Use the filters above to focus on a single movement or just the people.</p>' +
            '<p class="empty-hint" style="margin-top:10px;"><strong>Tip:</strong> drag nodes to rearrange the layout. ' +
            'Scroll inside the graph to zoom.</p>';
    }

    function escapeHtml(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ----- Filtering -----

    function applyFilter(name) {
        currentFilter = name;
        updateFilterButtons();

        var visibleIds = computeVisibleNodeIds(name);

        // Update nodes: hidden if not in visibleIds
        var nodeUpdates = allNodes.map(function (n) {
            return { id: n.id, hidden: !visibleIds[n.id] };
        });
        nodesDataset.update(nodeUpdates);

        // Update edges: hidden if either endpoint is hidden
        var edgeUpdates = allEdges.map(function (e) {
            return { id: e.id, hidden: !(visibleIds[e.from] && visibleIds[e.to]) };
        });
        edgesDataset.update(edgeUpdates);

        // Re-enable physics briefly so the visible subgraph re-lays out nicely
        if (network) {
            network.setOptions({ physics: { enabled: true } });
            network.stabilize(150);
            setTimeout(function () {
                if (network) network.setOptions({ physics: { enabled: false } });
            }, 1500);
            network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
        }
    }

    function computeVisibleNodeIds(name) {
        var ids = {};
        if (name === 'all' || !name) {
            allNodes.forEach(function (n) { ids[n.id] = true; });
            return ids;
        }
        if (name === 'people') {
            allNodes.forEach(function (n) {
                if (n._type === 'person') ids[n.id] = true;
            });
            return ids;
        }
        var f = MOVEMENT_FILTERS[name];
        if (f) {
            allNodes.forEach(function (n) {
                if (f.include(n, rawData.edges)) ids[n.id] = true;
            });
            return ids;
        }
        // fallback: all
        allNodes.forEach(function (n) { ids[n.id] = true; });
        return ids;
    }

    function updateFilterButtons() {
        var btns = document.querySelectorAll('.filter-btn');
        btns.forEach(function (b) {
            if (b.getAttribute('data-filter') === currentFilter) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    }

    function bindFilterButtons() {
        var btns = document.querySelectorAll('.filter-btn');
        btns.forEach(function (b) {
            b.addEventListener('click', function () {
                var f = b.getAttribute('data-filter');
                if (f === 'reset') {
                    applyFilter('all');
                    if (network) {
                        network.setOptions({ physics: { enabled: true } });
                        network.stabilize(250);
                        setTimeout(function () {
                            if (network) network.setOptions({ physics: { enabled: false } });
                        }, 2000);
                        network.fit({ animation: { duration: 600, easingFunction: 'easeInOutQuad' } });
                    }
                } else {
                    applyFilter(f);
                }
            });
        });
    }

    // ----- Bootstrap -----

    function init(data) {
        rawData = data;
        allNodes = buildNodes(data);
        allEdges = buildEdges(data);
        createNetwork(document.getElementById('network'));
        bindFilterButtons();
        showEmptyPanel();
        applyFilter('all');
    }

    function loadData() {
        // Prefer fetching data.json, fall back to embedded copy if fetch fails (e.g. file:// access)
        fetch('data.json')
            .then(function (r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            })
            .then(init)
            .catch(function (err) {
                console.warn('Failed to fetch data.json, using embedded fallback:', err);
                if (window.REFORM_DATA_FALLBACK) {
                    init(window.REFORM_DATA_FALLBACK);
                } else {
                    document.getElementById('panel').innerHTML =
                        '<h2>Error</h2><p class="desc">Could not load network data.</p>';
                }
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadData);
    } else {
        loadData();
    }
})();
