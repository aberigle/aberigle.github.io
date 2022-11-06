console.log "👋 Hay there, you can find me @aberigle (https://twitter.com/aberigle) 👍"

window.isArray = (object) -> Object::toString.call(object) is "[object Array]"

class API

  path : ""

  constructor: (@path) ->

  execute: (message = {}, path, method, callback) ->
    xhr = new XMLHttpRequest
    xhr.onreadystatechange = (event) ->
      if xhr.readyState is 4
        callback? event.target

    xhr.open method, @path + path, true
    if method in ["POST","PUT", "PATCH"] then xhr.send JSON.stringify message
    else xhr.send()

  _get: (path, callback) -> @execute null, path, "GET", callback

  _post: (message, path, callback) -> @execute message, path, "POST", callback

  _put: (message, path, callback) -> @execute message, path, "PUT", callback

  _del: (path, callback) -> @execute null, path, "DELETE", callback

class ImageAPI extends API

  constructor : -> super "https://dry-plateau-3558.herokuapp.com/"

  getImage : (callback) -> @_get "/image", (response) ->
    callback? JSON.parse response.response

class LastFM extends API

  constructor : (key) ->
    url = "http://ws.audioscrobbler.com/2.0/?format=json"
    url += "&api_key=#{key}"
    super url

  paramsToString = (params) ->
    string = ""
    for key of params then string += "&#{key}=#{params[key]}"
    string

  getNowPlaying : (user, callback) ->
    url = paramsToString
      method  : "user.getrecenttracks"
      user    : user
      limit   : 1

    @_get url, (response) ->
      response = JSON.parse(response.response).recenttracks
      if response.track? and isArray response.track
        track = response.track[0]
        if track["@attr"]?.nowplaying is "true" then return callback? track
      return callback?()

window.aberigle = aberigle = {}
aberigle.api =
  image  : new ImageAPI
  lastfm : new LastFM "9ad1ebab368b74b48c4fbd6cf095087e"

window.onload = ->

  copyright.onmouseenter = -> document.body.classList.add "clean"
  copyright.onmouseleave = -> document.body.classList.remove "clean"

  drawTrack = (track) ->
    unless track? then return false
    imageUrl = track.image[track.image.length - 1]["#text"]
    if imageUrl is "" then return false
    background.style.backgroundImage = "url(#{imageUrl})"

    link = copyright.children[1]
    link.innerHTML = track.name + " <br> " + "<small>#{track.artist["#text"]}</small>"
    link.href = "http://www.last.fm/user/Jayle23"

    equalizer = copyright.children[0]
    equalizer.src = './static/images/equalizer.gif'

    lastfm = window.lastfm.children[0]
    lastfm.firstChild.src = imageUrl
    lastfm.children[1].innerHTML = """
      #{track.name}<br>
      <small>#{track.artist["#text"]}</small>
      """

    document.body.classList.add "lastfm"
    return true

  drawImage = (response) ->
    image = response.images[0]
    background.style.backgroundImage = "url(#{'https://bing.com' + image.url})"
    link = copyright.children[1]
    link.href = image.copyrightlink
    link.text = image.copyright

  aberigle.api.lastfm.getNowPlaying "jayle23", (track) ->
    unless drawTrack(track) then aberigle.api.image.getImage drawImage
