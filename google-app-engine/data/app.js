var app = angular.module("myApp", ['ngResource']);

app.controller("myCtrl", function($scope) {
    $scope.product.categoryid = 162809;
    $scope.categoryTree = [];
});

app.factory('OptionList', ['$resource',
    function($resource){
        //http://ng-chained-selects.appspot.com/option.php?id=0
        return $resource( 'google-app-engine/option.php?id=:optionId', {}, {
            query: {method:'GET', params:{optionId:'@optionId'}, isArray: true}
        });
    }]);
app.factory('OptionTree', ['$resource',
    function($resource){
        //http://ng-chained-selects.appspot.com/option.php?mode=tree&id=20
        return $resource( 'google-app-engine/option.php?mode=tree&id=:optionId', {}, {
            query: {method:'GET', params:{optionId:'@optionId'}, isArray: false}
        });
    }])

app.directive('ngChainedSelects', function($injector) {
    return {
      restrict: 'AE',
      scope: {
        initId: '='
      },

      controller: ['$scope', '$attrs', function($scope, $attrs) {
        $scope.treeService = $injector.get($attrs.treeService);
        $scope.optionService = $injector.get($attrs.optionService);
      }],

      link: function(scope, iElement, iAttrs, ctrl) {
        scope.elementLabel = iAttrs.elementLabel;
        scope.elementFirstOption = iAttrs.elementFirstOption;
        //scope.elementTree = new Array();
        scope.elementTree = [];

        scope.update = function(level) {
          level = parseInt(level);
          scope.elementTree.splice(level+1, scope.elementTree.length - level);
          if (!scope.elementTree[level].selected.final) {
            scope.optionService.query({optionId: scope.elementTree[level].selected.id}, function (data){
              scope.elementTree[level+1] = {};
              scope.elementTree[level+1].options = {};
              for (var i in data) {
                if (!data.hasOwnProperty(i))
                  continue;
                i = parseInt(i);
                if (i)
                  scope.elementTree[level+1].options[i] = data[i];
              }
            });
          }

        }

        // the root option isn't set
        //console.log(parseInt(scope.initId));
        //console.log(scope.initId.length);
        //if (!scope.initId.length) scope.initId = 0;
        if (!parseInt(scope.initId))
          scope.initId = 0;



        scope.treeService.query({optionId: scope.initId}, function(data) {
          for (var i in data) {
            if (!data.hasOwnProperty(i))
              continue;
            i = parseInt(i);
              console.log(i);
            if (i) {
              scope.elementTree.push(data[i]);
            }
          }
            console.log(scope.elementTree);
        });
      },

      templateUrl: 'data/ng-chained-selects.html'
    }
});
