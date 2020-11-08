let app = angular.module('APIModule', []);

app.factory('APIFactory', function($http, $q) {
    
    let _usersEndpoint = 'https://milqkatest.azurewebsites.net/api/users/';
    let _venuesEndpoint = 'https://milqkatest.azurewebsites.net/api/venues/';
    let _checkinsEndpoint = 'https://milqkatest.azurewebsites.net/api/checkins/';
    let _notificationsEndpoint = 'https://milqkatest.azurewebsites.net/api/notifications/'

    /*
     * APIFactory
     * Factory that provides method for quering Azure functions
     * The methods send a request and return a promise
     */

    return {
        /**
         * Retrieves all users or a particular user by their RowKey
         * 
         * @param {String} id [options] User's RowKey if querying for a particular user
         * 
         */
        getUsers : function(id = false) {

            let endpoint = id ? _usersEndpoint + id : _usersEndpoint;
            
            let deferred = $q.defer();
            let promise = deferred.promise;

            $http.get(endpoint)
                .then(result => deferred.resolve(result));

            return promise;
        },

        /**
         * Create a new User entity
         *
         * @param {object} User the user to be reated
         */

        createUser : function(user) {

            user = JSON.stringify(user);

            let deferred = $q.defer();
            let promise = deferred.promise;
            
            $http.post(_usersEndpoint, user)
                .then(result => deferred.resolve(result));

            return promise;

        },

        /**
         * Edit an existing user
         * 
         * @param {object} user 
         */

        editUser : function(user) {

            let endpoint = _usersEndpoint + user.RowKey;

            // Delete object's previous metadata
            delete user['odata.metadata'];
            delete user['odata.etag']

            user = JSON.stringify(user);

            let deferred = $q.defer();
            let promise = deferred.promise;
            
            $http.put(endpoint, user)
                .then(result => deferred.resolve(result));

            return promise;
        },

        /**
         * Delete an User entity by their RowKey
         * 
         * @param {String} id the user's RowKey
         */

        deleteUser : function(id) {
            let endpoint = _usersEndpoint + id;
            
            let deferred = $q.defer();
            let promise = deferred.promise;
            
            $http.delete(endpoint)
                .then(result => deferred.resolve(result));

            return promise;

        },

        /**
         * Retrieve all venues or a single venue
         * 
         * @param {String} id venue's RowKey 
         */

        getVenues : function(id = false) {

            let endpoint = id ? _venuesEndpoint + id : _venuesEndpoint;
            
            let deferred = $q.defer();
            let promise = deferred.promise;

            $http.get(endpoint)
                .then(result => deferred.resolve(result));

            return promise;
        },

        /**
         * Create a new Venue entity
         *
         * @param {object} venue the venue to be reated
         */

        createVenue : function(venue) {

            venue = JSON.stringify(venue);

            let deferred = $q.defer();
            let promise = deferred.promise;
            
            $http.post(_venuesEndpoint, venue)
                .then(result => deferred.resolve(result));

            return promise;

        },

        /**
         * Edit an existing venue
         * 
         * @param {object} venue the venue to be edited
         */

        editVenue : function(venue) {

            let endpoint = _venuesEndpoint + venue.RowKey;

            // Delete object's previous metadata
            delete venue['odata.metadata'];
            delete venue['odata.etag']

            venue = JSON.stringify(venue);

            let deferred = $q.defer();
            let promise = deferred.promise;
            
            $http.put(endpoint, venue)
                .then(result => deferred.resolve(result));

            return promise;
        },

        /**
         * Delete an existing venue
         * 
         * @param {String} id the venue's RowKey 
         */

        deleteVenue : function(id) {
            let endpoint = _venuesEndpoint + id;
            
            let deferred = $q.defer();
            let promise = deferred.promise;
            
            $http.delete(endpoint)
                .then(result => deferred.resolve(result));

            return promise;

        },

        /**
         * Get checkins
         * Can query for all existing checkin entities
         * Or get checkins with particular venue_key / row_key
         * 
         * @param {object} item optional object containing either a user_key or venue_key
         */

        getCheckins : function(item) {

            let endpoint = _checkinsEndpoint;

            if('user_key' in item) {
                endpoint = endpoint + '?user_key=' + item.user_key;
            } else if('venue_key' in item){
                endpoint = endpoint + '?venue_key=' + item.venue_key;
            }

            let deferred = $q.defer();
            let promise = deferred.promise;

            $http.get(endpoint)
                .then(result => deferred.resolve(result));

            return promise;
        },

        /**
         * Create a new checkin entity
         * 
         * @param {object} checkin the checkin entity object
         */

        createCheckin : function(checkin) {

            checkin = JSON.stringify(checkin);

            let deferred = $q.defer();
            let promise = deferred.promise;
            
            $http.post(_checkinsEndpoint, checkin)
                .then(result => deferred.resolve(result));

            return promise;

        },

        /**
         * Generate notifications for an user that is being marked positive
         * 
         * @param {String} infectedUserId the RowKey of the user being marked positive
         */

        generateNotifications : function(infectedUserId) {

            let endpoint = _notificationsEndpoint + infectedUserId;

            let deferred = $q.defer();
            let promise = deferred.promise;
            
            $http.post(endpoint)
                .then(result => deferred.resolve(result));

            return promise;
        },

        /**
         * Retreive all notification entities
         */
        
        getNotifications : function(id = false) {
            
            let endpoint = id ? _notificationsEndpoint + id : _notificationsEndpoint;
            console.log(endpoint);

            let deferred = $q.defer();
            let promise = deferred.promise;

            $http.get(endpoint)
                .then(result => deferred.resolve(result));

            return promise;
        },


    }

 });