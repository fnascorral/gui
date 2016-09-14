var AbstractComponentActionDelegate = require("ui/abstract/abstract-component-action-delegate").AbstractComponentActionDelegate,
    Model = require("core/model/model").Model;

/**
 * @class CalendarTask
 * @extends Component
 */
exports.CalendarTask = AbstractComponentActionDelegate.specialize({
    templateDidLoad: {
        value: function() {
            this.taskCategories = [{ name: '---', value: null }].concat(this.application.calendarService.taskCategories);
        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            AbstractComponentActionDelegate.prototype.enterDocument.call(this, isFirstTime);

            if (this.object && this.object.task) {
                this.classList.add('type-' + this.object.task.replace('.', '_').toLowerCase());
            }
            if (this.object._isNew) {
                this.object.args = [];
            }
            this.object.args.__type = this.object.task;

            if (isFirstTime) {
                var self = this;

                Model.populateObjectPrototypeForType(Model.CalendarTask).then(function () {
                    self._calendarTaskService = Model.CalendarTask.objectPrototype.services;
                });
            }
        }
    },

    exitDocument: {
        value: function() {
            AbstractComponentActionDelegate.prototype.exitDocument.call(this);

            if (this.object && this.object.task) {
                this.classList.remove('type-' + this.object.task.replace('.', '_').toLowerCase());
            }
        }
    },
    
    save: {
        value: function() {
            var argsLength = this.object.args.length;
            this.object.args = this.object.args.filter(function(x) { 
                return !!x || (typeof x !== "undefined" && typeof x !== "object") ; 
            });
            this.object.args.length = argsLength;
            this._closeInspector();
            return this.inspector.save();
        }
    },

    delete: {
        value: function() {
            this._closeInspector();
            return this.inspector.delete();
        }
    },

    handleRunNowAction: {
        value: function () {
            if (!this.object._isNew) {
                this._calendarTaskService.run(this.object.id);
            }
        }
    },

    _closeInspector: {
        value: function() {
            this.context.cascadingListItem.cascadingList.constructor.findPreviousCascadingListItemContextWithComponent(this).selectedObject = null
        }
    }

});
