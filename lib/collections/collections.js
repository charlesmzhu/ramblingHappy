Joys = new Mongo.Collection ('joys');

Meteor.methods({
  sendEmail: function(email) {
    Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
  },

  addJoy : function ( content ) { 
    return Joys.insert ( {
    	createdAt: new Date (),
    	content: content
    } );
  }
});