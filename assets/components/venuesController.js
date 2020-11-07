var venueModule = angular.module('VenuesModule', ['APIModule']);

venueModule.controller('VenuesCtrl', function(APIFactory){
    // Use the factory method to query the API for all the venues
    APIFactory.getVenues()
        .then(resp => {
            this.venues = resp.data
            console.log(this.venues);
        });


    // Delete a venue
    this.deleteVenue = function(id, idx) {

        var askUser = confirm('Are you sure');

        if(!askUser)
            return;

        APIFactory.deleteVenue(id)
        .then(resp => {

            if(resp.status === 204)
                this.venues.splice(idx, 1);
        });
    }
});

venueModule.controller('CreateVenueCtrl', function(APIFactory) {
    
    this.createVenue = function() {
        venue = {
            name : this.name,
        }

        APIFactory.createVenue(venue)
        .then(resp => {

            // Check HTTP Response data to determine if 
            // the request was successfull
            if(resp.data.isSuccessful){
                alert('Success');
            } else {
                alert('There was an error');
            }
        });

    }
});

venueModule.controller('EditVenueCtrl', function(venue, APIFactory) {
    this.venue = venue;

    this.saveVenue = function() {

        APIFactory.editVenue(venue)
        .then(resp => {

            // Check HTTP Response data to determine if 
            // the request was successfull
            if(resp.statusText === 'Accepted'){
                alert('Success');
            } else {
                alert('There was an error');
            }
        });
    }
})