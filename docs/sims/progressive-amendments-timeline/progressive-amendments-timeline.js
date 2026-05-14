// Four Progressive Era Amendments Timeline - vis-timeline
// CANVAS_HEIGHT: 720

const CATEGORY_CLASS = {
    "Amendment 16 (Income Tax)":             "cat-amend-16",
    "Amendment 17 (Direct Senate Election)": "cat-amend-17",
    "Amendment 18 (Prohibition)":            "cat-amend-18",
    "Amendment 19 (Women's Suffrage)":       "cat-amend-19",
    "Political Context":                     "cat-political-context",
    "World War I":                           "cat-wwi"
};

const CATEGORY_COLOR = {
    "Amendment 16 (Income Tax)":             "#d4a017",
    "Amendment 17 (Direct Senate Election)": "#4b0082",
    "Amendment 18 (Prohibition)":            "#b22234",
    "Amendment 19 (Women's Suffrage)":       "#008080",
    "Political Context":                     "#4b6584",
    "World War I":                           "#6c757d"
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

function formatDates(ev) {
    const s = ev.start_date;
    const e = ev.end_date;
    if (s.year === e.year) return s.year;
    return s.year + "–" + e.year;
}

function shortContent(ev) {
    if (ev.kind === "amendment") {
        return ev.amendment_number + " (" + ev.start_date.year + ")";
    }
    if (ev.kind === "background") {
        return ev.text.headline.replace(/\s*\(.*\)\s*$/, "");
    }
    return ev.text.headline;
}

function buildItems(events) {
    return events.map(ev => {
        const cls = CATEGORY_CLASS[ev.category] || "";
        const base = {
            id: ev.id,
            content: shortContent(ev),
            start: toDate(ev.start_date),
            end:   toDate(ev.end_date),
            className: cls,
            title: "<strong>" + ev.text.headline + "</strong><br>" + ev.text.short,
            category: ev.category
        };
        if (ev.kind === "amendment") {
            base.type = "box";
        } else if (ev.kind === "background") {
            // WWI as a shaded background band
            base.type = "background";
            base.className = "cat-wwi-bg";
        } else {
            base.type = "range";
        }
        return base;
    });
}

function setWindowToItems(items) {
    if (!items.length) return;
    const starts = items.map(i => i.start.getTime());
    const ends   = items.map(i => i.end.getTime());
    const minDate = Math.min(...starts);
    const maxDate = Math.max(...ends);
    const pad = 2 * 365 * 24 * 60 * 60 * 1000;
    timeline.setWindow(new Date(minDate - pad), new Date(maxDate + pad), { animation: true });
}

function showEventDetails(id) {
    const ev = eventLookup[id];
    const panel = document.getElementById("detail-panel");
    if (!ev) {
        panel.className = "empty";
        panel.textContent = "Click any amendment or event above to see what it changed, the movement that drove it, the historical context, and what happened next.";
        return;
    }
    const color = CATEGORY_COLOR[ev.category] || "#444";
    panel.className = "";

    let html =
        '<div>' +
            '<span class="badge" style="background:' + color + '">' + ev.category + '</span>' +
            '<span class="dates">' + formatDates(ev) + '</span>' +
        '</div>' +
        '<h2>' + ev.text.headline + '</h2>' +
        '<div class="short">' + ev.text.short + '</div>' +
        '<p class="long">' + ev.text.long + '</p>';

    if (ev.movement && ev.movement !== "—") {
        html += '<div class="field"><span class="label">Movement:</span>' + ev.movement + '</div>';
    }
    if (ev.context) {
        html += '<div class="field"><span class="label">Why this timing:</span>' + ev.context + '</div>';
    }
    if (ev.next) {
        html += '<div class="next"><strong>What happened next?</strong> ' + ev.next + '</div>';
    }

    panel.innerHTML = html;
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
    setWindowToItems(shown.length ? shown : allItems);
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
        height: "420px",
        margin: { item: { horizontal: 20, vertical: 8 }, axis: 40 },
        orientation: "top",
        zoomMin: 1000 * 60 * 60 * 24 * 365 * 2,
        zoomMax: 1000 * 60 * 60 * 24 * 365 * 80,
        min: new Date(1890, 0, 1),
        max: new Date(1930, 0, 1),
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
    fetch("data.json")
        .then(r => r.json())
        .then(initTimeline)
        .catch(err => {
            document.getElementById("timeline").innerHTML =
                '<p style="color:red;padding:20px;">Failed to load data.json: ' + err + '</p>';
        });
});
