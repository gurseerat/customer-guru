angular.module('searchApp', [])
.controller("searchCtrl", ["$scope", "$http",
    function($scope, $http){
        //Get data from api
        $scope.getData = function() {
            $http.get('https://api.github.com/search/users?q=tom').then(function(response) {
                $scope.response = response.data.items;          
            });
          }
          //Show search box on focus
        $scope.showBox = function(){
            var box = angular.element( document.querySelector( '.search-box' ) );
            box.addClass('show');
        }
    }
    ]);


    

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

