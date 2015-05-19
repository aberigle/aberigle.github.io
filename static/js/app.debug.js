(function() {
  var API, ImageAPI, LastFM, aberigle,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  console.log("Hay there, you can find me @aberigle");

  window.isArray = function(object) {
    return Object.prototype.toString.call(object) === "[object Array]";
  };

  API = (function() {
    API.prototype.path = "";

    function API(path1) {
      this.path = path1;
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

  ImageAPI = (function(superClass) {
    extend(ImageAPI, superClass);

    function ImageAPI() {
      ImageAPI.__super__.constructor.call(this, "http://image-a-day.herokuapp.com/");
    }

    ImageAPI.prototype.getImage = function(callback) {
      return this._get("/image", function(response) {
        return typeof callback === "function" ? callback(JSON.parse(response.response)) : void 0;
      });
    };

    return ImageAPI;

  })(API);

  LastFM = (function(superClass) {
    var paramsToString;

    extend(LastFM, superClass);

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
        response = JSON.parse(response.response).recenttracks;
        if ((response.track != null) && isArray(response.track)) {
          return typeof callback === "function" ? callback(response.track[0]) : void 0;
        } else {
          return typeof callback === "function" ? callback() : void 0;
        }
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
      link = copyright.children[1];
      link.text = track.name + " - " + track.artist["#text"];
      link.href = "http://www.last.fm/user/Jayle23";
      imageUrl = track.image[track.image.length - 1]["#text"];
      if (imageUrl === "") {
        return false;
      }
      background.style.backgroundImage = "url(" + imageUrl + ")";
      equalizer = copyright.children[0];
      equalizer.src = './static/images/equalizer.gif';
      lastfm = window.lastfm.children[0];
      lastfm.firstChild.src = imageUrl;
      lastfm.children[1].innerText = track.name + "\n" + track.artist["#text"];
      document.body.classList.add("lastfm");
      return true;
    };
    drawImage = function(response) {
      var link;
      background.style.backgroundImage = "url(" + response.imageUrl + ")";
      link = copyright.children[1];
      link.href = response.copyrightLink;
      return link.text = response.copyright;
    };
    return aberigle.api.lastfm.getNowPlaying("jayle23", function(track) {
      if (!drawTrack(track)) {
        return aberigle.api.image.getImage(drawImage);
      }
    });
  };

}).call(this);
