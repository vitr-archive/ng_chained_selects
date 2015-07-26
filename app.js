var app = angular.module("myApp", ['ngResource']);

app.controller("myCtrl", function($scope) {
    $scope.product.categoryid = 162809;
    $scope.categoryTree = [];
});

app.factory('CategorySimple', ['$resource',
    function($resource){
        return $resource( 'data-level1.json', {}, {
            query: {method:'GET', isArray: false}
        });
    }]);
app.factory('CategoryTree', ['$resource',
    function($resource){
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
            //scope.treeService.query({categoryId: scope.initId}, function(data) {
            scope.treeService.query(function(data) {
                scope.elementTree = new Array();
                //scope.elementTree = [];
                //scope.elementTree = {};
                for (var i in data) {
                    if (!data.hasOwnProperty(i))
                        continue;
                    i = parseInt(i);
                    if (i)
                        scope.elementTree.push(data[i]);
                }
                console.log(scope.elementTree);
                return;
                scope['elementOptions'] = [];
                scope['elementSelected'] = [];
                for (var i in scope.elementTree) {
                    if (!scope.elementTree.hasOwnProperty(i))
                        continue;
                    scope['elementOptions'][i] = [];
                    for (var j in scope.elementTree[i].categories) {
                        if (!scope.elementTree[i].categories.hasOwnProperty(j))
                            continue;
                        var elementTemp = {};
                        elementTemp.id = scope.elementTree[i].categories[j].id;
                        elementTemp.name = scope.elementTree[i].categories[j].name;
                        elementTemp.final = scope.elementTree[i].categories[j].final;
                        scope['elementOptions'][i].push(elementTemp);
                        if (elementTemp.id == scope.elementTree[i].selected) {
                            var elementTempSelected = elementTemp;
                        }
                    }
                    if (elementTempSelected)
                        scope['elementSelected'][i] = elementTempSelected;
                    var elementTempSelected = false;
                }
                console.log(scope.elementTree);
            });

            scope.update = function(level) {
                return;
                level = parseInt(level);
                console.log(scope.elementTree);
                console.log(scope.elementTree.length);
                if ( !scope['elementSelected'][level] )
                //if ( !scope.elementTree[level] )
                    return;

                //for (var i=level+1;i<=scope['elementOptions'].length;i++) {
                for (var i=level+1;i<=scope.elementTree.length;i++) {
                    //scope['elementOptions'].splice(i,1);
                    scope.elementTree.splice(i,1)
                }


                console.log(scope.elementTree);

                if (scope['elementSelected'][level].final == 'false') {
                    scope['elementOptions'][level+1] = scope.optionService.query({categoryId: scope['elementSelected'][level].id});
                }
                for (var i=level+1;i<=scope['elementOptions'].length;i++) {
                    scope['elementSelected'].splice(i,1)
                }
            }

        },

        templateUrl: 'ng-chained-selects.html'
    }
});