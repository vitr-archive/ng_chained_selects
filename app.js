var app = angular.module("myApp", ['ngResource']);

app.controller("myCtrl", function($scope) {
    $scope.product.categoryid = 162809;
    $scope.categoryTree = [];
});

app.factory('CategorySimple', ['$resource',
    function($resource){
        //http://ng-chained-selects.appspot.com/option.php?id=0
        return $resource( 'data-level1.json', {}, {
            query: {method:'GET', isArray: false}
        });
    }]);
app.factory('CategoryTree', ['$resource',
    function($resource){
        //http://ng-chained-selects.appspot.com/option.php?mode=tree&id=20
        return $resource( 'data-tree.json', {}, {
            query: {method:'GET', isArray: false}
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
            scope.optionService.query({categoryId: scope.elementTree[level].selected.id}, function (data){
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



        scope.treeService.query({categoryId: scope.initId}, function(data) {
          for (var i in data) {
            if (!data.hasOwnProperty(i))
              continue;
            i = parseInt(i);
            if (i) {
              scope.elementTree.push(data[i]);
            }
          }
        });
      },

      templateUrl: 'app/directive_templates/ng-chained-selects.html'
    }
});
