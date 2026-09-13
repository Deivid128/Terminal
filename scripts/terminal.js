const commander = document.getElementById("writer");
const commandsArea = document.getElementById("commands");
const elementsArea = document.getElementById("elements");

class Terminal {
    constructor() {
        this.backgroundColor = "black";
        this.textColor = "lime";
        this.version = "0.1.0";
        this.files = {};
        this.delay = {
            start: 0,
            delays: [],
        };
    }

    commandsHandler(s = "") {
        const [command, ...params] = s.split(" ");

        if (command in this.commands) {
            this.commands[command](...params);
        };
    }

    createNewElement(s) {
        const newCommandElement = document.createElement("div");
        const span = document.createElement("span");
        const input = document.createElement("input");

        newCommandElement.classList.add("commandElement", "alreadyUsed");
        newCommandElement.id = "commandElement";

        span.textContent = "C:\\>";

        input.classList.add("element");
        input.id = "element";
        input.readOnly = true;
        input.type = "text";
        input.value = s;

        input.style.color = this.textColor;
        span.style.color = this.textColor;

        newCommandElement.appendChild(span);
        newCommandElement.appendChild(input);

        elementsArea.appendChild(newCommandElement);

        commandsArea.scrollTop = commandsArea.scrollHeight;

    }

    clearElements() {
        const elements = document.querySelectorAll(".alreadyUsed");

        for (let i of elements) {
            elementsArea.removeChild(i);
        };
    }

    commands = {
        clear: () => terminal.clearElements(),

        help: () => {
            const line = "======================================================";
            terminal.createNewElement(line);
            for (let i of help) {
                terminal.createNewElement(` -"${i.name}"- ${i.description}`);
            };
            terminal.createNewElement(line);
        },

        background: (att, ...params) => {
            if (att in backgroundCommands) {
                backgroundCommands[att](params);
            };
        },

        calcev: (s = "") => {
            terminal.createNewElement(` ${eval(s.trim())} < `);
        },

        date: (key) => {
            function loadToUi(s) {
                terminal.createNewElement(` ${dateCommands[s]()} <`);
            }

            if (key && !(key in dateCommands)) return;

            if (key === "help") {
                dateCommands.help();
                return;
            };

            if (key === "" || key === undefined) {
                loadToUi("_DATE");
                return;
            };

            loadToUi(key)
        },

        reload: () => {
            window.location.reload();
        },

        textcolor: (color) => {
            terminal.textColor = color || "lime";

            const elements = document.querySelectorAll(".commandElement");

            for (let i of elements) {
                const span = i.querySelector("span");
                const input = i.querySelector("input");

                i.style.color = terminal.textColor;
                span.style.color = terminal.textColor;
                input.style.color = terminal.textColor;
            };
        },

        version: () => {
            terminal.createNewElement(" " + terminal.version + " <");
        },

        ["h/nasa"]: () => {
            let i = 0;

            function handler() {
                const animFrame = requestAnimationFrame(handler);
                if (i === 1000) cancelAnimationFrame(animFrame);
                terminal.createNewElement(`${dateCommands.fulltime()} || ${binary()} || ${dateCommands.unix()} `);
                i++;
            }

            handler();
        },

        delay: (type) => {
            if (type && !(type in delayCommands)) return;
            if (type === "_DELAYS") return;
            if (!type || type === "") {
                delayCommands["_DELAYS"]();
                return;
            };
            if (type) delayCommands[type]();
        },
    }
}

const terminal = new Terminal();

function binary() {
    return Array.from(
        { length: 11 },
        () => Math.random() < 0.5 ? "0" : "1"
    ).join("");
}

commander.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    terminal.createNewElement(commander.value, elementsArea);
    terminal.commandsHandler(commander.value.trim());

    commander.value = "";
});