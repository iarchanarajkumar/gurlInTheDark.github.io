var gridApp = angular.module("gridApp", ["mainModule", "underscore"]);
var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
	return $window._;
}]);
var mainModule = angular.module('mainModule', []);
mainModule.controller('mainCtrl', function($scope, _, $timeout) {
	$scope.colors = ["red", "pink", "green", "blue", "violet", "aqua", "orange", "yellow"];
	$scope.points = 0;
	$scope.displayValues = [];
  $scope.checkIfCompleted=0;
  $scope.showSuccess=false;
	var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	for (i in values) {
		$scope.displayValues.push({
			value: Number(i),
			color: '#fff'
		})
	}
	var compareValues = [];

	function shuffle(o) {
		for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};
	shuffle(values);
	$scope.switchColor = function(value) {
		console.log(value, $scope.colors[((values).indexOf(value.value) % 8)])
		if (compareValues.length == 0 && !value.marked) {
			$scope.displayValues[value.value].color = $scope.colors[((values).indexOf(value.value) % 8)];
			compareValues.push($scope.displayValues[value.value]);
		} else if (compareValues.length == 1 && !value.marked) {
			compareValues.push($scope.displayValues[value.value])
			$scope.displayValues[value.value].color = $scope.colors[((values).indexOf(value.value) % 8)];
			if (!_.isEqual(compareValues[0], value)) {
				if (compareValues[0].color == $scope.displayValues[value.value].color) {
          $scope.checkIfCompleted+=2;
          if ($scope.checkIfCompleted==values.length){
            $scope.showSuccess=true;
          }
					$scope.displayValues[value.value].marked = true
					$scope.displayValues[$scope.displayValues.indexOf(compareValues[0])].marked = true;
					$scope.points = $scope.points + 10;
					compareValues = []
				} else {
					$timeout(function() {
						$scope.displayValues[$scope.displayValues.indexOf(compareValues[0])].color = "#fff"
						$scope.displayValues[value.value].color = "#fff"
						$scope.points = $scope.points - 5;
						compareValues = [];
					}, 1000);
				}
			}
		} else {
			console.log("invalid")
		}
	}
});
