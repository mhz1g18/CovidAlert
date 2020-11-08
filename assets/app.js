
// Create angularJS module and add the dependencies

covidTracker = angular.module('covidTracker', ['ui.router', 
                                               'UsersModule', 
                                               'APIModule', 
                                               'VenuesModule', 
                                               'CheckinModule',
                                               'NotificationsModule'
]);

covidTracker.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    // Define default route
    $urlRouterProvider.otherwise('/index');

    // Define App States
    // Each state has an URL 
    // Each state has a template html file
    // Each state has a controller

    $stateProvider

    .state('index', {
        url: '/index',
        templateUrl: './views/index.html'
    })

    .state('users', {
        url: '/users',
        templateUrl: './views/users/listview.html',
        controller: 'UsersCtrl',
        controllerAs: '$ctrl'
    })

    .state('userscreate', {
        url: '/users/create',
        templateUrl: './views/users/create.html',
        controller: 'CreateUserCtrl',
        controllerAs: '$ctrl'
    })

    .state('usersedit', {
        url: '/users/edit/:id',
        templateUrl: './views/users/edit.html',
        controller: 'EditUserCtrl',
        controllerAs: '$ctrl',
        resolve : {
            user : function(APIFactory, $stateParams) {
                // Query API for user data and inject into controller before instantiation
                var id = $stateParams.id;
                return APIFactory.getUsers(id)
                        .then(resp => { return resp.data; })
            }
        }
    })

    .state('venues', {
        url: '/venues',
        templateUrl: './views/venues/listview.html',
        controller: 'VenuesCtrl',
        controllerAs : '$ctrl'
    })

    .state('venuescreate', {
        url: '/venues/create',
        templateUrl: './views/venues/create.html',
        controller: 'CreateVenueCtrl',
        controllerAs: '$ctrl'
    })

    .state('venuesedit', {
        url: '/venues/edit/:id',
        templateUrl: './views/venues/edit.html',
        controller: 'EditVenueCtrl',
        controllerAs: '$ctrl',
        resolve : {
            venue : function(APIFactory, $stateParams) {
                // Query API for venue data and inject into controller before instantiation
                var id = $stateParams.id;
                return APIFactory.getVenues(id)
                        .then(resp => { return resp.data; })
            }
        }
    })

    
    .state('checkins', {
        url: '/checkins',
        params : {user: null, venue: null},
        templateUrl: './views/checkins/listview.html',
        controller: 'CheckinCtrl',
        controllerAs: '$ctrl'
    })

    .state('createcheckin', {
        url: '/checkins/create',
        params : {user: null, venue: null},
        templateUrl: './views/checkins/create.html',
        controller: 'CreateCheckinCtrl',
        controllerAs: '$ctrl',
        resolve : {
            users : function(APIFactory) {
                return APIFactory.getUsers()
                .then(resp => {
                    return resp.data
                })
            },
            venues : function(APIFactory) {
                return APIFactory.getVenues()
                .then(resp => {
                    return resp.data
                })

            }
        }
    })

    .state('notifications', {
        url: '/notifications', 
        params: {userId: null},
        templateUrl: './views/notifications/listview.html',
        controller: 'NotificationsCtrl',
        controllerAs: '$ctrl'
    })

});

