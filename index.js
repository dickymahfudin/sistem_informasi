require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('express-flash');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const multer = require('multer');
const { lokasi } = require('./src/models');
// const middleware = require('./src/helpers/middleware');
const lokasiRouter = require('./src/routes/lokasi');
const dashboardRouter = require('./src/routes/dashboard');
const loginRouter = require('./src/routes/login');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 9000000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret',
  })
);
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/upload'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: diskStorage });
app.use(flash());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts');

app.use(function (req, res, next) {
  res.locals.login = req.session.login || false;
  next();
});

app.use('/login', loginRouter);
app.use('/lokasi', upload.single('image'), lokasiRouter);
app.use('/dashboard', dashboardRouter);
app.post('/publish', async (req, res) => {
  try {
    console.log('object');
    const { id } = req.body;
    const getLokasi = await lokasi.findByPk(id);
    await getLokasi.update({ publish: true });
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});
app.use('*', (req, res) => res.redirect('/dashboard'));

app.listen(PORT, () => console.info(`Server Running on : http://localhost:${PORT}`));
