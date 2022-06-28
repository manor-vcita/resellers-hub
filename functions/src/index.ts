import * as dotenvRef from "dotenv";
dotenvRef.config();
import * as cors from "cors";

// Import Firebase admin and functions
import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp();

// Routes imports
import { authRoutes } from './routes/auth.routes';
import { vcitaRoutes } from "./routes/vcita.routes";

// Express app
import * as express from 'express';
const app = express();

// Middlewares
app.use(cors({origin: '*'}));
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies

// Routs
app.use("/auth", authRoutes);
app.use("/vcita", vcitaRoutes);

// Export Express app as "api" Firebase function
exports.api = functions.https.onRequest(app);
