require('dotenv').config({ override: true });
const cors = require('cors');
const express = require('express');


const UserRouter = require('./routes/user');
const ProjectRouter = require('./routes/project');
const ClientRouter = require('./routes/client');
const BoardRouter = require('./routes/board');
const { Admin } = require('./controllers/user.controller');

const app = express();
app.use(express.json());

// ✅ 1. Enable CORS (safe)
app.use(cors());

// 🚫 2. DO NOT parse JSON before multer routes
// app.use(express.json());

// ✅ 3. Mount routes that use multer BEFORE express.json()
app.use('/client', ClientRouter);

// ✅ 4. Other routes
app.use('/user', UserRouter);
app.use('/project', ProjectRouter);
app.use('/board', BoardRouter);

// ✅ 5. Static folders
app.use('/contactimages', express.static('./Cimages'));
app.use('/projectfiles', express.static('./files'));
app.use('/userimages', express.static('./images'));

// ✅ 6. JSON parser AFTER all multer routes


app.get('/', (req, res) => res.send('Server is running on port 3000'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  Admin();
});


// const express = require('express');
// const cors = require('cors');
// const app = express();

// const ClientRouter = require('./routes/client');

// app.use(cors());
// // ⚠️ Don't use express.json() or express.urlencoded() before multer routes
// app.use('/client', ClientRouter);

app.listen(3000, () => console.log('Server running on 3000'));
// require('dotenv').config({ override: true });
// const cors = require('cors');
// const express = require('express');
// const UserRouter = require('./routes/user');
// const ProjectRouter = require('./routes/project');
// const ClientRouter = require('./routes/client');
// const BoardRouter = require('./routes/board');
// const {Admin} =require('./controllers/user.controller')
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/user',UserRouter);
// app.use('/project',ProjectRouter);
// app.use('/client',ClientRouter);
// app.use('/board',BoardRouter);
// app.use('/contactimages',express.static('./Cimages'));
// app.use('/projectfiles',express.static('./files'));
// app.use('/userimages',express.static('./images'));
// app.get('/',(req,res)=>{res.send('Server is running on port 3000')});
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
//   Admin();
// });