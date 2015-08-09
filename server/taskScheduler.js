FutureTasks = new Meteor.Collection('future_tasks'); // server-side only

// In this case, "details" should be an object containing a date, plus required e-mail details (recipient, content, etc.)


Meteor.methods({
  /*sendEmail: function(email) {
    Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
  },*/

  addJoy : function ( content, user ) { 
    return Joys.insert ( {
    	createdAt: new Date (),
    	content: content,
      user_id: Meteor.userId()
    } );
  },

  scheduleMail: function ( details ) {
    var thisId = FutureTasks.insert(details);
    addTask(thisId, details);
    return true;
  }

});

function sendMail ( details ) {

	Email.send({
		from: 'charlesmzhu@gmail.com',
	    to: 'charlesmzhu@gmail.com',
	    subject: 'are you closer to who you want to become?',
	    text: details.text
	});

}

//adds task to SyncedCron
function addTask(id, details) {

	//understand this
	SyncedCron.add({
		name: id,
		schedule: function(parser) {
			return parser.text('every 1 day');
		},
		job: function() {
			sendMail(details);
	        return id;
		}
	});

}

//Process existing tasks on reboot and start the Cron (compatible with meteor)
Meteor.startup(function() {

	FutureTasks.find().forEach(function(mail) {
		var d = new Date ();
		addTask(mail._id, mail);
	});

	SyncedCron.start();

});