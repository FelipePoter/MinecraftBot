const mineflayer = require("mineflayer");
const fs = require("fs");

// FUNÇÕES ==================================================================

function logToFile(message) {
  const timestampedMessage = `[${getCurrentTime()}] ${message}\n`;
  fs.appendFileSync("logs.txt", timestampedMessage, (err) => {
    if (err) console.error("Erro ao escrever no arquivo:", err);
  });
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}   

// BOT ==================================================================

const botConfig = {
  host: "HOST_DO_SERVIDOR",
  port: PORTA_DO_SERVIDOR,
  username: "Minecraft Bot",
  version: false,
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botConfig);

  bot.on("login", () => {
    logToFile(`Bot logado como ${bot.username}`);
  });

  bot.on("spawn", () => {
    setInterval(() => {
      if (!bot.entity) return;
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);

      const directions = ["forward", "back", "left", "right"];
      const direction =
        directions[Math.floor(Math.random() * directions.length)];
      bot.setControlState(direction, true);
      setTimeout(() => bot.setControlState(direction, false), 2000);
    }, 3000);
  });

  // CHAT ==================================================================

  bot.on("chat", (username, message) => {
    logToFile(`${username} executou o comando: ${message}`);
  });

  bot.on("chat", (username, message) => {
    if (username === bot.username) return;

    if (message === "whispers to you: desligar") {
      logToFile(`Bot desligado pelo comando de ${username}.`);
      bot.chat("O bot está sendo desligado...");
      process.exit();
    }

    if (message === "ping") {
      bot.chat("pong");
    }

    if (
      message === "oi" ||
      message === "opa" ||
      message === "ola" ||
      message === "olá"
    ) {
      bot.chat(`Opa ${username}`);
    }

    if (message === "!caracoroa") {
      const resultado = Math.random() < 0.5 ? "Cara" : "Coroa";
      bot.chat(`O resultado foi: ${resultado}`);
    }

    if (message === "!status") {
      const jogadores = Object.keys(bot.players).filter(p => p !== bot.username);
      bot.chat(`Jogadores online: ${jogadores.length}.`);
      if (jogadores.length > 0) {
        bot.chat(`Jogadores: ${jogadores.join(", ")}`);
      }
    }
    

    if (message === "!ajuda") {
      bot.chat("Comandos disponíveis:");
      bot.chat("!ajuda - Mostra todos os comandos do bot.");
      bot.chat("!caracoroa - Joga cara ou coroa.");
      bot.chat("!status - Mostra os jogadores online.");
    }
  });

  // GERENCIAMENTO DE ERROS E DESLIGAMENTOS ==================================================================

  process.on("SIGINT", () => {
    logToFile("Bot desligado manualmente (CTRL+C).");
    bot.chat("O bot está sendo desligado...");
    process.exit();
  });

  process.on("SIGTERM", () => {
    logToFile("Bot desligado manualmente (SIGTERM).");
    bot.chat("O bot está sendo desligado...");
    process.exit();
  });

  bot.on("kicked", (reason) => {
    logToFile(`[Bot foi expulso: ${reason}`);
  });

  bot.on("error", (err) => logToFile(`Erro detectado: ${err}`));

  bot.on("end", () => logToFile("Conexão perdida."));

  // ENTRADA E SAÍDA DE JOGADORES ==================================================================

  bot.on("playerJoined", (player) => {
    logToFile(`Jogador entrou: ${player.username}`);
    bot.chat(`Bem-vindo ao servidor, ${player.username}!`);
  });

  bot.on("playerLeft", (player) => {
    logToFile(`Jogador saiu: ${player.username}`);
  });
}

// EXECUTAR O BOT ==================================================================

createBot();
