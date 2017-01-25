'use strict'

const fs = require('fs')
const form = new require('form-data')()

// const filename = 'images/example.jpg'
const filename = 'images/Screen Shot 2017-01-25 at 14.05.26.png'

const options = {
  host: '127.0.0.1',
  port: 8001,
  path: '/api/upload',
  headers: {
    'Authorization': 'Bearer 157b1d6a-334e-4d43-ad81-8619d38215fc',
    'Accept': 'application/json'
  }
}

let uploadResult = ''
form.append('file', fs.createReadStream(filename))
form.submit(options, (err, response, body) => {
  if (err) console.error(err)

  response.on('data', (chunk) => {
    if (chunk) uploadResult += chunk
  })

  response.on('end', () => {
    uploadResult = JSON.parse(uploadResult)
    console.log('uploadResult', uploadResult)
  })
})
