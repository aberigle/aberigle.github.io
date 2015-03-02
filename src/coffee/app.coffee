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
    # xhr.setRequestHeader("x-requested-with", "XMLHttpRequest")
    if method in ["POST","PUT", "PATCH"] then xhr.send JSON.stringify message
    else xhr.send()

  _get: (path, callback) -> @execute null, path, "GET", callback

  _post: (message, path, callback) -> @execute message, path, "POST", callback

  _put: (message, path, callback) -> @execute message, path, "PUT", callback

  _del: (path, callback) -> @execute null, path, "DELETE", callback

class BingAPI extends API

  constructor : -> super "http://image-a-day.herokuapp.com/"

  getImage : (location, callback) ->
    attrs =
      format   : "js"
      idx      : 0
      n        : 1
      location : location
    attrString = "?"
    attrString += "#{key}=#{attrs[key]}&" for key of attrs when attrs[key]?
    @_get "/image", (response) -> callback? JSON.parse response.response

aberigle = {}
aberigle.api = new BingAPI

window.onload = ->
  aberigle.api.getImage navigator.language, (response) ->
    document.body.style.backgroundImage = "url(#{response.imageUrl})"
    link = copyright.firstChild
    link.href = response.copyrightLink
    link.text = response.copyright
    console.log response
