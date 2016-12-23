angular.module('myApp')
  .controller('WeatherCtrl', ['$scope','weatherfetch','$http',function($scope,weatherfetch,$http){
      //Test
      $scope.fName = weatherfetch.getFirstName();
      $scope.test = "Manjil Tamang";
      //console.log($scope.fName);

      var getPlace = "kathmandu";

      // Function triggers after search button in clicked
      $scope.search = function () {
        //Assigning the fetched variable to global variable
        getPlace = this.findPlace;
        $scope.getNytNews();
        $scope.getWikiJSON();
        $scope.getWeather();
        // $scope.getCountryDetail();
      }

      // Core engine function for retriving weather data.
      $scope.getWeather = function(){
        $scope.loading = true;
         var jsonUrl ='https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'+'"'+getPlace+'"'+')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys' ;
        //  console.log(jsonUrl);
         $http.get(jsonUrl)
          .then(function (response) {
            $scope.loading = false;
            $("input:nth-child(2)").removeClass( "spinner" ).addClass( "btn-search" );
           //for showing days
            $scope.days = response.data.query.results.channel.item.forecast;
            $scope.data = response.data.query.results.channel;
            $scope.cityName = $scope.data.title;
            $scope.countryName = $scope.data.location.country;
            console.log($scope.countryName);

            $scope.place = $scope.data.location.city + ", " +$scope.data.location.country;
            $scope.midInFarhen = function(i){
                var midFarhen = (parseInt($scope.days[i].high) + parseInt($scope.days[i].low))/2 ;
                //For removing decimel value
                var tempretureF = Math.round(midFarhen);
                return tempretureF;
            };
            $scope.midTemp = function(i){
                var midFarhen = (parseInt($scope.days[i].high) + parseInt($scope.days[i].low))/2 ;
                // Converting fahrenheit into celsius
                var mid = (midFarhen -32)/1.8;
                //For removing decimel value
                var tempretureC = Math.round(mid);
                return tempretureC;
            };
            $scope.currentDate = $scope.data.lastBuildDate.substring(4,11);
            // console.log($scope.data);
            // console.log($scope.days);

          })
          .catch(function (data) {
             $scope.errMsg = 'Problem getting weather data, please try again';
             alert($scope.errMsg);
             $("input:nth-child(2)").removeClass( "spinner" ).addClass( "btn-search" );
          });
      };


        $scope.getNytNews = function(){
          var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + getPlace + '&sort=newest&api-key=1fe452ce8a484c9b8c4caaa8c5b3ff81';
         //  console.log(jsonUrl);
          $http.get(nytimesUrl)
           .then(function (response) {
             $scope.articles = response.data.response.docs;
             console.log($scope.articles);
             $scope.getArticleSnippet = function(i){
                $scope.article =  $scope.articles[i];
                return $scope.article.snippet;
             };
             //console.log($scope.getArticleSnippet(1));
             $scope.getWebUrl = function(i){
                 $scope.article =  $scope.articles[i];
                 return $scope.article.web_url;
              };
             //console.log($scope.getWebUrl(1));

             $scope.getHeadline = function(i){
               $scope.article =  $scope.articles[i];
               return $scope.article.headline.main;
             }
            //  console.log($scope.getHeadline(1));
           });
        };

        // $scope.getCountryDetail = function(){
        //   var countryUrl = 'https://restcountries.eu/rest/v1/all';
        //  //  console.log(jsonUrl);
        //   $http.get(countryUrl)
        //    .then(function (response) {
        //      $scope.countryData = response.data;
        //      console.log($scope.countryData);
        //    });
        // };



        $scope.getWikiJSON = function(){
                var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+getPlace+ '&format=json&callback=JSON_CALLBACK';
                console.log(wikiURL);
                $http.jsonp(wikiURL)
                 .then(function (response) {
                    $scope.wikiData = response.data[1];
                    // $scope.wikiDataUrl = 'http://en.wikipedia.org/wiki/' +   $scope.wikiData;
                    console.log($scope.wikiData[1]);
                 });
        }

      // $scope.getBackgroundImage = function(){
      //   var googleImgUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+getPlace+'&key=AIzaSyCTCu6rbGBDym3EQfFt6_97er7JrtejxOo&callback=initMap';
      //   $http({
      //     url: googleImgUrl,
      //      dataType: 'jsonp',
      //      success: function(response){
      //        var articleL = response;
      //        console.log(articleL);
      //      }
      //   });
      //
      // }

      $scope.getNytNews();
      $scope.getWikiJSON();
      $scope.getWeather();
  }]);
