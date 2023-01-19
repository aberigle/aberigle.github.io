(function() {
  var API, ImageAPI, LastFM, aberigle;

  console.log("👋 Hay there, you can find me @aberigle (https://twitter.com/aberigle) 👍");

  window.isArray = function(object) {
    return Object.prototype.toString.call(object) === "[object Array]";
  };

  API = (function() {
    class API {
      constructor(path1) {
        this.path = path1;
      }

      execute(message = {}, path, method, callback) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(event) {
          if (xhr.readyState === 4) {
            return typeof callback === "function" ? callback(event.target) : void 0;
          }
        };
        xhr.open(method, this.path + path, true);
        if (method === "POST" || method === "PUT" || method === "PATCH") {
          return xhr.send(JSON.stringify(message));
        } else {
          return xhr.send();
        }
      }

      _get(path, callback) {
        return this.execute(null, path, "GET", callback);
      }

      _post(message, path, callback) {
        return this.execute(message, path, "POST", callback);
      }

      _put(message, path, callback) {
        return this.execute(message, path, "PUT", callback);
      }

      _del(path, callback) {
        return this.execute(null, path, "DELETE", callback);
      }

    };

    API.prototype.path = "";

    return API;

  }).call(this);

  ImageAPI = class ImageAPI extends API {
    constructor() {
      super("https://image-api-chi.vercel.app/api");
    }

    getImage(callback) {
      return this._get("/image", function(response) {
        return typeof callback === "function" ? callback(JSON.parse(response.response)) : void 0;
      });
    }

  };

  LastFM = (function() {
    var paramsToString;

    class LastFM extends API {
      constructor(key) {
        var url;
        url = "https://ws.audioscrobbler.com/2.0/?format=json";
        url += `&api_key=${key}`;
        super(url);
      }

      getNowPlaying(user, callback) {
        var url;
        url = paramsToString({
          method: "user.getrecenttracks",
          user: user,
          limit: 1
        });
        return this._get(url, function(response) {
          var ref, track;
          response = JSON.parse(response.response).recenttracks;
          if ((response.track != null) && isArray(response.track)) {
            track = response.track[0];
            if (((ref = track["@attr"]) != null ? ref.nowplaying : void 0) === "true") {
              return typeof callback === "function" ? callback(track) : void 0;
            }
          }
          return typeof callback === "function" ? callback() : void 0;
        });
      }

    };

    paramsToString = function(params) {
      var key, string;
      string = "";
      for (key in params) {
        string += `&${key}=${params[key]}`;
      }
      return string;
    };

    return LastFM;

  }).call(this);

  window.aberigle = aberigle = {};

  aberigle.api = {
    image: new ImageAPI(),
    lastfm: new LastFM("9ad1ebab368b74b48c4fbd6cf095087e")
  };

  window.onload = function() {
    var drawImage, drawTrack;
    copyright.onmouseenter = function() {
      return document.body.classList.add("clean");
    };
    copyright.onmouseleave = function() {
      return document.body.classList.remove("clean");
    };
    drawTrack = function(track) {
      var equalizer, imageUrl, lastfm, link;
      if (track == null) {
        return false;
      }
      imageUrl = track.image[track.image.length - 1]["#text"];
      if (imageUrl === "") {
        return false;
      }
      background.style.backgroundImage = `url(${imageUrl})`;
      link = copyright.children[1];
      link.innerHTML = track.name + " <br> " + `<small>${track.artist["#text"]}</small>`;
      link.href = "https://www.last.fm/user/Jayle23";
      equalizer = copyright.children[0];
      equalizer.src = './static/images/equalizer.gif';
      lastfm = window.lastfm.children[0];
      lastfm.firstChild.src = imageUrl;
      lastfm.children[1].innerHTML = `${track.name}<br>
<small>${track.artist["#text"]}</small>`;
      document.body.classList.add("lastfm");
      return true;
    };
    drawImage = function(response) {
      var image, link;
      image = response.images[0];
      background.style.backgroundImage = `url(${'https://bing.com' + image.url})`;
      link = copyright.children[1];
      link.href = image.copyrightlink;
      return link.text = image.copyright;
    };
    return aberigle.api.lastfm.getNowPlaying("jayle23", function(track) {
      if (!drawTrack(track)) {
        return aberigle.api.image.getImage(drawImage);
      }
    });
  };

}).call(this);
