const W1_line = "------------------------------------------------------";
const W2_line = "======================================================";
const BAR_line = "//////////////////////////////////////////////////////";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const regex = /[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/;

const backgroundCommands = {
    color: (color) => {
        terminal.backgroundColor = color || "black";
        commandsArea.style.backgroundColor = terminal.backgroundColor;
    },

    help: () => {
        helpsHandler("default", "backgroundHelp");
    }
}

const dateCommands = {
    unix: () => {
        return String(Date.now());
    },

    hours: () => {
        return String(new Date().getHours()).padStart(2, "0");
    },

    minutes: () => {
        return String(new Date().getMinutes()).padStart(2, "0");
    },

    seconds: () => {
        return String(new Date().getSeconds()).padStart(2, "0");
    },

    milliseconds: () => {
        return String(new Date().getMilliseconds()).padStart(3, "0");
    },

    fulltime: () => {
        return `${dateCommands.hours()}:${dateCommands.minutes()}:${dateCommands.seconds()}:${dateCommands.milliseconds()}`;
    },

    day: () => {
        return String(new Date().getDate()).padStart(2, "0");
    },

    month: () => {
        return String(new Date().getMonth() + 1).padStart(2, "0");
    },

    year: () => {
        return String(new Date().getFullYear());
    },

    fulldate: () => {
        return `${dateCommands.day()}/${dateCommands.month()}/${dateCommands.year()}`;
    },

    _DATE: () => {
        return `${dateCommands.fulldate()} | ${dateCommands.fulltime()}`;
    },

    help: () => {
        helpsHandler("default", "dateHelp");
    },
}

const delayCommands = {
    start: () => {
        if (terminal.delay.start) {
            terminal.createNewElement(terminal.currentFile.name, ` Você já tem um tempo iniciado. Digite 'delay end' para resetar`);
            return;
        };

        terminal.delay.start = Number(dateCommands.unix());
        terminal.createNewElement(terminal.currentFile.name, ` Tempo 0, salvo: ${terminal.delay.start} <`);
    },

    end: () => {
        if (!terminal.delay.start) {
            terminal.createNewElement(terminal.currentFile.name, ` Não a um tempo iniciado. Digite 'delay start' para começar`);
            return;
        };
        const end = Number(dateCommands.unix());

        terminal.createNewElement(terminal.currentFile.name, W2_line);

        terminal.createNewElement(terminal.currentFile.name, ` Tempo 1, salvo: ${end} <`);
        terminal.createNewElement(terminal.currentFile.name, ` Calculando...`);

        const diference = end - terminal.delay.start;

        let seconds = Math.floor(diference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds %= 60;
        minutes %= 60;

        const formattedSeconds = String(seconds).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedHours = String(hours).padStart(2, "0");

        terminal.createNewElement(terminal.currentFile.name, ` Diferança: ${diference} <`);
        terminal.createNewElement(terminal.currentFile.name, ` Tempo de 0 -> 1. Horas: ${formattedHours}; Minutos: ${formattedMinutes}; Segundos: ${formattedSeconds} <`);

        terminal.createNewElement(terminal.currentFile.name, W2_line);

        const newDelayOBJ = {
            start: terminal.delay.start,
            end: end,

            unixDiference: diference,
            time: `Horas: ${hours}; Minutos: ${minutes}; Segundos: ${seconds}`,
        };

        terminal.delay.delays.push(newDelayOBJ);

        terminal.delay.start = 0;
    },

    _DELAYS: () => {
        terminal.createNewElement(terminal.currentFile.name, "Mostrando os objetos 'delay' salvos...");

        terminal.createNewElement(terminal.currentFile.name, W2_line);

        const ln = terminal.delay.delays.length;
        terminal.createNewElement(terminal.currentFile.name, `Quantidade existente: ${ln}`);
        if (ln > 0) terminal.createNewElement(terminal.currentFile.name, BAR_line);

        for (let i = 0; i < ln; i++) {
            terminal.createNewElement(terminal.currentFile.name, ` Start (0): ${terminal.delay.delays[i].start} `);
            terminal.createNewElement(terminal.currentFile.name, ` End (1): ${terminal.delay.delays[i].end} `);
            terminal.createNewElement(terminal.currentFile.name, ` Diferença: ${terminal.delay.delays[i].unixDiference} `);
            terminal.createNewElement(terminal.currentFile.name, ` Tempo de 0 -> 1: ${terminal.delay.delays[i].time} `);
            if (ln > 1 && i + 1 !== ln) terminal.createNewElement(terminal.currentFile.name, W1_line);
        };

        terminal.createNewElement(terminal.currentFile.name, W2_line);
    },
}

const morseCommands = {
    encrypt: (text) => {
        let newText = "";
        for (let i in text) {
            const splited = text[i].split("");

            if (i != 0) {
                newText += " / ";
            };

            for (let j in splited) {
                let coded = terminal.morseCode.cripted[splited[j].toUpperCase()];
                if (!coded | coded === "undefined" | coded === undefined) coded = "irreconhecivel";

                if (j == 0) {
                    newText += coded;
                    continue;
                };
                newText += " " + coded;
            };
        };

        terminal.createNewElement(terminal.currentFile.name, ` ${newText} <`);
    },

    decrypt: (text) => {
        let newText = "";
        for (let i in text) {
            const splited = text[i];

            let coded = terminal.morseCode.decripted[splited];
            if (!coded | coded === "undefined" | coded === undefined) coded = "irreconhecivel";

            if (i == 0) {
                newText += coded;
                continue;
            };
            newText += coded;
        };

        terminal.createNewElement(terminal.currentFile.name, ` ${newText} <`);
    },

    help: () => {
        helpsHandler("default", "morseHelp");
    },

    codes: () => {
        for (let i in terminal.morseCode.cripted) {
            terminal.createNewElement(terminal.currentFile.name, ` " ${i} " = '${terminal.morseCode.cripted[i]}'`);
        };
    },
}

const cesarCommands = {

    _isUpperCase_: (string) => {
        return string === string.toUpperCase() && string !== string.toLowerCase();
    },

    _isLowerCase_: (string) => {
        return string === string.toLowerCase() && string !== string.toUpperCase();
    },

    translate: (interval = 0, text = "") => {
        interval = Math.max(-13, Math.min(interval, 13));

        let translated = "";

        for (i in text) {
            const word = text[i].split("");

            for (j in word) {
                let letter = word[j];

                const isUpperCase = cesarCommands._isUpperCase_(letter);
                if (!isUpperCase) letter = letter.toUpperCase();

                if (/\d/.test(letter)) {
                    translated += letter;
                    continue;
                };

                if (regex.test(letter)) {
                    terminal.createNewElement(terminal.currentFile.name, W1_line);
                    terminal.createNewElement(terminal.currentFile.name, ` NÃO USE LETRAS COM ACENTO <`);
                    terminal.createNewElement(terminal.currentFile.name, ` LETRAS COM ACENTO NÃO PODEM SER CONVERTIDAS CORRETAMENTE <`);
                    terminal.createNewElement(terminal.currentFile.name, ` RECOMENDA-SE USAR PALAVRAS EM INGLÊS <`);
                    terminal.createNewElement(terminal.currentFile.name, W1_line);

                    return console.warn("Não use letras com acento!");
                };

                if (!alphabet.includes(letter.toUpperCase())) {
                    translated += letter;
                    continue;
                };

                let position = alphabet.indexOf(letter) + interval;
                position = ((position % 26) + 26) % 26;

                let encryptedLetter = alphabet[position];

                translated += !isUpperCase ? encryptedLetter.toLocaleLowerCase() : encryptedLetter;
            };

            if (i !== 0) {
                translated += " ";
                continue;
            };

        };

        terminal.createNewElement(terminal.currentFile.name, ` ${translated} <`);
    },

    help: () => {
        helpsHandler("default", "cesarHelp");
    },
}