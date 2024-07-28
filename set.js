const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkUzR2dLN3Rxa2I5K295azlWOEgwc1hxRHkzYkpjanc0Q2lrY1ZrUnFsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieThYNkluVHEzYUgxcUJGMDRlVmEvR3dzdUFudW9PKzA4eUJRRm1mVVNUVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSCtoZnVldzhIL2NMREJPeXhJSjdIYnVPVzdHekxmek5CWDluakF2MmxnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHcFB2Q3FOcjR6eVdGZEtqU1ZFQlNDOUpxKzhWSndkVkw0ZGxrMzl5NFZVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFIV3BPK0dMZFMxa05ZeVVIb0lHdHE4aERlTi9xcVI3UVVzRXIwNGZ0SEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZoWGlrWng0emlydktNam14WGZTNE1jdGJ2Z3g2Mk5aREJzZXdVVUtCVnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0hTSUEyMlQxWnd5dG5Oemc1SWhLajZPMmxHMENIeUdmZFNUT21FVUNuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUlZKb0xvR1pybHFsc011WVlKcFJqVGYyMk12YkpSNFhZTmpINjdFdzVEVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imh1UldmNHlyVzRqbG1EWUdYKzRmY0EyT1duakVWeGFubXR0WkRXeHcyY2d3TXM3L1NPTm02OG8xdmVROUVVSDdzSk44RURuV0Nua1BDTFIzZm5mckRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQsImFkdlNlY3JldEtleSI6ImdHME9xNEVKSlR0SmFyYkNsYStKVVNxRDdXajU5dThWWXJpOUhtcjdtSjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzNDQ0ODQ0MDYwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk4QzY2MzM5MkZBOTMxQkVEMjE2OTVGRUQ5NkUxMDU3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjIyMDk3ODB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQ0NDg0NDA2MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNUM3MTQ0MjZDM0YwM0VCMDlCNzc2QkE3RUM3MDM2MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyMjA5NzgwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4NW9hUzVRY1FST2tGQk56bDN5SkZ3IiwicGhvbmVJZCI6IjliYTkzNzJlLTA1MTQtNDBjMy04Njk4LWY4NWMxMGJjMGE4MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQ0luZWVmWGFqaFIwc2FkWm9TYjMwekVjWWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUllHUjV0NHR1WTIzMDdOUjlYbTVIS1g4UTFVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IksxR1lUMUE4IiwibWUiOnsiaWQiOiI5MjM0NDQ4NDQwNjA6NDhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU3RyYW5nZXIg4q2QIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKbnQ4WlFIRU9hcm03VUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqU3NobUxYdUliaWlXSjk4UmxGbFlpYi9BTUVVZjJ4S1kreklnODcwcXlFPSIsImFjY291bnRTaWduYXR1cmUiOiJ6TithdUdFeWVYa25aTWhQMTlwbG9hcHQyVElYNlpRWkgrOWtIK0RuQXg0NE9LSHNnV1dHZE94eUEvYm42RFRlRSthNEllUk5tYTkxN0RPSkRJWlVDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiY0c4WHB0Mm9SUyt1MGNMUlJKaGRucEphSTNuSEl6SGppdldER3Q3cW1uU1cyakNYY0F5MVJhS3RjSWJDT2VaNC94NFpMaUhVRlhUUUNOc2w1U0YzRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM0NDQ4NDQwNjA6NDhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWTBySVppMTdpRzRvbGlmZkVaUlpXSW0vd0RCRkg5c1NtUHN5SVBPOUtzaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjIwOTc3OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDQzEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Stranger",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "923444844060", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'GALAXY-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
