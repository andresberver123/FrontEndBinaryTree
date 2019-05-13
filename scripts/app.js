var app = angular.module('app', ['ngRoute', 'ngResource'])

        .config(['$routeProvider', function ($routerProvider) {
                $routerProvider
                        .when('/home', {
                            templateUrl: 'templates/arbol.html',
                            controller: 'HomeCtrl'
                        })

                        .when('/nodos', {
                            templateUrl: 'templates/arbol.html',
                            controller: 'nodos'
                        })

                        .when('/addNodos', {
                            templateUrl: 'templates/addNodo.html',
                            controller: 'addNodos'
                        })

                        .otherwise({redirectTo: '/home'});
            }])

        .controller('HomeCtrl', ['$scope', 'Recargas', '$route', function ($scope, Recargas, $route) {

                Recargas.get(function (data) {
                    $scope.recargas = data.response;
                })

                $scope.remove = function (id) {
                    Recargas.delete({id: id}).$promise.then(function (data) {
                        if (data.response) {
                            $route.reload();
                        }
                    })
                }
            }])

        .controller('addConsumos', ['$scope', 'Consumos', function ($scope, Consumos) {
                $scope.settings = {
                    pageTitle: "Agregar Consumo",
                    action: "Agregar"
                };
                $scope.consumo = {
                    id: "",
                    numero_celular: "",
                    consumo_seg: ""
                };
                $scope.submit = function () {
                    Consumos.save({consumo: $scope.consumo}).$promise.then(function (data) {
                        if (data.response) {
                            angular.copy({}, $scope.consumo);
                            $scope.settings.success = "El consumo ha sido agregado correctamente!";
                            $scope.settings.error = "Error inesperado";
                        }
                    })
                }
            }])

        /*Fin consumos*/

        .controller('addNodos', ['$scope', 'Nodos', function ($scope, Nodos) {
                $scope.settings = {
                    pageTitle: "Agregar Nodo",
                    action: "Agregar"
                };
                $scope.nodo = {
                    id: "",
                    nodo: "",
                    padre: "",
                    Dir: ""
                };
                $scope.submit = function () {
                    Nodos.save({nodes: $scope.nodo}).$promise.then(function (data) {
                        if (data.response) {
                            angular.copy({}, $scope.nodo);
                            $scope.settings.success = "El nodo ha sido agregado correctamente!";
                            $scope.settings.error = "Error inesperado";
                        }
                    })
                }
            }])

        .controller('nodos', ['$scope', 'Nodos', '$route', '$routeParams', function ($scope, Nodos, $route, $routeParams) {
                
                Nodos.get(function (data) {
                    $scope.inside = data
                    $scope.data = data.response;
                })
            }])
        

        .factory('Recargas', ['$resource', function ($resource) {
                return $resource('http://localhost/apirest/recargas/:id', {id: "@_id"}, {
                    update: {method: "PUT", params: {id: "@_id"}}
                })
            }])

        .factory('Costos', ['$resource', function ($resource) {
                return $resource('http://localhost/apirest/costos/:id', {id: "@_id"}, {
                    update: {method: "PUT", params: {id: "@_id"}}
                })
            }])

        .factory('Consumos', ['$resource', function ($resource) {
                return $resource('http://localhost/apirest/nodos/:id', {id: "@_id"}, {
                    update: {method: "PUT", params: {id: "@_id"}}
                })
            }])

        .factory('Nodos', ['$resource', function ($resource) {
                return $resource('http://localhost/apirest/nodos/:id', {id: "@_id"}, {
                    update: {method: "PUT", params: {id: "@_id"}}
                })
            }])

   