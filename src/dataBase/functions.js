// GOOGLE SHEETS
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { client_email, private_key } from "./creds.json";

// ID таблицы
const spreadsheetId = "10gDAr9XKC5fTUCYpQed7L6w0d34PL9Jcsh5061KPebI";
// Диапазон поиска
const serchRange = "A2:K1000";

// Проверка на сохранение авторизованных данных
let cachedSheets = null;

async function getCachedSheets() {
  if (!cachedSheets) {
    cachedSheets = auth();
  }
  return cachedSheets;
}

// Проверка на аунтентификацию
async function auth() {
  const client = new JWT({
    email: client_email,
    key: private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  await client.authorize();
  const sheets = google.sheets({ version: "v4", auth: client });
  return sheets;
}

// Добавление юзера в таблицу
async function addUserToSheet(
  userId,
  ref,
  wallet,
  balance,
  ivited,
  isSub,
  refCount,
  twitter,
  influer,
  invetedByInfluer,
  influerId
) {
  const sheets = await getCachedSheets();

  // Создание массива значений для добавления в таблицу
  const values = [
    [
      userId,
      ref,
      wallet,
      balance,
      ivited,
      isSub,
      refCount,
      twitter,
      influer,
      invetedByInfluer,
      influerId,
    ],
  ];

  // Выполнение запроса на добавление данных в таблицу
  const request = {
    spreadsheetId: spreadsheetId,
    range: "A2",
    valueInputOption: "USER_ENTERED",
    resource: { values },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
  } catch (err) {
    console.error("Произошла ошибка при добавлении данных:", err);
  }
}

// Поиск юзера по ID в таблице
async function checkUserInBd(id) {
  const sheets = await getCachedSheets();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: serchRange, // Диапазон, в котором находятся данные о пользователях
  });

  const rows = response.data.values;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const userIdInSheet = row[0];
    if (userIdInSheet == id) {
      const info = {
        row: i + 2,
        data: row,
      };
      return info;
    }
  }
}

// Поиск юзера по реферальной ссылке в таблице
async function findUserByRef(ref) {
  const sheets = await getCachedSheets();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: serchRange, // Диапазон, в котором находятся данные о пользователях
  });

  const rows = response.data.values;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const userIdInSheet = row[1];
    if (userIdInSheet) {
      if (userIdInSheet.includes(ref)) {
        const info = {
          row: i + 2,
          data: row,
        };
        return info;
      }
    }
  }
}

// Обновление данных юзера

async function updateUserInfo(data) {
  const sheets = await getCachedSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId,
    range: `A${data.row}:K${data.row}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          data.data[0],
          data.data[1],
          data.data[2],
          data.data[3],
          data.data[4],
          data.data[5],
          data.data[6],
          data.data[7],
          data.data[8],
          data.data[9],
          data.data[10],
          data.data[11],
        ],
      ],
    },
  });
}

export default {
  auth,
  addUserToSheet,
  checkUserInBd,
  findUserByRef,
  updateUserInfo,
};
