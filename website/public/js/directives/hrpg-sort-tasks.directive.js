'use strict';

angular
  .module('habitrpg')
  .directive('hrpgSortTasks', hrpgSortTasks);

hrpgSortTasks.$inject = [
  'User'
];

function hrpgSortTasks(User) {
  return function($scope, element, attrs, ngModel) {
    $(element).sortable({
      axis: "y",
      distance: 5,
      start: function (event, ui) {
        ui.item.data('startIndex', ui.item.index());
      },
      stop: function (event, ui) {
        var task = angular.element(ui.item[0]).scope().task;
        var startIndex = ui.item.data('startIndex');
        User.user.ops.sortTask({
          params: { id: task.id },
          query: {
            from: startIndex,
            to: ui.item.index()
          }
        });
      }
    });
  }
}
