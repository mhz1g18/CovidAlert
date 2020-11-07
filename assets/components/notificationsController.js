var notificationsModule = angular.module('NotificationsModule', ['APIModule']);

notificationsModule.controller('NotificationsCtrl', function(APIFactory){
    // Use the factory method to query the API for all the notifications
    APIFactory.getNotifications()
        .then(resp => {
            this.notifications = resp.data
            console.log(this.notifications);
        });

});