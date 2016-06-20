/**
 * @module ui/calendar-widget-day.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class CalendarWidgetDay
 * @extends Component
 */
exports.CalendarWidgetDay = Component.specialize({
    enterDocument: {
        value: function(isFirstTime) {
            if (isFirstTime) {
                this._calendarService = this.application.calendarService;
            }
            this._cancelListener = this.addRangeAtPathChangeListener("tasks", this, "_handleTasksChange");
        }
    },

    exitDocument: {
        value: function() {
            if (typeof this._cancelListener === "function") {
                this._cancelListener();
            }
        }
    },

    _handleTasksChange: {
        value: function() {
            var self = this;
            this._calendarService.getTasksRunningOnDay(this.data).then(function(tasks) {
                self.todaysTasks = tasks;
            });
        }
    }
});
