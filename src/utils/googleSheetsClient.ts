// src/utils/googleSheetsClient.ts

import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// Initialize Google Sheets API client
const auth = new GoogleAuth({
    keyFile: path.join(__dirname, "../..", "cridentials", process.env.GOOGLE_API_OAUTH_JSON ?? ""), // Update this path
    scopes: SCOPES,
});

export const sheets = google.sheets({ version: "v4", auth });
