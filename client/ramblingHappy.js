Meteor.subscribe ( 'joys', Meteor.userId() );


Template.joys.helpers ({
  joys: function () {
  	return Joys.find();
  },

  dateString: function () {
  	return this.createdAt.toLocaleDateString();
  },
});


Template.joySubmit.events ({
  'submit #submitJoy': function (e) {
  	e.preventDefault();
  	console.log("Submit joy called");
	Meteor.call('addJoy', $('#joytext').val() );
	return false;
  }
});

Template.email.events({
  'click #btn': function () {
    // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
    Meteor.call('scheduleMail', {
      to: $('#email').val(),
      from: 'charlesmzhu@gmail.com',
      subject: "Are you closer to who you want to become?",
      text: "test email",
      date: new Date()
    });
    Session.set('done', true);
  }
});

Template.email.done = function () { return Session.equals('done', true); }