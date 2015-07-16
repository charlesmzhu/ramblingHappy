Template.email.events({
  'click #btn': function () {
    // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
    Meteor.call('sendEmail', $('#email').val());
    Session.set('done', true);
  }
});

Template.email.done = function () { return Session.equals('done', true); }