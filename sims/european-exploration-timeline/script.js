const nationColors = {
    'Portugal':    '#007832',
    'Spain':       '#c81e1e',
    'England':     '#641414',
    'France':      '#1e50b4',
    'Netherlands': '#e67800'
};

let timeline;
let timelineData;
let allItems = [];
let activeFilter = 'all';

function isInteractionEnabled() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('enable-interaction') === 'true';
}

document.addEventListener('DOMContentLoaded', function() {
    loadTimelineData();
});

function loadTimelineData() {
    fetch('timeline.json')
        .then(response => response.json())
        .then(data => {
            allItems = data.events.map((event, index) => {
                const year  = parseInt(event.start_date.year);
                const month = event.start_date.month ? parseInt(event.start_date.month) - 1 : 0;
                const day   = event.start_date.day   ? parseInt(event.start_date.day)   : 1;
                const color = nationColors[event.group] || '#64748b';

                return {
                    id: index,
                    content: event.text.headline,
                    start: new Date(year, month, day),
                    title: `<strong>${event.text.headline}</strong><br>${event.notes || event.text.text}`,
                    category: event.group,
                    description: event.text.text,
                    context: event.notes,
                    style: `background-color:${color};color:white;border-color:${color};`
                };
            });

            timelineData = new vis.DataSet(allItems);

            const interactionEnabled = isInteractionEnabled();
            const options = {
                width: '100%',
                height: '360px',
                margin: {
                    item: { horizontal: 50, vertical: 8 },
                    axis: 40
                },
                orientation: 'top',
                zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,
                zoomMax: 1000 * 60 * 60 * 24 * 365 * 200,
                min: new Date(1440, 0, 1),
                max: new Date(1640, 0, 1),
                tooltip: { followMouse: true },
                stack: true,
                selectable: true,
                showCurrentTime: false,
                moveable: interactionEnabled,
                zoomable: interactionEnabled,
                align: 'center'
            };

            const container = document.getElementById('timeline');
            timeline = new vis.Timeline(container, timelineData, options);

            setWindowWithPadding(allItems);

            // Scroll hijacking fix: capture vertical wheel events before vis-timeline
            container.addEventListener('wheel', function(e) {
                const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
                if (!isHorizontal) {
                    e.stopImmediatePropagation();
                } else {
                    e.preventDefault();
                    const win = timeline.getWindow();
                    const interval = win.end - win.start;
                    const shift = (e.deltaX / container.clientWidth) * interval;
                    timeline.setWindow(
                        new Date(win.start.valueOf() + shift),
                        new Date(win.end.valueOf() + shift),
                        { animation: false }
                    );
                }
            }, true);

            timeline.on('select', function(properties) {
                if (properties.items.length > 0) {
                    showEventDetails(properties.items[0]);
                }
            });
        })
        .catch(error => {
            console.error('Error loading timeline data:', error);
            document.getElementById('timeline').innerHTML =
                '<p style="color:#dc2626;padding:40px;text-align:center;">Error loading timeline data. If opening locally, serve via a web server.</p>';
        });
}

function setWindowWithPadding(items) {
    if (items.length === 0) return;
    const dates  = items.map(item => item.start.getTime());
    const minMs  = Math.min(...dates);
    const maxMs  = Math.max(...dates);
    const padMs  = 5 * 365 * 24 * 60 * 60 * 1000; // 5 years each side
    timeline.setWindow(new Date(minMs - padMs), new Date(maxMs + padMs), { animation: false });
}

function filterCategory(category) {
    activeFilter = category;
    updateActiveButton(category);

    if (category === 'all') {
        timelineData.clear();
        timelineData.add(allItems);
        setWindowWithPadding(allItems);
    } else {
        const filtered = allItems.filter(item => item.category === category);
        timelineData.clear();
        timelineData.add(filtered);
        setWindowWithPadding(filtered);
    }
    document.getElementById('event-details').innerHTML =
        'Click an event on the timeline to see details here.';
}

function updateActiveButton(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.filter-btn.${category === 'all' ? 'all' :
        category.toLowerCase().replace(/\s+/g, '')}`);
    if (activeBtn) activeBtn.classList.add('active');
}

function showEventDetails(itemId) {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    const year  = item.start.getFullYear();
    const color = nationColors[item.category] || '#64748b';

    let html = `
        <div class="event-title">${item.content}</div>
        <div class="event-meta">
            <span class="event-year">${year}</span>
            <span class="event-nation-badge" style="background:${color}">${item.category}</span>
        </div>
        <div class="event-description">${item.description}</div>
    `;
    if (item.context) {
        html += `<div class="event-context">${item.context}</div>`;
    }
    document.getElementById('event-details').innerHTML = html;
}

function panLeft() {
    const range    = timeline.getWindow();
    const interval = (range.end - range.start) * 0.3;
    timeline.setWindow(range.start - interval, range.end - interval);
}

function panRight() {
    const range    = timeline.getWindow();
    const interval = (range.end - range.start) * 0.3;
    timeline.setWindow(range.start + interval, range.end + interval);
}

function zoomIn() {
    const range    = timeline.getWindow();
    const center   = (range.start.getTime() + range.end.getTime()) / 2;
    const newSpan  = (range.end - range.start) * 0.5;
    timeline.setWindow(center - newSpan / 2, center + newSpan / 2);
}

function zoomOut() {
    const range    = timeline.getWindow();
    const center   = (range.start.getTime() + range.end.getTime()) / 2;
    const newSpan  = (range.end - range.start) * 2;
    timeline.setWindow(center - newSpan / 2, center + newSpan / 2);
}

function fitAll() {
    const current = timelineData.get();
    setWindowWithPadding(current);
}
