/*
  app v0.0.0 - 6/3/2015

  Author: _NAME_ - _EMAIL_
*/
(function(){var a,b,c,d=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},e={}.hasOwnProperty;console.log("Hay there, you can find me @aberigle"),a=function(){function a(a){this.path=a}return a.prototype.path="",a.prototype.execute=function(a,b,c,d){var e;return null==a&&(a={}),e=new XMLHttpRequest,e.onreadystatechange=function(a){return 4===e.readyState&&"function"==typeof d?d(a.target):void 0},e.open(c,this.path+b,!0),"POST"===c||"PUT"===c||"PATCH"===c?e.send(JSON.stringify(a)):e.send()},a.prototype._get=function(a,b){return this.execute(null,a,"GET",b)},a.prototype._post=function(a,b,c){return this.execute(a,b,"POST",c)},a.prototype._put=function(a,b,c){return this.execute(a,b,"PUT",c)},a.prototype._del=function(a,b){return this.execute(null,a,"DELETE",b)},a}(),b=function(a){function b(){b.__super__.constructor.call(this,"http://image-a-day.herokuapp.com/")}return d(b,a),b.prototype.getImage=function(a){return this._get("/image",function(b){return"function"==typeof a?a(JSON.parse(b.response)):void 0})},b}(a),c={},c.api=new b,window.onload=function(){return c.api.getImage(function(a){var b;return document.body.style.backgroundImage="url("+a.imageUrl+")",b=copyright.firstChild,b.href=a.copyrightLink,b.text=a.copyright,copyright.onmouseenter=function(){return document.body.classList.add("clean")},copyright.onmouseleave=function(){return document.body.classList.remove("clean")}})}}).call(this);