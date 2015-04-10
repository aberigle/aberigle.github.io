(function() {
  var API, ImageAPI, aberigle,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  console.log("Hay there, you can find me @aberigle");

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

  aberigle = {};

  aberigle.api = new ImageAPI;

  window.onload = function() {
    return aberigle.api.getImage(function(response) {
      var link;
      document.body.style.backgroundImage = "url(" + response.imageUrl + ")";
      link = copyright.firstChild;
      link.href = response.copyrightLink;
      link.text = response.copyright;
      copyright.onmouseenter = function() {
        return document.body.classList.add("clean");
      };
      return copyright.onmouseleave = function() {
        return document.body.classList.remove("clean");
      };
    });
  };

}).call(this);
