(function() {
    'use strict'

    angular
        .module('notes')
        .service("ApiService", ApiService);

    ApiService.$inject = ['$resource', '$q'];

    function ApiService($resource, $q) {
        var vm = this;

        vm.postRequest = postRequest;
        vm.putRequest = putRequest;
        vm.getRequest = getRequest;
        vm.getArrayRequest = getArrayRequest;
        vm.deleteRequest = deleteRequest;


        function httpCall(method, url, params, data, isArray) {

            params = (params == false ? null : params); //Verifica si existen parametros para inlcuir al URL

            var  header = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            data = _jsonToUrlencoded(data);
        
            console.log("haciendo peticion");
            return $resource(url, params, {
                'makeRequest': {
                    method: method,
                    headers: header,
                    isArray: isArray
                }
            }).makeRequest(data).$promise;


        }

        function postRequest(url, data, params) {
            return httpCall("POST", url, params, data, false);
        }

        function getRequest(url, params, header) {
            return httpCall("GET", url, params, null, false);
        }

        function getArrayRequest(url, params, header) {
            return httpCall("GET", url, params, null, true);
        }

        function putRequest(url, data, params, header) {
            return httpCall("PUT", url, params, data, false);
        }

        function deleteRequest(url, data, params, header) {
            return httpCall("DELETE", url, params, data ,false);
        }

        function _jsonToUrlencoded(obj) { //Codifica el JSON al formato x-www-form-urlencoded 
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        } 
    }
})();