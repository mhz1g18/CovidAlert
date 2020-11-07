var userModule = angular.module('UsersModule', ['APIModule']);

userModule.controller('UsersCtrl', function(APIFactory){
    // Use the factory method to query the API for all the users
    APIFactory.getUsers()
        .then(resp => {
            this.users = resp.data
            this.users.forEach(user => {
                let key = user.RowKey;
                console.log(key);
            })
        });

    // Method to delete user
    this.deleteUser = function(id, idx) {

        // Prompt user for confirmation
        let askUser = confirm('Are you sure');

        if(!askUser)
            return;

        // API Call to delete the user
        APIFactory.deleteUser(id)
        .then(resp => {

            // If call is successful remove user from the UI
            // Else alert an error message
            if(resp.status === 204)
                this.users.splice(idx, 1);
            else
                alert('There was an error');
        });
    }


    // Flip the status of a user from infected to non-infected and vice verca
    // If the user is marked as infected, generate the needed notifications
    this.changeStatus = function(user, idx) {
        let copyUser = angular.copy(user);
        copyUser.infected = !copyUser.infected;
        delete copyUser['$$hashKey'];
        

        // First edit the user entity in the database
        // Then in the callback generate notifications if editing was successful
        APIFactory.editUser(copyUser)
        .then(resp => {
            console.log(resp);
            if(resp.statusText === 'Accepted'){
                
                // Generate notifications if  user has been marked as positive
                if(copyUser.infected){
                    APIFactory.generateNotifications(copyUser.RowKey)
                    .then(resp => {
                        console.log(resp);
                        if(resp.statusText === 'Created') {
                            alert('Notifications generated');
                        } else if(resp.data.statusText === 'No Notifications'){
                            alert('There were no notifications to be generated')
                        } 
                        else {
                            alert('Error generating notifications')
                        }
                    })
                }

                user = copyUser;
                this.users[idx] = user; 

            } else {
                alert('There was an error');
            }
        });
    }
});

userModule.controller('CreateUserCtrl', function(APIFactory) {
    
    // Creating an user
    // Create an User object with the needed fields and pass it to the API Factory
    this.createUser = function() {
        user = {
            name : this.name,
            surname : this.surname
        }

        APIFactory.createUser(user)
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



userModule.controller('EditUserCtrl', function(user, APIFactory) {
    this.user = user;

    // Editing user

    this.saveUser = function() {
        APIFactory.editUser(user)
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