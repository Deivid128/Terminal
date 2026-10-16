const commandsArea = document.getElementById("commands");
const elementsArea = document.getElementById("elements");

class Terminal {
    constructor() {
        this.backgroundColor = "black";
        this.textColor = "lime";
        this.version = "0.1.7 ";

        this.files = {
            default: {
                alreadyUseds: [
                    this.createNewElement("default", 'Digite "help" para ver os comandos'),
                ],
                currentWriter: this.#createWriter("default"),
                name: "default",
            }
        };

        this.delay = {
            start: 0,
            delays: [],
        };

        this.morseCode = {
            cripted: {
                ["A"]: ".-",
                ["B"]: "-...",
                ["C"]: "-.-.",
                ["D"]: "-..",
                ["E"]: ".",
                ["F"]: "..-.",
                ["G"]: "--.",
                ["H"]: "....",
                ["I"]: "..",
                ["J"]: ".---",
                ["K"]: "-.-",
                ["L"]: ".-..",
                ["M"]: "--",
                ["N"]: "-.",
                ["O"]: "---",
                ["P"]: ".--.",
                ["Q"]: "--.-",
                ["R"]: ".-.",
                ["S"]: "...",
                ["T"]: "-",
                ["U"]: "..-",
                ["V"]: "...-",
                ["W"]: ".--",
                ["X"]: "-..-",
                ["Y"]: "-.--",
                ["Z"]: "--..",
                [" "]: "/",
                ["?"]: "..--..",
                ["!"]: "-.-.--",
                [":"]: "---...",
                [`'`]: ".----.",
                [`"`]: ".-..-.",
                ["."]: ".-.-.-",
                [","]: "--..--",
                ["0"]: "-----",
                ["1"]: ".----",
                ["2"]: "..---",
                ["3"]: "...--",
                ["4"]: "....-",
                ["5"]: ".....",
                ["6"]: "----.",
                ["7"]: "---..",
                ["8"]: "--...",
                ["9"]: "----.",
            },

            decripted: {
                [".-"]: "A",
                ["-..."]: "B",
                ["-.-."]: "C",
                ["-.."]: "D",
                ["."]: "E",
                ["..-."]: "F",
                ["--."]: "G",
                ["...."]: "H",
                [".."]: "I",
                [".---"]: "J",
                ["-.-"]: "K",
                [".-.."]: "L",
                ["--"]: "M",
                ["-."]: "N",
                ["---"]: "O",
                [".--."]: "P",
                ["--.-"]: "Q",
                [".-."]: "R",
                ["..."]: "S",
                ["-"]: "T",
                ["..-"]: "U",
                ["...-"]: "V",
                [".--"]: "W",
                ["-..-"]: "X",
                ["-.--"]: "Y",
                ["--.."]: "Z",
                ["/"]: " ",
                ["---..."]: ":",
                [".----."]: "'",
                [".-..-."]: `"`,
                ["..--.."]: "?",
                ["-.-.--"]: "!",
                [".-.-.-"]: ".",
                ["--..--"]: `,`,
                ["-----"]: "0",
                [".----"]: "1",
                ["..---"]: "2",
                ["...--"]: "3",
                ["....-"]: "4",
                ["....."]: "5",
                ["----."]: "6",
                ["---.."]: "7",
                ["--..."]: "8",
                ["----."]: "9",
            },
        };

        this.setFile("default");
    }

    currentFile = {};

    setFile(fileName) {
        this.currentFile = this.files[fileName];
    }

    commandsHandler(s = "") {
        const [command, ...params] = s.split(" ");

        if (command in this.commands) {
            this.commands[command](...params);
        };
    }

    #createWriter(fileName) {
        const writerN = document.createElement("div");
        writerN.classList.add("commandElement");
        writerN.id = "digit";

        const span = document.createElement("span");
        span.textContent = `C:\\${fileName == "default" ? "" : fileName}>`;
        span.style.color = this.textColor;

        const input = document.createElement("input");
        input.classList.add("writer");
        input.id = "writer";
        input.type = "text";

        writerN.appendChild(span);
        writerN.appendChild(input);

        commandsArea.appendChild(writerN);
        commandsArea.scrollTop = commandsArea.scrollHeight;

        return input;
    }

    createNewElement(fileName, text) {
        const newCommandElement = document.createElement("div");
        const span = document.createElement("span");
        const input = document.createElement("input");

        newCommandElement.classList.add("commandElement", "alreadyUsed");
        newCommandElement.id = "commandElement";

        span.textContent = `C:\\${fileName == "default" ? "" : fileName}>`;

        input.classList.add("element");
        input.readOnly = true;
        input.type = "text";
        input.value = text;

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
            helpsHandler("default", "help");
        },

        background: (att, ...params) => {
            if (att in backgroundCommands) {
                backgroundCommands[att](params);
            };
        },

        calcev: (...s) => {
            let toCalc = "";
            for (let i of s) {
                toCalc += i;
            };
            terminal.createNewElement(terminal.currentFile.name, ` ${eval(toCalc.trim())} < `);
        },

        date: (key) => {
            function loadToUi(s) {
                terminal.createNewElement(terminal.currentFile.name, ` ${dateCommands[s]()} <`);
            }

            if (key && !(key in dateCommands)) return;
            if (key === "_DATE") return;

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
            terminal.createNewElement(terminal.currentFile.name, " " + terminal.version + " <");
        },

        ["h/nasa"]: () => {
            let i = 0;

            function handler() {
                const animFrame = requestAnimationFrame(handler);
                if (i === 500) cancelAnimationFrame(animFrame);
                terminal.createNewElement(terminal.currentFile.name, `${dateCommands.fulltime()} || ${binary()} || ${dateCommands.unix()} `);
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

        morse: (act, ...text) => {
            if (act in morseCommands) {
                morseCommands[act](text);
            };
        },

        cesar: (act = "", interval, ...text) => {
            if (act in cesarCommands) {
                cesarCommands[act](interval, text);
            };
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

terminal.files.default.currentWriter.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    terminal.createNewElement(terminal.currentFile.name, terminal.currentFile.currentWriter.value);
    terminal.commandsHandler(terminal.currentFile.currentWriter.value.trim());

    terminal.currentFile.currentWriter.value = "";
});