module.exports = {
  // "db": {
  //       "mongodb":  "mongodb://razawi:aq12345@ds039960.mongolab.com:39960/bookstore",
		// "shell":  "mongo ds039960.mongolab.com:39960/bookstore -u razawi -p aq12345"
  //   },
  
    "logger": {
        "api": "logs/api.log",
        "exception": "logs/exceptions.log"
    }
	
	window.fbAsyncInit = function() {
    FB.init({
      appId      : '1730255207201356',
      xfbml      : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

};