// WWII Timeline - vis-timeline
// CANVAS_HEIGHT: 720

const SIDE_CLASS = {
    "axis":      "side-axis",
    "allied":    "side-allied",
    "homefront": "side-homefront"
};

const SIDE_COLOR = {
    "axis":      "#b22234",
    "allied":    "#1d4e7a",
    "homefront": "#b8860b"
};

const GROUP_LABEL = {
    "european":  "European Theater",
    "homefront": "Home Front",
    "pacific":   "Pacific Theater"
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
    const s = ev.start_date;
    const e = ev.end_date;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const sm = months[parseInt(s.month, 10) - 1] || "";
    const em = months[parseInt(e.month, 10) - 1] || "";
    if (s.year === e.year && s.month === e.month) {
        return sm + " " + s.year;
    }
    if (s.year === e.year) {
        return sm + "–" + em + " " + s.year;
    }
    return sm + " " + s.year + " – " + em + " " + e.year;
}

function buildItems(events) {
    return events.map(ev => {
        const sideCls = SIDE_CLASS[ev.side] || "";
        const tpCls = ev.turning_point ? " turning-point" : "";
        const star = ev.turning_point ? " *" : "";
        return {
            id: ev.id,
            content: ev.headline + star,
            start: toDate(ev.start_date),
            end:   toDate(ev.end_date),
            type: "range",
            group: ev.group,
            className: sideCls + tpCls,
            title: "<strong>" + ev.headline + "</strong><br>" + ev.short,
            side: ev.side,
            theater: ev.group,
            turning_point: ev.turning_point
        };
    });
}

function setWindowToItems(items) {
    if (!items.length) return;
    const starts = items.map(i => i.start.getTime());
    const ends   = items.map(i => i.end.getTime());
    const minDate = Math.min(...starts);
    const maxDate = Math.max(...ends);
    const pad = 30 * 24 * 60 * 60 * 1000; // 30 days
    timeline.setWindow(new Date(minDate - pad), new Date(maxDate + pad), { animation: true });
}

function showEventDetails(id) {
    const ev = eventLookup[id];
    const panel = document.getElementById("detail-panel");
    if (!ev) {
        panel.className = "empty";
        panel.textContent = "Click any event above to see what happened, why it mattered, and how it connects to other events in the war.";
        return;
    }
    const color = SIDE_COLOR[ev.side] || "#444";
    const theater = GROUP_LABEL[ev.group] || ev.group;
    const tpBadge = ev.turning_point
        ? '<span class="badge tp-badge">Turning Point</span>'
        : '';
    panel.className = "";
    panel.innerHTML =
        '<div>' +
            '<span class="badge" style="background:' + color + '">' + theater + '</span>' +
            tpBadge +
            '<span class="dates">' + formatRange(ev) + '</span>' +
        '</div>' +
        '<h2>' + ev.headline + '</h2>' +
        '<div class="short">' + ev.short + '</div>' +
        '<p class="long">' + ev.long + '</p>' +
        '<div class="connection"><strong>Connection:</strong> ' + ev.connection + '</div>';
}

function filterCategory(category) {
    document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-cat") === category);
    });

    let shown;
    if (category === "all") {
        shown = allItems;
    } else if (category === "turning") {
        shown = allItems.filter(i => i.turning_point);
    } else {
        shown = allItems.filter(i => i.theater === category);
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

    const groups = new vis.DataSet([
        { id: "european",  content: "European Theater", className: "group-european"  },
        { id: "homefront", content: "Home Front",       className: "group-homefront" },
        { id: "pacific",   content: "Pacific Theater",  className: "group-pacific"   }
    ]);

    const options = {
        width: "100%",
        height: "440px",
        margin: { item: { horizontal: 10, vertical: 6 }, axis: 30 },
        orientation: "top",
        zoomMin: 1000 * 60 * 60 * 24 * 30,       // 1 month
        zoomMax: 1000 * 60 * 60 * 24 * 365 * 20, // 20 years
        min: new Date(1939, 5, 1),
        max: new Date(1946, 2, 1),
        tooltip: { followMouse: true },
        stack: true,
        selectable: true,
        showCurrentTime: false,
        moveable: true,
        zoomable: false,
        align: "center"
    };

    timeline = new vis.Timeline(container, dataset, groups, options);

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
