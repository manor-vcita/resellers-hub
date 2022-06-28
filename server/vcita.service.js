const { default: axios } = require('axios');
const express = require('express');
const vcitaRoutes = express.Router();

const baseUrl = 'https://api.vcita.biz';
token = 'f22513a98e8e67bb8db6b8a23368abc2c11ed6983e85c7001c7a905a076ae012';

vcitaRoutes.get('/business', async (request, response) => {
  const url = `${baseUrl}/platform/v1/businesses/${request.query["businessId"]}`;
  const business = (await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).data.data.business;
  response.json(business);
});

vcitaRoutes.post('/business', async (request, response) => {
  const url = `${baseUrl}/platform/v1/businesses/${request.query["businessId"]}`;
  const business = (await axios.post(url, {
    data: request.body,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).data.data.business;
  response.json(business);
});

module.exports = { vcitaRoutes };
