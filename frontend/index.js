const fallback = require('express-history-api-fallback')
const express = require('express')
const { join } = require('path')

const app = express()
const root = join(__dirname, 'dist')
const port = process.env.APP_PORT || 8080
app.use(express.static(root))
app.use(fallback('index.html', { root }))
app.listen(port, () => console.log(`Frontend running at http://localhost:${port}`))
