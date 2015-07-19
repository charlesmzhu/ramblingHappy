Joys = new Mongo.Collection ('joys');

Meteor.methods({
  sendEmail: function(email) {
    Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
  },

  addJoy : function ( user_email, content ) { 
    return Joys.insert ( {
    	createdAt: new Date (),
    	content: content,
    	user_email: user_email
    } );
  }
});