var notificationsModule = angular.module('NotificationsModule', ['APIModule']);

notificationsModule.controller('NotificationsCtrl', function(APIFactory, $stateParams){
    // Use the factory method to query the API for all the notifications
    console.log($stateParams);
    if($stateParams.userId){
        APIFactory.getNotifications($stateParams.userId)
        .then(resp => {
            this.notifications = resp.data
            console.log(this.notifications);
        });
    } else {
        APIFactory.getNotifications()
        .then(resp => {
            this.notifications = resp.data
            console.log(this.notifications);
        });
    }

});