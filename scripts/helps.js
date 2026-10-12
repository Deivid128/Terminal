const helps = {
    help: [
        { type: "command", name: "help", description: "mostra todos os comandos" },
        { type: "command", name: "clear", description: "limpa o terminal" },
        { type: "command", name: "background", description: "acessa as propriedades do background" },
        { type: "command", name: "calcev", description: "realiza operações de expressões matemáticas, com limitações" },
        { type: "command", name: "date", description: "mostra a data e hora, o tempo atual, no geral" },
        { type: "command", name: "reload", description: "recarrega o terminal" },
        { type: "command", name: "textcolor", description: "altera a cor do texto" },
        { type: "command", name: "version", description: "mostra a versão atual do terminal" },
        { type: "command", name: "h/nasa", description: "??????" },
        { type: "command", name: "delay", description: "retorna a diferença entre 'start' e 'end' em H/M/S" },
        { type: "command", name: "morse", description: "criptografa/descriptografa um texto para/de código morse" },

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
        { type: "warnM", name: "", description: "RECOMENDAMOS USAR PALAVRAS EM INGLÊS." },
        { type: "warnM", name: "", description: "PORTUGUÊS OU OUTROS IDIOMAS PODEM GERAR ERRO NA CRIPTOGRAFIA E DESCRIPTOGRAFIA" },
        { type: "command", name: "help", description: "mostra os comandos do morse" },
        { type: "command", name: "encrypt", description: "criptografa um texto para código morse" },
        { type: "command", name: "decrypt", description: "descriptografa um código morse para texto" },
        { type: "command", name: "codes", description: "mostra todos os códigos (disponíveis) e suas respectivas traduções" },
        { type: "warnM", name: "", description: "TEMOS SÍMBOLOS ALÉM DO ALFABETO COMO PONTOS E VÍGULAS " },
    ],
};

