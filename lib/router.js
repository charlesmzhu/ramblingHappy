Router.route ( '/', {
  template: 'mainPage'
})

var requireLogin = function () {
	if ( ! Meteor.user() ) {
		if ( Meteor.isLoggingIn() ) {
			this.render ( this.loadingTemplate );
		} else {
			this.render ('accessDenied');
		}
	} else {
		this.next(); // 
	}
}