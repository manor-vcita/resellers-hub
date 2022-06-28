import * as admin from 'firebase-admin';
import * as express from "express";
// import * as Axios from 'axios';
const authRoutes = express.Router();


authRoutes.post('/create-user', (request, response) => {
	const email = request.body.email;
	const password = request.body.password;
  admin.auth().createUser({email: email, password: password})
  .then(user => { response.status(200).json({uid: user.uid}) })
  .catch(err => { response.status(500).send(err) });
});

export { authRoutes };
