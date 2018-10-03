//index.html
angular.module('searchApp', [])
.controller("searchCtrl", ["$scope", "$window",
    function($scope, $window){
        
        $scope.searchNav = function(){
            $window.location.href = 'search.html?q='+$scope.user ;
        }
    }
    ]);

    //search.html
    angular.module('searchPageApp', [])
    .config(['$locationProvider', 
    function($locationProvider) { 
        $locationProvider.html5Mode({
             enabled: true, 
             requireBase: false 
            }); 
    }])
.controller("searchPageCtrl", ["$scope", "$http", "$window", "$location",
    function($scope, $http, $window, $location){
        var paramValue = $location.search().q; //Get parameter from url
        //Get data from api
        $scope.getSearch = function() {
            $http.get('https://api.github.com/search/users?q='+paramValue).then(function(response) {
                $scope.search = response.data.items;          
            });
          }
          $scope.searchNav = function(){
            $window.location.href = 'search.html?q='+$scope.user ;
        }
         
    }
    ]);

    //user.html
    angular.module('userApp', [])
    .config(['$locationProvider', 
        function($locationProvider) { 
            $locationProvider.html5Mode({
                 enabled: true, 
                 requireBase: false 
                }); 
        }])
    .controller("userCtrl", ["$location", "$scope", "$http",
        function($location, $scope, $http){
            
            var paramValue = $location.search().login; //Get parameter from url
            $scope.getUser = function() {
                
               //Get user data
                $http.get('https://api.github.com/users/'+paramValue)
                    .then(function(response) {
                        $scope.user = response.data;          
                    });
                    $http.get('https://api.github.com/users/'+paramValue+'/repos')
                     .then(function(response) {
                         $scope.repo = response.data;          
                     });
                     $scope.displayFollowers = {
                        "display" : "none"
                    }
                    $scope.displayFollowing = {
                        "display" : "none"
                    }
              }
              $scope.showRepo = function() {
                //Get user data
              
                 $http.get('https://api.github.com/users/'+paramValue+'/repos')
                     .then(function(response) {
                         $scope.repo = response.data;          
                     });
                     $scope.displayRepo = {
                         "display" : "grid"
                     }
                     $scope.displayFollowers = {
                         "display" : "none"
                     }
                     $scope.displayFollowing = {
                         "display" : "none"
                     }
               }
               $scope.showFollowers = function() {
                //Get user data
              
                 $http.get('https://api.github.com/users/'+paramValue+'/followers')
                     .then(function(response) {
                         $scope.followers = response.data;          
                     });
                     $scope.displayRepo = {
                        "display" : "none"
                    }
                    $scope.displayFollowers = {
                        "display" : "grid"
                    }
                    $scope.displayFollowing = {
                        "display" : "none"
                    }
               }
               $scope.showFollowing = function() {
                //Get user data
               
                 $http.get('https://api.github.com/users/'+paramValue+'/following')
                     .then(function(response) {
                         $scope.following = response.data;          
                     });
                     $scope.displayRepo = {
                        "display" : "none"
                    }
                    $scope.displayFollowers = {
                        "display" : "none"
                    }
                    $scope.displayFollowing = {
                        "display" : "grid"
                    }
               }
           
        }
        ])

       