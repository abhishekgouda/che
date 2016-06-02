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
app.controller('storecontroller',function($scope,$http,$location,$rootScope){
  
    
    $scope.submit = function() {
        
     if($scope.loginform.$valid) {
         
        $http.get('js/users.json').success(function(data){

             $scope.authorized = data;
         
          for(i=0; i < $scope.authorized.length; i++){
                 
                if(($scope.user.name == $scope.authorized[i].name)&& ($scope.user.name == $scope.authorized[i].name)) {
                 $rootScope.User = $scope.user.name;
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
        $scope.CartProduct=[];
 $http.get('js/inventory.json').success(function(data){
  

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
                 
          $scope.product  =  $scope.AllProducts[(product.ProductId)-1];
           
          
           $scope.product.Units = 1;
        
              $scope.product.TotalPrice = $scope.product.Price;
            
       }
          
    }
     $scope.AddMore = function(currentProduct) {
       
         $scope.product.TotalPrice = (currentProduct.Units)*(currentProduct.Price);
       
     }
     $scope.Finalize  =function() {
         
         if($scope.CartProduct.length<5) {
             var flag=true;
        
             if($scope.CartProduct.length!=0){
                 for(i=0;i<$scope.CartProduct.length;i++){
                  if($scope.CartProduct[i].ProductId == $scope.product.ProductId)  {
                     flag = false;  
                   $scope.CartProduct[i].Units+=$scope.product.Units;
                      $scope.CartProduct[i].TotalPrice =  $scope.CartProduct[i].Units *$scope.CartProduct[i].Price;
                      
                   }  
                 }
             }
     
          if(flag){
              
           $scope.CartProduct.push( angular.copy($scope.product));
          }
         
         } else {
            alert("cart is full so redirecting to summary");
             $location.path('/summary');
         }
         
         $scope.product = "";
         
         
     }
     
     
     
 });
   
      
    
    
});
