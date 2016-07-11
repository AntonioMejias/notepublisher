(function() {
    'use strict'
    angular.module('notes', ['ionic', 'starter.controllers', 'starter.services', 'ngResource','LocalStorageModule'])
        .constant('ApiURL', "http://192.168.2.105:8080")
        .config(function(localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('publisher');
        })
})();