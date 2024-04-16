"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("dotenv/config");
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const app = (0, express_1.default)();
/* MIDDLEWARE*/
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
}));
/* API ENDPOINTS */
app.get('/', (req, res) => {
    res.json('Hello!');
});
app.use('/api', products_routes_1.default);
app.use('/api', orders_routes_1.default);
/* API ERROR PAGES */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('/api', (err, req, res, next) => {
    res.status(500).send('Go away!');
});
/* REACT WEBSITE */
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
app.use('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../public/index.html'));
});
/* MONGOOSE */
const NODE_ENV = process.env.NODE_ENV;
console.log('NODE_ENV : ' + NODE_ENV);
// let dbUri = '';
// if (NODE_ENV === 'production') dbUri = process.env.DBURLFINAL as string;
// else if (NODE_ENV === 'test') dbUri = process.env.DBURLLOCALTEST as string;
// else dbUri = process.env.DBURLLOCAL as string;
if (!process.env.MONGODB_URI) {
    throw new Error('Add mongo URI');
}
const dbUri = process.env.MONGODB_URI;
mongoose_1.default.set('strictQuery', true);
console.log('dbUri: ' + dbUri);
mongoose_1.default.connect(dbUri).catch(error => { throw new Error(error); });
const db = mongoose_1.default.connection;
app.use((0, express_session_1.default)({
    secret: 'hereIsRandomSecretCodeThatNobodyKnowsAbout!',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: dbUri }),
}));
db.once('open', () => {
    console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));
/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
