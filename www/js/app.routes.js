(function() {
	'use strict'
	angular.module('notes').config(function($stateProvider, $urlRouterProvider) {

		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider

		// setup an abstract state for the tabs directive

			.state('login', {
			url: '/login',
			templateUrl: 'source/components/login/login.html',
			controller: 'LoginController as login'
		})

		.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'source/shared/tabmenu/tabs.html'
		})

		// Each tab has its own nav history stack:

		.state('tab.dash', {
			url: '/dash',
			views: {
				'tab-dash': {
					templateUrl: 'templates/tab-dash.html',
					controller: 'DashCtrl'
				}
			}
		})

		.state('tab.chats', {
				url: '/notes/:priority',
				cache: false,
				views: {
					'tab-chats': {
						templateUrl: 'source/components/notes/notes.html',
						controller: 'NoteController as note'
					}
				}
			})
			.state('tab.note-detail', {
				url: '/chats/details/:noteId',
				cache: false,
				views: {
					'tab-chats': {
						templateUrl: 'source/components/notedetail/notedetail.html',
						controller: 'NoteDetailController as detail'
					}
				}
			})

		.state('tab.account', {
			url: '/account',
			views: {
				'tab-account': {
					templateUrl: 'templates/tab-account.html',
					controller: 'AccountCtrl'
				}
			}
		});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/login');

	});


})();