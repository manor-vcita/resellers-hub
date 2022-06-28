import { AxiosRequestConfig } from './../../node_modules/axios/index.d';
import * as admin from 'firebase-admin';
import * as express from "express";
import * as Axios from 'axios';
import { querySnowflake } from '../snowflake';
const axios = Axios.default;
const vcitaRoutes = express.Router();
const baseVcitaUrl = 'https://api.vcita.biz';
// const tapToken = '6e8ae895468858264e8d76ba0428d41fb6a0b52f02a8db5a415b3e3d64ff8e60';

vcitaRoutes.post('/create-business', async (request, response) => {
	const hubId = request.body.hubId;
	const data = request.body.business;
  const token = (await getHubToken(hubId)).data().token;
  const config = new vcitaAxiosInstance2(token, hubId).config;
  axios.post(`${baseVcitaUrl}/platform/v1/businesses`, data, config)
  .then(res => res.data.data.business)
  .then(account => { response.status(200).jsonp(account) })
  .catch(error => {
    response.status(500).send(error) });
});

vcitaRoutes.get('/business', async (request, response) => {
  const hubId = request.query.hubId!.toString();
  const businessUid = request.query.businessUid!.toString();
  const axiosVcita = vcitaAxiosInstance(hubId, businessUid);
  (await axiosVcita).get(`/platform/v1/businesses/${businessUid}`)
  .then(res => {
    const business = res.data.data.business;

    response.status(200).jsonp(business);
  })
  .catch(error => {
    console.log(axiosErrorCatcher(error));
    response.status(500).send(error);
  });
})

vcitaRoutes.get('/businessId', async (request, response) => {
  const businessUid = request.query.businessUid!.toString();
  const sqlText = `
    select id from vcita.pivots
    where uid = '${businessUid}';
  `
  querySnowflake(sqlText)
  .then(data => {
    response.status(200).jsonp({id: data[0].ID, uid: businessUid});
  })
  .catch(error => {
    response.status(500).send(error);
  });
})

vcitaRoutes.get('/staff', async (request, response) => {
  const hubId = request.query.hubId!.toString();
  const businessUid = request.query.businessUid!.toString();
  const axiosVcita = vcitaAxiosInstance(hubId, businessUid);
  (await axiosVcita).get(`/platform/v1/businesses/${businessUid}/staffs`)
  .then(res => {response.status(200).jsonp(res.data.data.staff);})
  .catch(error => {
    console.log(axiosErrorCatcher(error));
    response.status(500).send(error);
  });
})

vcitaRoutes.get('/clients', async (request, response) => {
  let businessId: string;
  if (request.query.businessUid) {
    businessId = (await getBusinessId(request.query.businessUid?.toString())).id;
    const sqlText = `
      select count(id) as total from vcita.clients
      where pivot_id = '${businessId}'
      ${request.query.from && request.query.until ? `and created_at between ${request.query.from} and ${request.query.until}` : ''}
    `;
    querySnowflake(sqlText)
    .then(data => response.status(200).jsonp({total: data[0].TOTAL}))
    .catch(err => { response.status(500).send(err) })
  } else {
    response.status(500).send('missing business uid param.');
  }
});

vcitaRoutes.get('/payments', async (request, response) => {
  let businessId: string;
  if (request.query.businessUid) {
    businessId = (await getBusinessId(request.query.businessUid?.toString())).id;
    const sqlText = `
      select count(id) as total from vcita.payments
      where pivot_id = '${businessId}'
    `;
    querySnowflake(sqlText)
    .then(data => response.status(200).jsonp({total: data[0].TOTAL}))
    .catch(err => { response.status(500).send(err) })
  } else {
    response.status(500).send('missing business uid param.');
  }
});

vcitaRoutes.get('/appointments', async (request, response) => {
  let businessId: string;
  if (request.query.businessUid) {
    businessId = (await getBusinessId(request.query.businessUid?.toString())).id;
    const sqlText = `
      select count(id) as total from vcita.meetings
      where pivot_id = '${businessId}'
    `;
    querySnowflake(sqlText)
    .then(data => response.status(200).jsonp({total: data[0].TOTAL}))
    .catch(err => { response.status(500).send(err) })
  } else {
    response.status(500).send('missing business uid param.');
  }
});

vcitaRoutes.get('/products', async (request, response) => {
  let businessId: string;
  if (request.query.businessUid) {
    businessId = (await getBusinessId(request.query.businessUid?.toString())).id;
    const sqlText = `
      select count(id) as total from vcita.products
      where pivot_id = '${businessId}'
    `;
    querySnowflake(sqlText)
    .then(data => response.status(200).jsonp({total: data[0].TOTAL}))
    .catch(err => { response.status(500).send(err) })
  } else {
    response.status(500).send('missing business uid param.');
  }
});

vcitaRoutes.get('/test', (request, response) => {
  querySnowflake('select * from vcita.pivots limit 2;')
  .then(data => { response.status(200).json(data);})
  .catch(err => { response.status(500).send(err) });
});

const getHubToken = (hubId: string): Promise<FirebaseFirestore.DocumentSnapshot<any>> => {
  return admin.firestore().collection('hubs_tokens').doc(hubId).get()
}

class vcitaAxiosInstance2 {
  config: AxiosRequestConfig;
  constructor(
    private token: string,
    private hubId: string
  ) {
    this.config = {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'X-On-Behalf-Of': this.hubId
      }
    };
  }
}

const axiosErrorCatcher = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return error.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }
}

const getBusinessId = (uid: string): Promise<{id: string, uid: string}> => {
  return new Promise((resolve, reject) => {
    const sqlText = `
    select id from vcita.pivots
    where uid = '${uid}';
    `;

    querySnowflake(sqlText)
    .then(data => {
      resolve({id: data[0].ID, uid: uid})
    })
    .catch(err => reject(err));
  });
}

const vcitaAxiosInstance = async (hubId: string, businessUid?: string) => {
  const token = (await getHubToken(hubId)).data().token;
  console.log(token);

  const instance = Axios.default;
  instance.defaults.baseURL = 'https://api.vcita.biz';
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  businessUid ? instance.defaults.headers.common['X-On-Behalf-Of'] = businessUid : null;
  return instance;
}

export { vcitaRoutes };

