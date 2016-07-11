(function() {
	'use strict'
	angular.module('notes').
	controller('LoginController', LoginController);

	LoginController.$inject = ['$state', 'AuthService', 'localStorageService', '$ionicLoading', '$ionicPopup'];

	function LoginController($state, AuthService, localStorageService, $ionicLoading, $ionicPopup) {

		postconstructor.call(this);

		function postconstructor() {
			this.message = "";
			this.user = {};
			this.onSubmitForm = _onSubmitForm.bind(this);
		}

		function _onSubmitForm() {

			$ionicLoading.show({
				template: '<span>Autenticando</span><ion-spinner  icon="lines" class="spinner-light"></ion-spinner>'
			});
			AuthService
				.loginUser(this.user)
				.then(function(response) {
					//console.log(response);
					$ionicLoading.hide();
					if (response.success) {

						localStorageService.set("user", response.data);
						$state.go('tab.chats');

					} else {
						$ionicPopup.alert({
							title: "Alerta",
							template: "<center>Usuario ó Contraseña invalida</center>"
						});
					}

				}, function(error) {
					$ionicLoading.hide();
					$ionicPopup.alert({
						title: "Error",
						template: "<center>Ha ocurrido un problema en el servidor</center>"
					});
				}).finally(function() {
					
				})
				///$state.go('tab.dash');
		}
	}
})();