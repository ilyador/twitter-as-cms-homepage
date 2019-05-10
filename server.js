const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Twit = require('twit')


require('dotenv').config()

const port = process.env.PORT || 5000
const user = process.env.MY_USER

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
})

// const stream = T.stream('user', {
//   with: user
// })


io.on('connection', socket => {
  T.get('statuses/user_timeline', {
    count: 10,
    tweet_mode: 'extended'
  }, (err, data, response) => {
    let tweets = []

    for (let i = 0; i < data.length; i++) {
      tweets.push(data[i].full_text)
    }

    socket.emit('tweetList', { tweets: tweets })
  })

  // stream.on('tweet', tweet => {
  //   const text = (tweet.extended_tweet) ? tweet.extended_tweet.full_text : tweet.text
  //   socket.emit('liveTweet', { tweet: text })
  //   console.log(text)
  // })
})

server.listen(port, () => console.log(`Listening on ${port}`, '\n\n'))
