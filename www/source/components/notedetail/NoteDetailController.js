(function() {
	'use strict'
	angular.module('notes').
	controller('NoteDetailController', NoteDetailController);

	NoteDetailController.$inject = ['$state', '$stateParams', 'NoteService', '$ionicLoading', '$timeout'];

	function NoteDetailController($state, $stateParams, NoteService, $ionicLoading, $timeout) {
		var vm = this;
		postconstructor();

		function postconstructor() {
			vm.note = NoteService.note;
			angular.element(document.getElementById(vm.note.priorityColor)).addClass("active");
			var fecha = new Date(vm.note.updated_at);
			vm.note.fecha = fecha.getTime();
			console.log(vm.note.fecha);
			vm.id = $stateParams.noteId;

			vm.goBack = _goBack;
			vm.changePriority = changePriority;
			vm.updateNote = updateNote;
		}

		function _goBack() {
			$state.go('tab.chats')
		}

		function updateNote() {
			console.log("actualizandi")
			$ionicLoading.show({
				template: '<span>Actualizando </span><ion-spinner  icon="lines" class="spinner-light"></ion-spinner>'
			});
			switch (vm.note.priorityColor) {
				case "red":
					vm.note.state = 3;
					break;
				case "yellow":
					vm.note.state = 2;
					break;
				case "green":
					vm.note.state = 1;
					break;
			}
			$timeout(update, 1000)

			function update() {
				NoteService
					.updateNote(vm.note)
					.then(function(response) {
						console.log(response);
						$ionicLoading.hide();
					})
			}

		}

		function changePriority(priority) {

			angular.element(document.getElementsByClassName('active')).removeClass("active");
			angular.element(document.getElementById(priority)).addClass("active");
			vm.note.topColor = "top-" + priority;
			vm.note.priorityColor = priority;


		}
	}
})();