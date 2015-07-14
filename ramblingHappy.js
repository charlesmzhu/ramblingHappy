if(Meteor.isClient) {
  // on the client, we just have to track the DOM click event on the input.
  Template.email.events({
    'click #btn': function () {
      // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
      Meteor.call('sendEmail', $('#email').val());
      Session.set('done', true);
    }
  });
  Template.email.done = function () { return Session.equals('done', true); }

}

if(Meteor.isServer) {
  // on the server, we create the sendEmail RPC function
  Meteor.methods({
    sendEmail: function(email) {
      // send the email!
      Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
    }
  });
}

Statements = new Mongo.Collection ('Statements');