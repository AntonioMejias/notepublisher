(function() {
	'use strict'
	angular.module('notes').
	controller('NoteController', NoteController);

	NoteController.$inject = ['$state', '$stateParams', 'localStorageService', 'NoteService', '$ionicLoading', '$ionicPopup', '$scope'];

	function NoteController($state, $stateParams, localStorageService, NoteService, $ionicLoading, $ionicPopup, $scope) {
		var vm = this;
		postconstructor.call(this);

		function postconstructor() {
			console.log($stateParams.priority);
			if ($stateParams.priority == 2) {
				getNotes.call(this, 'priority');
			}
			else{
				console.log("pipe");
				getNotes.call(this);
			}

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
						var element = document.getElementById("nota-" + id);
						element.addEventListener("transitionend", function() {
							/*console.log("sdfdf" + id);

							$scope.$apply(function() {
								vm.notes = vm.notes.filter(function(element) {
									return element.id !== id;
								})
							})*/
							element.style.display = "none";
						})
						angular.element(element).addClass("item-nota-desaparecer");
					}
				});

		}

		function _viewDetails(idNote) {
			getNote(idNote);
			$state.go('tab.note-detail', {
				noteId: idNote
			});
		}

		function getNotes(priority) {
			var user = localStorageService.get("user");
			var callbackNotes = callback.bind(this);

			if (priority == 'priority')
				NoteService.getNoteByPriority(user.id)
				.then(callbackNotes)
			else
				NoteService.getNotes(user.id)
				.then(callbackNotes)

			function callback(notas) {
				console.log(notas);
				this.notes = notas.map(function(element) {
					element.avatar = user.avatar;

					switch (element.state) {
						case "1":
							element.priorityColor = "green";
							element.topColor = "top-green";
							break;
						case "2":
							element.priorityColor = "yellow";
							element.topColor = "top-yellow";
							break;
						case "3":
							element.priorityColor = "red";
							element.topColor = "top-red";
							break;
					}
					return element;
				})
			}
		}

		function getNote(idNote) {
			vm.notes.every(function(element) {
				if (element.id == idNote) {
					NoteService.note = angular.copy(element);
					return false;
				}
				return true;
			})
		}
	}
})()