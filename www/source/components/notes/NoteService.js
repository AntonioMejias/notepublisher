(function() {
    'use strict'

    angular
        .module('notes')
        .service("NoteService", NoteService);

    NoteService.$inject = [ 'ApiService','ApiURL'];

    function NoteService( ApiService,ApiURL) {
        var vm = this;
        postconstructor.call(this);

        function postconstructor() {
            this.getNotes = _getNotes;
            this.getNoteByPriority = _getNoteByPriority;
            this.updateNote = _updateNote;
            this.deleteNote = _deleteNote;

        }

        function _getNotes (idUser) {
            return ApiService.getArrayRequest(ApiURL+'/note/list-notes/:id', {'id':idUser})
        }
        function _getNoteByPriority (idUser) {
            return ApiService.getArrayRequest(ApiURL+'/note/list-notes/:id/priority', {'id':idUser})
        }
        function _deleteNote (idNote) {
            return ApiService.deleteRequest(ApiURL+'/note/erase-note/:id', {'id':idNote})
        }
        function _updateNote (noteData) {
            return ApiService.putRequest(ApiURL+'/note/update-note', noteData, false)
        }
    }
})();