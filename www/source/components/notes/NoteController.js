(function() {
	'use strict'
	angular.module('notes').
	controller('NoteController', NoteController);

	NoteController.$inject = ['$state', 'localStorageService', 'NoteService', '$ionicLoading', '$ionicPopup', '$scope'];

	function NoteController($state, localStorageService, NoteService, $ionicLoading, $ionicPopup, $scope) {
		var vm = this;
		postconstructor();

		function postconstructor() {
			//console.log(getNotes());
			getNotes();
			vm.onRemoveNote = _onRemoveNote;
			vm.viewDetails = _viewDetails;
		}

		function _onRemoveNote(id) {

			var confirmPopup = $ionicPopup.confirm({
				title: 'Mensaje',
				template: '<center>¿Desea eliminar esta nota?</center>',
				cancelText: 'Cancelar',
				okText: 'Eliminar'
			});

			confirmPopup
				.then(function(answer) {
					if (answer) {
						/*NoteService.deleteNote(id).
						then(function(response){

							
						})*/
						console.log("pa ve");
						var element = document.getElementById("nota-"+id);
						element.addEventListener("transitionend", function() {
							/*console.log("sdfdf" + id);

							$scope.$apply(function() {
								vm.notes = vm.notes.filter(function(element) {
									return element.id !== id;
								})
							})*/
							element.style.display="none";
						})
						angular.element(element).addClass("item-nota-desaparecer");
					}
				});

		}

		function _viewDetails(idNote) {
			console.log("redirec" + idNote);
		}

		function getNotes() {
			var user = localStorageService.get("user");
			NoteService.getNotes(user.id)
				.then(function(notas) {
					console.log(notas);
					vm.notes = notas.map(function(element) {
						element.avatar = user.avatar;

						switch (element.state) {
							case "1":
								element.priorityColor = "green";
								break;
							case "2":
								element.priorityColor = "yellow";
								break;
							case "3":
								element.priorityColor = "red";
								break;
						}
						return element;
					})
				})
		}
	}
})()