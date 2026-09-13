const W2_line = "======================================================";
const W1_line = "------------------------------------------------------";
const BAR_line = "//////////////////////////////////////////////////////";

const backgroundCommands = {
    color: (color) => {
        terminal.backgroundColor = color || "black";
        commandsArea.style.backgroundColor = terminal.backgroundColor;
    },

    help: () => {
        terminal.createNewElement(W2_line);
        for (let i of backgroundHelp) {
            terminal.createNewElement(` -"${i.name}"- ${i.description}`);
        };
        terminal.createNewElement(W2_line);
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
        terminal.createNewElement(W2_line);
        for (let i of dateHelp) {
            terminal.createNewElement(` -"${i.name}"- ${i.description}`);
        };
        terminal.createNewElement(W2_line);
    },
}

const delayCommands = {
    start: () => {
        if (terminal.delay.start) {
            terminal.createNewElement(` Você já tem um tempo iniciado. Digite 'delay end' para resetar <`);
            return;
        };

        terminal.delay.start = Number(dateCommands.unix());
        terminal.createNewElement(` Tempo 0, salvo: ${terminal.delay.start} <`);
    },

    end: () => {
        if (!terminal.delay.start) return;
        const end = Number(dateCommands.unix());

        terminal.createNewElement(W2_line);

        terminal.createNewElement(` Tempo 1, salvo: ${end} <`);
        terminal.createNewElement(` Calculando...`);

        const diference = end - terminal.delay.start;

        let seconds = Math.floor(diference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds %= 60;
        minutes %= 60;

        const formattedSeconds = String(seconds).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedHours = String(hours).padStart(2, "0");

        terminal.createNewElement(` Diferança: ${diference} <`);
        terminal.createNewElement(` Tempo de 0 -> 1. Horas: ${formattedHours}; Minutos: ${formattedMinutes}; Segundos: ${formattedSeconds} <`);

        terminal.createNewElement(W2_line);

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
        terminal.createNewElement("Mostrando os objetos 'delay' salvos...");

        terminal.createNewElement(W2_line);

        const ln = terminal.delay.delays.length;
        terminal.createNewElement(`Quantidade existente: ${ln}`);
        if (ln > 0) terminal.createNewElement(BAR_line);

        for (let i = 0; i < ln; i++) {
            terminal.createNewElement(` Start (0): ${terminal.delay.delays[i].start} `);
            terminal.createNewElement(` End (1): ${terminal.delay.delays[i].end} `);
            terminal.createNewElement(` Diferença: ${terminal.delay.delays[i].unixDiference} `);
            terminal.createNewElement(` Tempo de 0 -> 1: ${terminal.delay.delays[i].time} `);
            console.log(i);
            if (ln > 1 && i + 1 !== ln) terminal.createNewElement(W1_line);
        };

        terminal.createNewElement(W2_line);
    },
}