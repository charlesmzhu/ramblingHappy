FutureTasks = new Meteor.Collection('future_tasks'); // server-side only

// In this case, "details" should be an object containing a date, plus required e-mail details (recipient, content, etc.)

function sendMail(details) {

	Email.send({
		from: details.from,
	        to: details.to,
        	etc....
	});

}

function addTask(id, details) {

	SyncedCron.add({
		name: id,
		schedule: function(parser) {
			return parser.recur().on(details.date).fullDate();
		},
		job: function() {
			sendMail(details);
			FutureTasks.remove(id);
			SyncedCron.remove(id);
	        	return id;
		}
	});

}

function scheduleMail(details) { 

	if (details.date < new Date()) {
		sendMail(details);
	} else {
		var thisId = FutureTasks.insert(details);
		addTask(thisId, details);		
	}
	return true;

}

Meteor.startup(function() {

	FutureTasks.find().forEach(function(mail) {
		if (mail.date < new Date()) {
			sendMail(mail)
		} else {
			addTask(mail._id, mail);
		}
	});
	SyncedCron.start();

});