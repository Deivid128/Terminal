const line = "======================================================";

const backgroundCommands = {
    color: (color) => {
        terminal.backgroundColor = color || "black";
        commandsArea.style.backgroundColor = terminal.backgroundColor;
    },

    help: () => {
        terminal.createNewElement(line);
        for (let i of backgroundHelp) {
            terminal.createNewElement(` -"${i.name}"- ${i.description}`);
        };
        terminal.createNewElement(line);
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
        terminal.createNewElement(line);
        for (let i of dateHelp) {
            terminal.createNewElement(` -"${i.name}"- ${i.description}`);
        };
        terminal.createNewElement(line);
    },
}

const delayCommands = {
    start: () => {
        terminal.delay.start = Number(dateCommands.unix());
        terminal.createNewElement(` Tempo 0, salvo: ${terminal.delay.start} <`);
    },

    end: () => {
        const end = Number(dateCommands.unix());

        terminal.createNewElement(line);

        terminal.createNewElement(` Tempo 1, salvo: ${end} <`);
        terminal.createNewElement(` Calculando...`);

        const diference = end - terminal.delay.start;

        const hours = String(Math.floor(((diference / 1000) / 60) / 60)).padStart(2, "0");
        const minutes = String(Math.floor((diference / 1000) / 60)).padStart(2, "0");
        const seconds = String(Math.floor(diference / 1000)).padStart(2, "0");

        terminal.createNewElement(` Diferança: ${diference} <`);
        terminal.createNewElement(` Tempo de 0 -> 1. Horas: ${hours}; Minutos: ${minutes}; Segundos: ${seconds} <`);

        terminal.createNewElement(line);

        terminal.delay.start = 0;
    },

    _delays: () => {
        console.log(terminal.delay.delays);
    },
}