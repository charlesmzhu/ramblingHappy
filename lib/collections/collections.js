Joys = new Mongo.Collection ('joys');

Meteor.methods({
  sendEmail: function(email) {
    Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
  },

  addJoy : function ( user_id, content ) { 
    return Joys.insert ( {
    	createdAt: new Date (),
    	content: content,
    	user_id: user_id 
    } );
  }
});