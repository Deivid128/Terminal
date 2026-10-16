const helps = {
    help: [
        { type: "command", name: "help", description: "mostra todos os comandos" },
        { type: "command", name: "date", description: "mostra a data e hora, o tempo atual, no geral" },
        { type: "command", name: "clear", description: "limpa o terminal" },
        { type: "command", name: "delay", description: "retorna a diferença entre 'start' e 'end' em H/M/S" },
        { type: "command", name: "cesar", description: "criptografa/descriptografa um texto com a cifra de César" },
        { type: "command", name: "morse", description: "criptografa/descriptografa um texto para/de código morse" },
        { type: "command", name: "calcev", description: "realiza operações de expressões matemáticas, com limitações" },
        { type: "command", name: "reload", description: "recarrega o terminal" },
        { type: "command", name: "h/nasa", description: "??????" },
        { type: "command", name: "version", description: "mostra a versão atual do terminal" },
        { type: "command", name: "textcolor", description: "altera a cor do texto" },
        { type: "command", name: "background", description: "acessa as propriedades do background" },

    ],

    backgroundHelp: [
        { type: "command", name: "help", description: "mostra os atributos do background" },
        { type: "command", name: "color", description: "altera a cor do background" },
    ],

    dateHelp: [
        { type: "command", name: "help", description: "mostra os comandos de date" },
        { type: "command", name: "unix", description: "mostra o Unix Timestamp em milisegundos" },
        { type: "command", name: "hours", description: "mostra as horas exatas" },
        { type: "command", name: "minutes", description: "mostra os minutos exatos" },
        { type: "command", name: "seconds", description: "mostra os segundos exatos" },
        { type: "command", name: "milliseconds", description: "mostra os milisegundos exatos" },
        { type: "command", name: "fulltime", description: "mostra horas, minutos, segundos e milisegundos" },
        { type: "command", name: "day", description: "mostra o dia do mês exato" },
        { type: "command", name: "month", description: "mostra o mês exato" },
        { type: "command", name: "year", description: "mostra o ano exato" },
        { type: "command", name: "fulldate", description: "mostra dia, mês e ano" },
    ],

    morseHelp: [
        { type: "warnM", description: "RECOMENDAMOS USAR PALAVRAS EM INGLÊS." },
        { type: "warnM", description: "PORTUGUÊS OU OUTROS IDIOMAS PODEM GERAR ERRO NA CRIPTOGRAFIA E DESCRIPTOGRAFIA" },

        { type: "command", name: "help", description: "mostra os comandos do morse" },
        { type: "command", name: "encrypt", description: "criptografa um texto para código morse" },
        { type: "command", name: "decrypt", description: "descriptografa um código morse para texto" },
        { type: "command", name: "codes", description: "mostra todos os códigos (disponíveis) e suas respectivas traduções" },

        { type: "warnM", description: "TEMOS SÍMBOLOS ALÉM DO ALFABETO COMO PONTOS E VÍGULAS " },
    ],

    cesarHelp: [
        { type: "warnM", description: "Para funcionar, você utiliza intervalos de -13 a 13, e escreve qualquer texto." },
        { type: "warnM", description: "Ele vai pegar cada letra da frase (excluindo letras com acento)e vai alterar a posição da letra no alfabeto (A-Z)." },
        { type: "warnM", description: "EXEMPLO: intervalo = 2; A -> C; pois se você avançar 2 posições a partir do A, teremos C" },
        
        { type: "warnM", description: "Notação: cesar translate [intervalo = número] [texto]" },

        { type: "command", name: "help", description: "mostra os comandos de cesar" },
        { type: "command", name: "translate", description: "encripta e decripta textos em cifra de César" },
    ],
};

const helpsCommands = {
    default: (helpM) => {
        for (let i of helpM) {
            if (i.type in types) {
                types[i.type](i);
            };
        };
    },
};

const types = {
    command: (i) => {
        terminal.createNewElement(terminal.currentFile.name, ` -"${i.name}"- ${i.description}`);
    },
    warnM: (i) => {
        terminal.createNewElement(terminal.currentFile.name, ` - ${i.description} -`);
    },
};

function helpsHandler(helpt, helpM) {
    terminal.createNewElement(terminal.currentFile.name, W2_line);

    if (helpt in helpsCommands) {
        helpsCommands[helpt](helps[helpM]);
    };

    terminal.createNewElement(terminal.currentFile.name, W2_line);
}