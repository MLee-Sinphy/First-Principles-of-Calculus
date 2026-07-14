const xInput = document.querySelector("#x-input");
const xSlider = document.querySelector("#x-slider");
const functionValue = document.querySelector("#function-value");
const pointCoordinates = document.querySelector("#point-coordinates");

const f = (x) => x ** 2;

const board = JXG.JSXGraph.initBoard("limits-board", {
    boundingbox: [-5.5, 8, 5.5, -2],
    axis: true,
    keepAspectRatio: false,
    showCopyright: false,
    showNavigation: true,
    pan: {
        enabled: true,
    },
    zoom: {
        wheel: true,
        pinch: true,
        needShift: false,
    },
});

board.create(
    "functiongraph",
    [f, -5.5, 5.5],
    {
        strokeWidth: 3,
        fixed: true,
        highlight: false,
    },
);

const point = board.create(
    "glider",
    [2, f(2), board.defaultAxes.x],
    {
        name: "P",
        size: 5,
        fixed: false,
        showInfobox: true,
        snapSizeX: 0.1,
    },
);

point.on("drag", () => {
    const x = clamp(point.X(), -5, 5);
    setX(x, false);
});

xInput.addEventListener("input", () => {
    const x = parseInput(xInput.value);
    setX(x);
});

xSlider.addEventListener("input", () => {
    const x = Number(xSlider.value);
    setX(x);
});

function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
}

function parseInput(value) {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) {
        return 0;
    }

    return clamp(parsedValue, -5, 5);
}

function formatNumber(value) {
    if (Math.abs(value) < 1e-10) {
        return "0";
    }

    return Number.parseFloat(value.toFixed(4)).toString();
}

function setX(value, movePoint = true) {
    const x = clamp(value, -5, 5);
    const y = f(x);

    xInput.value = formatNumber(x);
    xSlider.value = x;

    functionValue.textContent =
        `f(${formatNumber(x)}) = ${formatNumber(y)}`;

    pointCoordinates.textContent =
        `(${formatNumber(x)}, ${formatNumber(y)})`;

    if (movePoint) {
        point.moveTo([x, y], 120);
    }

    board.update();
}

setX(2);