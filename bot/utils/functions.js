const dotenv = require("dotenv").config();
const API_URL = process.env.API_URL;

function addToDB(table, body) {
  return fetch(`${API_URL}/${table}/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function deleteFromDB(table, chatId) {
  return fetch(`${API_URL}/${table}/${chatId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

function getFromDB(table, chatId) {
  return fetch(`${API_URL}/${table}/${chatId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

module.exports = {
  addToDB,
  deleteFromDB
};
