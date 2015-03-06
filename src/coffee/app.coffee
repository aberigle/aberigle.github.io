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

class ImageAPI extends API

  constructor : -> super "http://image-a-day.herokuapp.com/"

  getImage : (callback) -> @_get "/image", (response) ->
    callback? JSON.parse response.response

aberigle = {}
aberigle.api = new ImageAPI

window.onload = ->
  aberigle.api.getImage (response) ->
    document.body.style.backgroundImage = "url(#{response.imageUrl})"
    link = copyright.firstChild
    link.href = response.copyrightLink
    link.text = response.copyright

    copyright.onmouseenter = -> document.body.classList.add "clean"
    copyright.onmouseleave = -> document.body.classList.remove "clean"
