# Minecraft Bot

Este é um bot de Minecraft feito utilizando MineFlayers.

## Como utilizar

### Configurações do Bot

Preencha o `host` com o host do servidor no qual o bot entrará. E `port` com a porta do servidor. 

```js
const botConfig = {
  host: "HOST_DO_SERVIDOR",
  port: PORTA_DO_SERVIDOR,
  username: "Minecraft Bot",
  version: false,
};
```

### Como rodar o bot

No diretório em que está localizado o arquivo, execute o seguinte comando:
```bash
node main.js
```

## Features

### Anti sistema anti-AFK

O bot fica andando em direções aleatórias para evitar que o servidor identique que ele esteja AFK e expulse ele do servidor.

### Comando para desligar através do chat

O bot desliga a si próprio quando sussurram "desligar" para ele.

### Interação no chat

O bot interage com os jogadores através do chat.

### Log

O bot registra os logs no arquivo `logs.txt`.
