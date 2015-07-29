Meteor.publish ( "joys", function ( user_id ) { 
	return Joys.find({ user_id: user_id }); 
} )