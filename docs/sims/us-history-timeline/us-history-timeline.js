// U.S. History Course Timeline - vis-timeline
// CANVAS_HEIGHT: 980

const CATEGORY_CLASS = {
    "Colonial Foundations":       "cat-colonial-foundations",
    "Revolutionary Era":          "cat-revolutionary-era",
    "Antebellum America":         "cat-antebellum-america",
    "Civil War & Reconstruction": "cat-civil-war-reconstruction",
    "Industrial America":         "cat-industrial-america",
    "Modern America":             "cat-modern-america",
    "Late 20th Century":          "cat-late-20th-century",
    "21st Century":               "cat-21st-century"
};

const CATEGORY_COLOR = {
    "Colonial Foundations":       "#6b4423",
    "Revolutionary Era":          "#b22234",
    "Antebellum America":         "#d97706",
    "Civil War & Reconstruction": "#4a5d23",
    "Industrial America":         "#4b6584",
    "Modern America":             "#1d3557",
    "Late 20th Century":          "#6a4c93",
    "21st Century":               "#006d77"
};

let timeline;
let allItems = [];
let eventLookup = {};

function toDate(d) {
    const y = parseInt(d.year, 10);
    const m = d.month ? parseInt(d.month, 10) - 1 : 0;
    const day = d.day ? parseInt(d.day, 10) : 1;
    return new Date(y, m, day);
}

function formatRange(ev) {
    return ev.start_date.year + "–" + ev.end_date.year;
}

function buildItems(events) {
    return events.map(ev => {
        const cls = CATEGORY_CLASS[ev.category] || "";
        return {
            id: ev.id,
            content: "Ch " + ev.chapter + ": " + ev.start_date.year + "–" + ev.end_date.year,
            start: toDate(ev.start_date),
            end:   toDate(ev.end_date),
            type: "range",
            className: cls,
            title: "<strong>" + ev.text.headline + "</strong><br>" + ev.text.short,
            category: ev.category
        };
    });
}

function setWindowToItems(items) {
    if (!items.length) return;
    const starts = items.map(i => i.start.getTime());
    const ends   = items.map(i => i.end.getTime());
    const minDate = Math.min(...starts);
    const maxDate = Math.max(...ends);
    const pad = 3 * 365 * 24 * 60 * 60 * 1000;
    timeline.setWindow(new Date(minDate - pad), new Date(maxDate + pad), { animation: true });
}

function showEventDetails(id) {
    const ev = eventLookup[id];
    const panel = document.getElementById("detail-panel");
    if (!ev) {
        panel.className = "empty";
        panel.textContent = "Click any era above to see a detailed description of that period in U.S. history.";
        return;
    }
    const color = CATEGORY_COLOR[ev.category] || "#444";
    panel.className = "";
    panel.innerHTML =
        '<div>' +
            '<span class="badge" style="background:' + color + '">Ch ' + ev.chapter + ' &middot; ' + ev.category + '</span>' +
            '<span class="dates">' + formatRange(ev) + '</span>' +
        '</div>' +
        '<h2>' + ev.text.headline + '</h2>' +
        '<div class="short">' + ev.text.short + '</div>' +
        '<p class="long">' + ev.text.long + '</p>' +
        '<div class="skills"><strong>Liberty asks:</strong> ' + ev.skills + '</div>';
}

function filterCategory(category) {
    document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-cat") === category);
    });

    let shown;
    if (category === "all") {
        shown = allItems;
    } else {
        shown = allItems.filter(i => i.category === category);
    }
    timeline.setItems(new vis.DataSet(shown));
    setWindowToItems(shown);
}

function attachControls() {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => filterCategory(btn.getAttribute("data-cat")));
    });

    document.getElementById("btn-pan-left").addEventListener("click", () => {
        const w = timeline.getWindow();
        const span = w.end - w.start;
        const shift = span * 0.3;
        timeline.setWindow(new Date(w.start.valueOf() - shift), new Date(w.end.valueOf() - shift));
    });
    document.getElementById("btn-pan-right").addEventListener("click", () => {
        const w = timeline.getWindow();
        const span = w.end - w.start;
        const shift = span * 0.3;
        timeline.setWindow(new Date(w.start.valueOf() + shift), new Date(w.end.valueOf() + shift));
    });
    document.getElementById("btn-zoom-in").addEventListener("click", () => {
        const w = timeline.getWindow();
        const center = (w.start.valueOf() + w.end.valueOf()) / 2;
        const span = (w.end - w.start) * 0.5;
        timeline.setWindow(new Date(center - span / 2), new Date(center + span / 2));
    });
    document.getElementById("btn-zoom-out").addEventListener("click", () => {
        const w = timeline.getWindow();
        const center = (w.start.valueOf() + w.end.valueOf()) / 2;
        const span = (w.end - w.start) * 2;
        timeline.setWindow(new Date(center - span / 2), new Date(center + span / 2));
    });
    document.getElementById("btn-fit").addEventListener("click", () => {
        filterCategory("all");
    });
}

function initTimeline(data) {
    const events = data.events;
    eventLookup = {};
    events.forEach(ev => { eventLookup[ev.id] = ev; });

    allItems = buildItems(events);

    const container = document.getElementById("timeline");
    const dataset = new vis.DataSet(allItems);

    const options = {
        width: "100%",
        height: "580px",
        margin: { item: { horizontal: 30, vertical: 5 }, axis: 40 },
        orientation: "top",
        zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,
        zoomMax: 1000 * 60 * 60 * 24 * 365 * 700,
        min: new Date(1400, 0, 1),
        max: new Date(2040, 0, 1),
        tooltip: { followMouse: true },
        stack: true,
        selectable: true,
        showCurrentTime: false,
        moveable: true,
        zoomable: false,
        align: "center"
    };

    timeline = new vis.Timeline(container, dataset, options);

    // Allow vertical page scroll over the timeline; pan only on explicit horizontal wheel.
    container.addEventListener("wheel", function(e) {
        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (!isHorizontal) {
            e.stopImmediatePropagation();
        } else {
            e.preventDefault();
            const w = timeline.getWindow();
            const interval = w.end - w.start;
            const shift = (e.deltaX / container.clientWidth) * interval;
            timeline.setWindow(
                new Date(w.start.valueOf() + shift),
                new Date(w.end.valueOf() + shift),
                { animation: false }
            );
        }
    }, true);

    timeline.on("select", function(props) {
        if (props.items.length > 0) {
            showEventDetails(props.items[0]);
        }
    });

    setWindowToItems(allItems);
    attachControls();
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("timeline.json")
        .then(r => r.json())
        .then(initTimeline)
        .catch(err => {
            document.getElementById("timeline").innerHTML =
                '<p style="color:red;padding:20px;">Failed to load timeline.json: ' + err + '</p>';
        });
});
