var app = angular.module('storeApp',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/login',{
                        templateUrl:'Views/login.html',
                        controller:'storecontroller'
                        }).when('/billing',{
                        templateUrl:'Views/billing.html',
                        controller:'Billingcontroller'
                        }).when('/summary',{
                        templateUrl:'Views/summary.html',
                          controller:'storecontroller'
                       
    }).otherwise({redirectTo:'/login'});
            
});
app.controller('storecontroller',function($scope,$http,$location){
  
    
    $scope.submit = function() {
        
     if($scope.loginform.$valid) {
         
        $http.get('js/users.json').success(function(data){

             $scope.authorized = data;
         
          for(i=0; i < $scope.authorized.length; i++){
                 
                if(($scope.user.name == $scope.authorized[i].name)&& ($scope.user.name == $scope.authorized[i].name)) {
                $location.path('/billing'); 
                    break;
            
                }
            }
            
            
        });
        
     } else {
         
         $scope.early = true;
     }
        
    }
});
app.controller('Billingcontroller',function($scope,$http,$location){
    
 $http.get('js/inventory.json').success(function(data){
       $scope.CartProduct = [];
     $scope.AllProducts = data;
     $scope.Add=function(product) {
      
      if($scope.product== undefined || $scope.product.ProductId==null || ( $scope.product.ProductId > 25) || ($scope.product.ProductId < 1 ) ) {
         $scope.empty = true;     
        if ( ( $scope.product.ProductId > 25) || ($scope.product.ProductId < 1 )){
            $scope.empty = false;  
          $scope.inValid = true;
       }
       } else {
        
         
            $scope.empty = false;  
          $scope.inValid = false;
        
       
           
          $scope.CartProduct.push($scope.AllProducts[(product.ProductId)-1]);
  
           $scope.CartProduct[(product.ProductId)-1].TotalPrice =   $scope.CartProduct[(product.ProductId)-1].Price;
             $scope.CartProduct[(product.ProductId)-1].Units =1;
       alert(JSON.stringify($scope.CartProduct[0]));
           $scope.product  =  $scope.CartProduct[(product.ProductId)-1];
           
           
       }
          
    }
     $scope.AddMore = function(currentProduct) {
       $scope.product.ToatalPrice=((currentProduct.Units)*(currentProduct.Price));
     }
     
 });
   
      
    
    
});
