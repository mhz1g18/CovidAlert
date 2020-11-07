var checkinModule = angular.module('CheckinModule', ['APIModule']);

checkinModule.controller('CheckinCtrl', function(APIFactory, $stateParams){
    // Use the factory method to query the API 
    // If a user or venue is passed to the parameters, query for that specific item
    queryParameters = {};

    if($stateParams.user) {
        queryParameters = {user_key : $stateParams.user.RowKey}
    } else if($stateParams.venue) {
        queryParameters = {venue_key : $stateParams.venue.RowKey}
    } 

    APIFactory.getCheckins(queryParameters)
        .then(resp => {
            this.checkins = resp.data
            this.checkins.forEach(checkin => {
                /* let correctDate = new Date(checkin.date);
                let offset = (correctDate.getTimezoneOffset() * 60000); 
                checkin.date = (new Date(correctDate - offset)); */
                console.log(checkin.date);
                checkin.date = new Date(checkin.date);
                //checkin.date = new Date(checkin.date - new Date().getTimezoneOffset() * 60000)
                console.log(checkin.date);
            });
        });

});

checkinModule.controller('CreateCheckinCtrl', function(APIFactory, users, venues ,$stateParams) {
    
    this.users = users;
    this.venues = venues;

    if($stateParams.user){
        this.selectedUser = $stateParams.user;
    } else if($stateParams.venue) {
        this.selectedVenue = $stateParams.venue;
    }

    this.createCheckin = function() {

        try {

            if(!this.selectedDate || !this.time){
                alert('Incorrect time/date');
                return;
            }

            date = new Date(this.selectedDate);

            let time = (this.time).split(':');
            let hours = time[0];
            let minutes = time[1];

            date.setMinutes(parseInt(minutes));
            date.setHours(parseInt(hours));

            let offset = (date.getTimezoneOffset() * 60000); 
            let localISOTime = (new Date(date - offset)).toISOString().slice(0,-1);

            checkin = {
                username : this.selectedUser.name + ' ' + this.selectedUser.surname,
                user_key : this.selectedUser.RowKey,
                venuename : this.selectedVenue.name,
                venue_key : this.selectedVenue.RowKey,
                date : date
            }
    
        } catch(err) {
            console.log(err);
            alert('Incorrect input!')
            return
        }
        

        APIFactory.createCheckin(checkin)
        .then(resp => {

            // Check HTTP Response data to determine if 
            // the request was successfull
            if(resp.data.isSuccessful){
                // Update checkins for user and venue
                let user = this.selectedUser;
                let userCheckins = user.checkins ? user.checkins : 0;
                user.checkins = userCheckins + 1;
                delete user['$$hashKey'];

                APIFactory.editUser(user);
                
                let venue = this.selectedVenue;
                let venueCheckins = venue.checkins ? venue.checkins : 0;
                venue.checkins = venueCheckins + 1;
                delete venue['$$hashKey'];

                APIFactory.editVenue(venue);

                alert('Success');
            } else {
                alert('There was an error');
            }
        });

    }
});
