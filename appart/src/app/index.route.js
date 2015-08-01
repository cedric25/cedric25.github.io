function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider

    .state('navbar', {
      abstract: true,
      templateUrl: 'app/withNavbar/withNavbar.html'
    })

    .state('navbar.home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('navbar.list', {
      url: '/list',
      templateUrl: 'app/list/list.html',
      controller: 'ListController',
      controllerAs: 'list'
    })
    .state('navbar.detail', {
      url: '/detail/:name',
      templateUrl: 'app/detail/detail.html',
      controller: 'DetailController',
      controllerAs: 'detail'
    })
    .state('navbar.contact', {
      url: '/contact',
      templateUrl: 'app/contact/contact.html'
    });

  $urlRouterProvider.otherwise('/list');
}

export default routerConfig;
