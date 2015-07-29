Joys = new Mongo.Collection ('joys');

Joys.allow ({
  insert: function ( userId, doc ) {
    return !! userId;
  }
})

Meteor.methods({
  sendEmail: function(email) {
    Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
  },

  addJoy : function ( content, user ) { 
    return Joys.insert ( {
    	createdAt: new Date (),
    	content: content,
      user_id: Meteor.userId()
    } );
  }
});