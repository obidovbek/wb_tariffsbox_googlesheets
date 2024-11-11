# Проект Wildberries API Экспорт в Google Sheets

Этот проект предназначен для получения данных по API Wildberries, их сохранения в базе данных PostgreSQL и экспорта в Google Sheets. Приложение написано на Node.js и использует PostgreSQL для хранения данных и Google Sheets API для экспорта данных.

## Установка и Настройка

### 1. Склонируйте проект с GitHub

```bash
git clone https://github.com/ваш_аккаунт/ваш_репозиторий.git
cd ваш_репозиторий
```

### 2. Настройка Google Sheets API

1. Создайте проект в [Google Cloud Console](https://console.cloud.google.com/).
2. Включите API Google Sheets для проекта.
3. Создайте учетную запись службы (service account) и скачайте JSON-файл с учетными данными.
4. Поделитесь Google Sheets с учетной записью службы (электронная почта указана в JSON-файле).
5. Сохраните JSON-файл в папке проекта, например, в `credentials/***.json`.

### 3. Создайте `.env` файл

Создайте файл `.env` в корневой папке проекта и добавьте следующие переменные:

```plaintext
NODE_ENV=development
API_PORT=4029
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=ваш_пароль
PGDATABASE=mydatabase
PGPORT=5432
WB_API_TOKEN=ваш_токен
GOOGLE_API_OAUTH_JSON=./credentials/***.json
```

## Запуск с помощью Docker

```bash
docker compose up
docker-compose run api npm run migrate:latest
```

## Использование

### Получение данных

Отправьте GET запрос на `http://localhost:4029/api/tariffs/fetch/` для получения данных или подождите автоматического обновления каждый час.

### Экспорт данных в Google Sheets

Отправьте POST запрос на `http://localhost:4029/api/tariffs/export-to-sheets` для экспорта данных в Google Sheets.

Пример запроса:

```json
POST /export-to-sheets
Content-Type: application/json

{
  "sheetIds": ["sheetId1", "sheetId2"]
}
```

## Просмотр данных в Google Sheets

Посетите [ссылку на Google Sheets](https://docs.google.com/spreadsheets/d/1az2M4UExKhmF0giwa6V1N-Xy62S5nm3rnyQb-8ijtoY/edit?usp=sharing), чтобы увидеть экспортированные данные.

## Лицензия

Этот проект предоставлен "как есть" и может использоваться свободно.
