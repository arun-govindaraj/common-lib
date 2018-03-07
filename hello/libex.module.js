"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var hello_component_1 = require("./hello/hello.component");
var hello_service_1 = require("./hello.service");
var LibexModule = LibexModule_1 = (function () {
    function LibexModule() {
    }
    LibexModule.forRoot = function () {
        return {
            ngModule: LibexModule_1,
            providers: [hello_service_1.HelloService]
        };
    };
    return LibexModule;
}());
LibexModule = LibexModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [hello_component_1.HelloComponent],
        exports: [hello_component_1.HelloComponent]
    })
], LibexModule);
exports.LibexModule = LibexModule;
var LibexModule_1;
