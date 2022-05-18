const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const users = require("./routes/users");
const messages = require("./routes/messages");
const comments = require("./routes/comments");
const share = require("./routes/share.js");
const path = require('path');

const app = express()

const port = 3000

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/users', users)
app.use('/messages', messages)
app.use('/comments', comments)
app.use('/share', share)