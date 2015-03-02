(function() {
  var API, BingAPI, aberigle,
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

  BingAPI = (function(superClass) {
    extend(BingAPI, superClass);

    function BingAPI() {
      BingAPI.__super__.constructor.call(this, "http://image-a-day.herokuapp.com/");
    }

    BingAPI.prototype.getImage = function(location, callback) {
      var attrString, attrs, key;
      attrs = {
        format: "js",
        idx: 0,
        n: 1,
        location: location
      };
      attrString = "?";
      for (key in attrs) {
        if (attrs[key] != null) {
          attrString += key + "=" + attrs[key] + "&";
        }
      }
      return this._get("/image", function(response) {
        return typeof callback === "function" ? callback(JSON.parse(response.response)) : void 0;
      });
    };

    return BingAPI;

  })(API);

  aberigle = {};

  aberigle.api = new BingAPI;

  window.onload = function() {
    return aberigle.api.getImage(navigator.language, function(response) {
      var link;
      document.body.style.backgroundImage = "url(" + response.imageUrl + ")";
      link = copyright.firstChild;
      link.href = response.copyrightLink;
      link.text = response.copyright;
      return console.log(response);
    });
  };

}).call(this);
