angular
   .module('myApp',['ngRoute'])
	 .config(['$routeProvider',function($routeProvider){
		 $routeProvider
     .when('/',{
        templateUrl : "templates/main.html"
     })
     .when('/contact',{
        templateUrl: "templates/contact.html"
     })
     .otherwise({
       redirectTo: '/'
     });
	 }]);

// END OF ANGULAR MODULE LOAD

/*
 * Navigation animation menu
 */
    function showDiv(){
      var x = document.getElementsByClassName("outerdiv");
      x[0].style.width = "200px";
      x[0].style.paddingLeft = "65px";
    }

    function hideDiv(){
      var x = document.getElementsByClassName("outerdiv");
      x[0].style.width = "0px";
      x[0].style.paddingLeft = "0px";
    }

    //Declaring a global user input city
    var userCity = "";

    //Main event handler function after the button is clicked

    function changeBtn(){
      $("input:nth-child(2)").removeClass( "btn-search" ).addClass( "spinner" );
      var cityStr = $('#city').val();
      userCity = cityStr;
      getWikiData();
      // getGoogleApi();
    };

    // Wikipedia AJAX request goes HERE


      function getGoogleApi(){
            var googleImgUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+userCity+'&key=AIzaSyCTCu6rbGBDym3EQfFt6_97er7JrtejxOo';
            console.log(googleImgUrl);
            var googleApiRequestTimeout = setTimeout(function(){
              console.log("failed to get google image data");
            },8000);
            $.ajax({
              // jsonpCallback: 'jsonCallback',
              url: googleImgUrl,
              jsonpCallback: 'jsonp_callback',
              contentType: "application/json",
              dataType: 'jsonp',
              success: function(response){
                var articleList = response[1];
                for(var i = 0;i<articleList.length;i++){
                  articleStr = articleList[i];
                  var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                  $wikiElem.append('<li><a href="' + url +'">'+articleStr + '</a></li>');
                };
                console.log(articleStr);
                clearTimeout(wikiRequestTimeout);
              }
            })
            return false;
      }

      //Custom javascript for Wow animate
      var wow = new WOW(
        {
          boxClass:     'wowload',      // animated element css class (default is wow)
          animateClass: 'animated', // animation css class (default is animated)
          offset:       0,          // distance to the element when triggering the animation (default is 0)
          mobile:       true,       // trigger animations on mobile devices (default is true)
          live:         true        // act on asynchronously loaded content (default is true)
        }
      );
      wow.init();
