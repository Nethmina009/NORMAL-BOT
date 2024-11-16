const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Adams-2024;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUJPZFVWelFoYWM5Q1hzU0I0REhvcHdkVThCTVBYNVJNcm1WS3Y1LzFWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjgxa2xwNk5LZGowa1E5QUN0VU5FdXBJY0dZbHUzY2VtVm1xN1RZWjV6ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SzBkN0pPcFlhTG9KYXpwMUNuTzRjT0lETXNEM1RSU0lrTk9yNS9kN21rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvcUZPZzg4TnBmQ0wzNEEzNElITGJRekhHSyt0c3ZsZVNwRzhZbHYxcEFzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNKYzFtUlVhUCtEMmtybkhtYUV6UlQzZktXNXRUNlVSNEFuRS9kLytoMUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5VeFdVeDhuTEVvM3B1RVlSWFVydEg0RDBXVWRJMzFrVmZ1VS9nM09TMU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0pnMisvbnNxd2dwWVNSRmtHVlBPMmlRcVI4dW5iRjhPSW84dnVibm4yZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU1rQnZiOVpLWStLQllmbmVwNXZWa3RLL2x0YnhROFRaa0V2eERBM1pUMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNJd0xXYnMrclJObjVLWHNrampTOHhEWng2R2VoTVdnQ2lDQmIwcXEydkdjUHk5ajljaG5xZCtCUTd5QUlqWjN4NEZTd3pNWWZuT3REL2JHNDc5L0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE5LCJhZHZTZWNyZXRLZXkiOiJBRnFNSVVpdFBDVG5WaXNIV2ZXKy9HYUF6N1JZSGpiN1dhQXpiWWxCeHJVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMenhFVkxLUFJwS2dycUFKZFd4SEp3IiwicGhvbmVJZCI6ImU5OGQxMzkwLTNlZmMtNDI0OC05NjhiLWM5NjU0ZmRjMjQwYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHWmdsa3ROdHBIb0hQcnpPVXVQWVFJcVAyaDA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkxLYVpqVmRaS1R1VU9pa1cwdkNNZ2o1amp3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ijc5MUVCRjVQIiwibWUiOnsiaWQiOiI5NDcwNjM2OTcyODo4NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLDl+KAouKAovCdmb3htIfhtJvKnOG0jcmqybThtIAg8J2QjvCdmbXwnZmy4oCi4oCiw5cifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01XVS9KVUVFSytLNExrR0dBc2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im5VK2h1d2x3SjBUWWNiK1ZJN2N4aUIxeXZQcUIxZFE1VC9DSXFxWUNOSFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6InJRaU9lNkZMMGZDbXRnKzhZTVhvbk5QWDdmMGxuaEJZOXFNTzUxZ0FTaXdXbjNDZ2hBOE5MWkpDcll5UkxDdlpPeC9FeHplamQvbFA4akJ5eU41RER3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrWVZVbEYxajFGUVVSRExCQ1pnQjVqTnd2RDZIT3ZjV1owemlobm9kOFY4dzk4ZE1MQWRuK003WCtPNkJPRXJNMllKU01udFE3SVQyRmNDaGJCcnZCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzA2MzY5NzI4Ojg2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQloxUG9ic0pjQ2RFMkhHL2xTTzNNWWdkY3J6NmdkWFVPVS93aUtxbUFqUjAifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzE3MjQ2MDV9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/h2ydge.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE : process.env.ANTIDELETE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

