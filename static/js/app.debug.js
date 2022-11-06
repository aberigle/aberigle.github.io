(function() {
  var API, ImageAPI, LastFM, aberigle,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  console.log("👋 Hay there, you can find me @aberigle (https://twitter.com/aberigle) 👍");

  window.isArray = function(object) {
    return Object.prototype.toString.call(object) === "[object Array]";
  };

  API = (function() {
    API.prototype.path = "";

    function API(path) {
      this.path = path;
    }

    API.prototype.execute = function(message, path, method, callback) {
      var xhr;
      if (message == null) {
        message = {};
      }
      xhr = new XMLHttpRequest;
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
    };

    API.prototype._get = function(path, callback) {
      return this.execute(null, path, "GET", callback);
    };

    API.prototype._post = function(message, path, callback) {
      return this.execute(message, path, "POST", callback);
    };

    API.prototype._put = function(message, path, callback) {
      return this.execute(message, path, "PUT", callback);
    };

    API.prototype._del = function(path, callback) {
      return this.execute(null, path, "DELETE", callback);
    };

    return API;

  })();

  ImageAPI = (function(_super) {
    __extends(ImageAPI, _super);

    function ImageAPI() {
      ImageAPI.__super__.constructor.call(this, "https://dry-plateau-3558.herokuapp.com/");
    }

    ImageAPI.prototype.getImage = function(callback) {
      return this._get("/image", function(response) {
        return typeof callback === "function" ? callback(JSON.parse(response.response)) : void 0;
      });
    };

    return ImageAPI;

  })(API);

  LastFM = (function(_super) {
    var paramsToString;

    __extends(LastFM, _super);

    function LastFM(key) {
      var url;
      url = "http://ws.audioscrobbler.com/2.0/?format=json";
      url += "&api_key=" + key;
      LastFM.__super__.constructor.call(this, url);
    }

    paramsToString = function(params) {
      var key, string;
      string = "";
      for (key in params) {
        string += "&" + key + "=" + params[key];
      }
      return string;
    };

    LastFM.prototype.getNowPlaying = function(user, callback) {
      var url;
      url = paramsToString({
        method: "user.getrecenttracks",
        user: user,
        limit: 1
      });
      return this._get(url, function(response) {
        var track, _ref;
        response = JSON.parse(response.response).recenttracks;
        if ((response.track != null) && isArray(response.track)) {
          track = response.track[0];
          if (((_ref = track["@attr"]) != null ? _ref.nowplaying : void 0) === "true") {
            return typeof callback === "function" ? callback(track) : void 0;
          }
        }
        return typeof callback === "function" ? callback() : void 0;
      });
    };

    return LastFM;

  })(API);

  window.aberigle = aberigle = {};

  aberigle.api = {
    image: new ImageAPI,
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
      background.style.backgroundImage = "url(" + imageUrl + ")";
      link = copyright.children[1];
      link.innerHTML = track.name + " <br> " + ("<small>" + track.artist["#text"] + "</small>");
      link.href = "http://www.last.fm/user/Jayle23";
      equalizer = copyright.children[0];
      equalizer.src = './static/images/equalizer.gif';
      lastfm = window.lastfm.children[0];
      lastfm.firstChild.src = imageUrl;
      lastfm.children[1].innerHTML = "" + track.name + "<br>\n<small>" + track.artist["#text"] + "</small>";
      document.body.classList.add("lastfm");
      return true;
    };
    drawImage = function(response) {
      var image, link;
      image = response.images[0];
      background.style.backgroundImage = "url(" + ('https://bing.com' + image.url) + ")";
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
