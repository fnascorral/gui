var Montage = require("montage").Montage,
    VmRepository
    MiddlewareClient = require("core/service/middleware-client").MiddlewareClient,
    FreeNASService = require("core/service/freenas-service").FreeNASService,
    Model = require("core/model/model").Model,
    VmDeviceType = require("core/model/enumerations/vm-device-type").VmDeviceType;

var VirtualMachineService = exports.VirtualMachineService = Montage.specialize({
    _instance: {
        value: null
    },

    _dataService: {
        value: null
    },

    _backendBridge: {
        value: null
    },

    _hardwareCapabilitiesPromise: {
        value: null
    },

    createCdromDevice: {
        value: function() {
            return this._createNewDevice(VmDeviceType.CDROM);
        }
    },

    createDiskDevice: {
        value: function() {
            return this._createNewDevice(VmDeviceType.DISK);
        }
    },

    createGraphicsDevice: {
        value: function() {
            return this._createNewDevice(VmDeviceType.GRAPHICS);
        }
    },

    createNicDevice: {
        value: function() {
            return this._createNewDevice(VmDeviceType.NIC);
        }
    },

    createUsbDevice: {
        value: function() {
            return this._createNewDevice(VmDeviceType.USB);
        }
    },

    _createNewDevice: {
        value: function(type) {
            var self = this;
            return this._dataService.getNewInstanceForType(Model.VmDevice).then(function(device) {
                device.type = type;
                device._isNewObject = true;
                self.setDeviceDefaults(device);
                return device;
            });
        }
    },

    setDeviceDefaults: {
        value: function(device) {
            device.properties = device.properties || {};
            switch (device.type) {
                case VmDeviceType.CDROM:
                    break;
                case VmDeviceType.DISK:
                    device.properties.mode = device.properties.mode || "AHCI";
                    device.properties.target_type = device.properties.target_type || "FILE";
                    break;
                case VmDeviceType.GRAPHICS:
                    device.properties.resolution = device.properties.resolution || "1024x768";
                    break;
                case VmDeviceType.NIC:
                    device.properties.device = device.properties.device || "VIRTIO";
                    device.properties.mode = device.properties.mode || "NAT";
                    break;
                case VmDeviceType.USB:
                    device.properties.device = device.properties.device || "tablet";
                    break;
            }
        }
    },

    listVirtualMachines: {
        value: function() {
            return this._dataService.fetchData(Model.Vm);
        }
    },

    getTemplates: {
        value: function() {
            var self = this;
            return this._middlewareClient.callRpcMethod("vm.template.query", []).then(function(templates) {
                var results = [];
                for (var i = 0, length = templates.data.length; i < length; i++) {
                    results.push(self._dataService.mapRawDataToType(templates.data[i], Model.Vm));
                }
                return Promise.all(results);
            });
        }
    },

    getHardwareCapabilities: {
        value: function() {
            return this._hardwareCapabilitiesPromise = this._hardwareCapabilitiesPromise ||
                this._middlewareClient.callRpcMethod("vm.get_hw_vm_capabilities", []).then(function(response) {
                    return response.data;
                });
        }
    }
}, {
    instance: {
        get: function() {
            if (!this._instance) {
                this._instance = new VirtualMachineService();
                this._instance._dataService = FreeNASService.instance;
                this._instance._middlewareClient = MiddlewareClient.getInstance();
            }
            return this._instance;
        }
    }
});
