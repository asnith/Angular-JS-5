(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })

    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })

    .state('signup',{
      url: '/signup',
      template: ' <div><form class="form" name="forms" style=" text-align: center; font-size: 2.5vw"><div class="form-group">First Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" ng-model="firstname" name="firstname" required style="color: black; font-weight: bolder"><br><span ng-if="forms.firstname.$error.required && forms.firstname.$touched" style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** This is a required field</span></div><div class="form-group">Last Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" style="color: black; font-weight: bolder;" name="lastname" required ng-model="lastname"><br><span ng-if="forms.lastname.$error.required && forms.lastname.$touched" style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** This is a required field</span></div><div class="form-group">Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input required style="color: black; font-weight: bolder" type="email" ng-model="email" name="email"><br><span ng-if="(forms.email.$error.required|| forms.email.$invalid) && forms.email.$touched" style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** Invalid Email Address</span></div><div class="form-group">Phone Number : <input type="number" maxlength="10" required name="phone" ng-model="phone" style="color: black; font-weight: bolder;"><br><span ng-if="(forms.phone.$invalid||forms.phone.$error.maxlength || forms.phone.$error.required) && forms.phone.$touched" style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** Invalid Mobile Number</span></div><div class="form-group">Menu Number : &nbsp;<input required name="menu" type="text" style="color: black; font-weight: bolder;" ng-model="menu"><br><span ng-if="forms.menu.$error.required && forms.menu.$touched" style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** This is a required field</span></div><div class="form-group"><button ng-click="submit(firstname,lastname,email,phone,menu)" ng-disabled="forms.$invalid" type="submit" name="submit" style="background-color: black">Submit</button></div> {{message}}</form></div>'
    })

    .state('info',{
      url:'/info',
       template:'<div ng-if="num!=0"><div>The Registered Records are : <br><br> Name : {{pr[0]+" "+pr[1]}}</div><div> Email : {{pr[2]}} </div><div> Phone Number : {{pr[3]}}</div><div> <br><br><img src="images/menu/{{pr[4]}}/{{pr[4]}}.jpg" width="300px" height="300px"></div></div><div ng-if="num==0">Not Signed Up Yet. <a ui-sref="signup">Sign up Now!</a></div> '
      
    })
}
})();
