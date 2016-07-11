(function() {
    'use strict'

    angular
        .module('notes')
        .service("AuthService", AuthService);

    AuthService.$inject = [ 'ApiService','ApiURL'];

    function AuthService( ApiService,ApiURL) {
        var vm = this;
        postconstructor.call(this);

        function postconstructor() {
            this.loginUser = _loginUser;
        }

        function _loginUser (userData) {
            return ApiService.postRequest(ApiURL+'/user/login', userData, false)
        }
    }
})();