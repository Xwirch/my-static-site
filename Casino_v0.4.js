const mineflayer = require('mineflayer');
const fs = require('fs');
const path = require('path');
const currentDate = new Date();


const yearr = currentDate.getFullYear();
const monthr = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы в JavaScript начинаются с 0
const dayr = currentDate.getDate().toString().padStart(2, '0');
const hourr = currentDate.getHours().toString().padStart(2, '0');
const minuter = currentDate.getMinutes().toString().padStart(2, '0');
const formattedDater = `(${yearr})(${monthr})(${dayr})  (${hourr})(${minuter})`;


const chatLogFolder = 'C:/BotLog/ChatLogs';
const subfolderName = 'ChatLogs';
const subfolderPath = path.join(chatLogFolder, subfolderName);


const chatLogFile = path.join(chatLogFolder, formattedDater + 'ChatLog.txt');

if (!fs.existsSync(chatLogFolder)) {
  fs.mkdirSync(chatLogFolder, { recursive: true });
}
const logDirectory2 = 'C:/BotLog/MoneyLog'; // Путь к папке для сохранения логов
const logFile = path.join(logDirectory2, formattedDater + 'money.log'); // Путь к файлу лога

// Функция для записи сообщений в файл
function logToMoneyLog(message) {
  fs.appendFile(logFile, message.toString() + '\n', 'utf8', (err) => {
    if (err) {
      console.error('Ошибка записи в файл:', err);
    }
  });
}

// Создание директории, если она не существует
if (!fs.existsSync(logDirectory2)) {
  fs.mkdirSync(logDirectory2);
}


const logFilePath = 'C:/BotLog/BotName.txt';

function readBotName() {
  if (fs.existsSync(logFilePath)) {
    return fs.readFileSync(logFilePath, 'utf-8').trim();
  }
  return 'DefaultBotName';
}

const logDirectory = path.dirname(logFilePath);
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, 'DefaultBotName');
}

const filePath = 'C:/BotLog/PaySetting.txt';

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'DefaultNickname');
}

let nicknameFromFile;

function readNicknameFromFile() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.trim();
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
    return null;
  }
}
const bot = mineflayer.createBot({
    host: 'mc.funtime.su',
    // port: 35838,
    username: readBotName() // Set the username here
  });  
  let stopBotActions = false;



// Путь к файлу
const filePathA = 'C:/BotLog/MainAnarchy.txt';

// Задаем команду по умолчанию, если файла нет
const defaultCommand = '/an204';

// Функция для чтения команды из файла
function readCommandFromFile() {
  try {
    const command = fs.readFileSync(filePathA, 'utf8').trim();
    return command;
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
    return null;
  }
}

// Функция для создания файла с командой по умолчанию, если файла нет
function createFileWithDefaultCommand() {
  fs.writeFile(filePathA, defaultCommand, (err) => {
    if (err) {
      console.error('Ошибка при создании файла:', err);
    }
  });
}

// Проверяем, существует ли файл. Если нет, создаем его.
if (!fs.existsSync(filePathA)) {
  createFileWithDefaultCommand();
}

// Функция для выполнения команды
function executeAnarchyCommand() {
  const command = readCommandFromFile();
  if (command) {
    // Отправляем команду в чат бота
    bot.chat(command);
  }
}
bot.once('spawn', () => {
  executeAnarchyCommand();
})




const folderPath = 'C:/BotLog';
// Указываем имя файла
const fileName = 'OwnerAnarchy.txt';
// Содержание команды
const command = '/anarchy';

// Полный путь к файлу
const filePathAN = path.join(folderPath, fileName);

// Создаем папку, если она не существует
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Записываем команду в файл
fs.writeFileSync(filePathAN, command);
setInterval(() => {
  console.log('\x1b[5m\x1b[33m%s\x1b[0m','Захожу на анархию пользователя...');
}, 250000);






// Функция для замены ника отправителя (реализуйте сами)
function replaceSenderNick(originalNick) {
  // Здесь можно реализовать логику замены ника отправителя
  // Например, можно использовать словарь или базу данных для соответствия ников
  return originalNick; // Возвращаем оригинальный ник по умолчанию
}

let balance = ''; // Добавляем переменную для хранения баланса

bot.on('message', (message) => {
  console.log(message.toAnsi());

 
  // Проверяем, является ли сообщение уведомлением о получении денег
  const moneyRegex = /\[\$\] \$([\d,]+) получено от игрока ([\w\d]+)/;
  const matches = message.toString().match(moneyRegex);

  if (matches) {
    const amount = parseInt(matches[1].replace(',', ''), 10); // Удаляем запятые из суммы и преобразуем в число
    const sender = matches[2];

    // Определяем шанс в зависимости от количества монет
    let winChance;
    if (amount >= 1 && amount <= 2000) {
      winChance = 0.50;
    } else if (amount >= 2000 && amount <= 5000) {
      winChance = 0.4;
    } else if (amount >= 5000 && amount <= 25000) {
      winChance = 0.37;
    } else if (amount > 25000 && amount <= 100000) {
      winChance = 0.20;
    } else if (amount > 100000 && amount <= 350000) {
      winChance = 0.18;
    } else if (amount > 350000 && amount <= 1000000) {
      winChance = 0.13;
    } else if (amount > 1000000 && amount <= 10000000) {
      winChance = 0.08;
    } else if (amount > 10000000 && amount <= 100000000) {
      winChance = 0.01;
    } else {
      winChance = 0.3;
    }

    // Генерируем случайное число для проверки шанса
    const randomChance = Math.random();
    const win = randomChance < winChance;

    // Заменяем ник отправителя (sender) на другой ник, если необходимо
    const senderNick = replaceSenderNick(sender);

    let msg;
    if (win) {
      // Если выиграл, отправляем сообщение и выполняем команду /pay дважды
      const reward = amount * 2;
      msg = `/msg ${senderNick} ${getRandomString(5)}'ты отправил ${amount} монет и выиграл! Ты получаешь ${reward} монет!  ${getRandomString(5)}`;

      // Отправляем сообщение о выигрыше игрока Tartarish
      const payCommand = `/pay ${senderNick} ${reward}`;

      // Отправляем первое подтверждение
      bot.chat(payCommand);
      bot.chat(payCommand);

      // Устанавливаем флаг, что бот отправил первое подтверждение
      hasSentConfirmation = true;

      // Ждем 100 миллисекунд и отправляем второе подтверждение

    } else {
      // Если проиграл, отправляем сообщение и ничего не выполняем
      msg = `/msg ${senderNick} ${getRandomString(5)}  ты отправил ${amount} монет, но не выиграл. ${getRandomString(5)}`;
    }

    bot.chat(msg);
  }
});
nicknameFromFile = readNicknameFromFile();

    if (!nicknameFromFile) {
        console.error('Не удалось прочитать ник из файла. Бот не будет запущен.');
        return;
    }

    // Обработчик сообщений
    bot.on('message', (message) => {
        const match = message.toString().match(/^(.*?) > Я\] (.*)/);

        if (match) {


            // Используйте регулярное выражение для извлечения ника без привилегии
            const playerNameMatch = match[1].match(/\[(.*?)\] (.*)/);
            const playerName = playerNameMatch ? playerNameMatch[2] : match[1];
            
            const chatMessage = match[2];
           // console.log('hello'.bgGreen.black); // outputs green text
            console.log(`Игрок: ${playerName}`);
            console.log(`Сообщение: ${chatMessage}`);

            // Проверка, соответствует ли имя игрока нику из файла
            console.log(`Ник из файла: ${nicknameFromFile}`);
            if (playerName === nicknameFromFile) {
                // Ответ на сообщение игрока
                bot.chat(chatMessage);
                console.log('Бот выполнил команду.'
                );
            } else {
                // Если имя игрока не совпадает с ником, просто выводим сообщение
                console.log(`Имя игрока не совпадает с ником из файла.`);
            }
        }
    });

    console.log('Бот успешно подключен');
  
    
    bot.on('error', (err) => {
      console.error('Ошибка бота:', err);
    });
    // Обработка ошибок подключения
    bot.on('error', (err) => {
        console.error('Произошла ошибка подключения:');
        console.error(err);
    });

// Слушаем события 'chat' и записываем сообщения в файл
bot.on('message', ( message) => {
  const currentDate = new Date();

// Извлекаем необходимые компоненты даты и времени
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы в JavaScript начинаются с 0
const day = currentDate.getDate().toString().padStart(2, '0');
const hour = currentDate.getHours().toString().padStart(2, '0');
const minute = currentDate.getMinutes().toString().padStart(2, '0');

// Формируем строку для записи в файл
const formattedDate = `${year}.${month}.${day} | ${hour}:${minute}`;

  const logMessage = `[${formattedDate}] ${message.toString()}`; // Конвертируем в строку

  // Добавляем сообщение в файл (используем синхронный метод, чтобы избежать проблем с асинхронной записью)
  try {
    fs.appendFileSync(chatLogFile, logMessage + '\n');

  } catch (err) {
    console.error('Ошибка при записи в файл:', err);
  }

  // Теперь вы можете добавить свой код обработки сообщений чата

});


bot.on('message', (message) => {
  const currentDate = new Date();

  // Извлекаем необходимые компоненты даты и времени
  const yearMC = currentDate.getFullYear();
  const monthMC = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы в JavaScript начинаются с 0
  const dayMC = currentDate.getDate().toString().padStart(2, '0');
  const hourMC = currentDate.getHours().toString().padStart(2, '0');
  const minuteMC = currentDate.getMinutes().toString().padStart(2, '0');
  const secondMC = currentDate.getSeconds().toString().padStart(2, '0');
  const formattedDate = `${yearMC}.${monthMC}.${dayMC} | ${hourMC}:${minuteMC}:${secondMC}`;

  if (message.toString().includes('получено от игрока')) {
    bot.chat('/bal');
    const logMessage = `${formattedDate} ${message.toString()}`;
    
    // Отображаем сообщение в консоли
    console.log(logMessage);

    // Записываем сообщение в файл
    logToMoneyLog(logMessage);
  }
});
bot.on('message', (message) => {

  if (message.toString().includes('[$] Ваш баланс:')) {
    const logMessage = `${message.toString()}`;
    // Записываем сообщение в файл
    logToMoneyLog(logMessage);
  }
});

bot.on('message', (message) => {

  if (message.toString().includes('] У вас нет запросов на телепортацию')) {
    executeAnarchyCommand();
    }
});
bot.on('message', (message) => {

  if (message.toString().includes('Наш Дискорд dd.FunTime.su')) {
    executeAnarchyCommand();
  }
});
bot.on('message', (message) => {

  if (message.toString().includes('Вы не отправляли запросов на телепортацию')) {
    executeAnarchyCommand();
    }
});

function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}
setInterval(() => {
     bot.chat('!' + getRandomString(5) + ' Привет! Я казино бот! Ты можешь скинуть деньги, а я если тебе повезет, скину тебе 2х Сумму! все честно! шансы 50 на 50, проверить можно скинув 1 монету! если бот молчит, значит у него проверка на сообщения. ' + getRandomString(5) + '');
  //bot.chat('/bal');
}, 33000);

bot.on("kicked", console.log);
bot.on("error", console.log);
