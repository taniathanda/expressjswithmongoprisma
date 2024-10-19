const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postsRoute');
const indexRoutes = require('./routes/indexRoute');
const categoryRoutes = require('./routes/categoryRoute');
const authMiddleware = require ('./middlewares/authMiddleware');
// require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"))
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'gdsdgdfdfd',
    resave: false,
    saveUninitialized: true  // true means save whenever session data was changed. like if password changes, other machine logined will logout or not, that concept
}));
app.use(expressLayouts)
app.use((req,res,next) => {
    res.locals.userId = req.session.userId;
    next();
});
app.use('/', indexRoutes); // project စ Run မဲ့ေနရာ (Home page)
app.use('/auth', authRoutes);
app.use('/posts', authMiddleware, postRoutes); // only if login success, user's post can be seen.
app.use('/categories', categoryRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on post http://localhost:${PORT}`));
