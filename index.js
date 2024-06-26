const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan')
const multer = require('multer')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const MentorApplication = require('./models/MentorApplication.js')

const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://chai-trade-client.vercel.app',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


const userRoutes = require('./routes/user');
const simulatorRoute = require('./routes/simulator');
const utilRoutes = require('./routes/util');
const marketTermRoute = require('./routes/marketTerm');
const mentorRoute = require('./routes/mentor');
const newsRoute = require('./routes/news');
const blogRoute = require('./routes/blog');
const chartRoute = require('./routes/chart');
const educationalRoutes = require('./routes/EducationalResources')

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chai Trade Application',
            version: '1.0.0'
        },
        servers: [{
            url: 'https://chai-trade-server.onrender.com'
        }]
    },
    apis: ['./routes/*.js', './index.js']
}

const swaggerspec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerspec))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const directory = './uploads';
        fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) return cb(err, null);
            cb(null, directory);
        });
    },
    filename: async (req, file, cb) => {
        const newFileName = new Date().getTime().toString(16) + file.originalname;
        req.newFileName = newFileName;
        cb(null, newFileName);
    }
});


const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.json('Welcome to Chai Trade API');
});

const logRoute = (req, res, next) => {
    console.log(`Accessed route: ${req.method} ${req.url}`);
    next();
};

app.use(logRoute);

app.use('/api/user', userRoutes);
app.use('/api/simulator', simulatorRoute);
app.use('/api/util', utilRoutes);
app.use('/api/marketTerm', marketTermRoute);
app.use('/api/news', newsRoute);
app.use('/api/mentor', mentorRoute);
app.use('/api/blog', blogRoute);
app.use('/api/chart', chartRoute);
app.use('/api/educationalRoutes', educationalRoutes);

app.post('/api/postMentorApplication', upload.single('certificationPath'), (req, res) => {
    const application = new MentorApplication({
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userID,
        userName: req.body.userName,
        userEmail: req.body.email,
        country: req.body.country,
        tradingExperience: req.body.tradingExperience,
        tradingStrategy: req.body.tradingStrategy,
        reasonMentor: req.body.reasonMentor,
        certificationPath: req.file.path,
        dayTrading: req.body.dayTrading,
        swingTrading: req.body.swingTrading,
        optionsTrading: req.body.optionsTrading
    })
    application
        .save()
        .then(result => {
            res.status(200).json({
                custom: "The Mentor Application was submitted Successfully"
            })
            console.log("The Mentor Application was submitted Successfully")
        })
        .catch(err => {
            res.status(403).json({
                custom: "Mentor Application Process Denied"
            })
            console.log("Mentor Application Process Denied")
        })
})

module.exports = { app };