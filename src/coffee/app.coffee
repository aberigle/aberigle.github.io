console.log "Hay there, you can find me @aberigle"

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

  constructor : -> super "http://image-a-day.herokuapp.com/"

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
      if Object::toString.call(response.track) is "[object Array]"
        callback? response.track[0]
      else callback?()

window.aberigle = aberigle = {}
aberigle.api =
  image  : new ImageAPI
  lastfm : new LastFM "9ad1ebab368b74b48c4fbd6cf095087e"

window.onload = ->
  drawTrack = (track) ->
    alert track.name

  aberigle.api.lastfm.getNowPlaying "jayle23", (track) ->
    if track? then drawTrack track
    else aberigle.api.image.getImage (response) ->
      document.body.style.backgroundImage = "url(#{response.imageUrl})"
      link = copyright.firstChild
      link.href = response.copyrightLink
      link.text = response.copyright

      copyright.onmouseenter = -> document.body.classList.add "clean"
      copyright.onmouseleave = -> document.body.classList.remove "clean"
