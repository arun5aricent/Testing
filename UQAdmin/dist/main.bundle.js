webpackJsonp([1,4],{

/***/ 179:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 179;


/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(190);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__(189);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(appService, cdRef) {
        this.appService = appService;
        this.cdRef = cdRef;
        this.socialMiners = [];
        this.currentSM = null;
        this.data = {};
        this.error = "";
        this.showError = false;
        this.uqEnabled = "false";
        // enum constants
        this.stateType = { Up: "Up", Down: "Down" };
    }
    AppComponent.prototype.ngOnInit = function () {
        this.uqEnabled = upstream.gadget.Config.UniversalQueueEnabled;
        if (this.uqEnabled == "true") {
            this.getSocialMinerStates();
        }
    };
    AppComponent.prototype.getSocialMinerStates = function () {
        this.appService.getSocialMinerStates(this.getSocialMinerStateSuccess.bind(this), this.getSocialMinerStateFailure.bind(this));
    };
    AppComponent.prototype.getSocialMinerStateSuccess = function (response) {
        for (var i = 0; i < response.length; i++) {
            response[i].Progress = -1;
        }
        this.socialMiners = response;
        this.currentSM = this.socialMiners[0];
        this.getTaskRoutingStatistics();
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.getSocialMinerStateFailure = function (response) {
        this.error = this.error = 'Social Miner states could not be retrieved due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    };
    /*changeStatus(currentState, fqdn) {
        if (currentState == this.stateType.Up) {
            this.setSocialMinerStateDown(fqdn);
        } else if (currentState = this.stateType.Down) {
            this.setSocialMinerStateUp(fqdn);
        }
    }

    setSocialMinerStateUp(fqdn) {
        this.appService.setSocialMinerStateUp(fqdn, this.setSocialMinerStateUpSuccess.bind(this), this.setSocialMinerStateUpFailure.bind(this));
    }

    setSocialMinerStateUpSuccess(response, id) {
        this.setState(id, this.stateType.Up);
        this.cdRef.detectChanges();
    }

    setSocialMinerStateUpFailure(response) {
        this.error = 'State could not be set to "Up" due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    }*/
    AppComponent.prototype.setSocialMinerStateDown = function (fqdn) {
        this.appService.setSocialMinerStateDown(fqdn, this.setSocialMinerStateDownSuccess.bind(this), this.setSocialMinerStateDownFailure.bind(this));
    };
    AppComponent.prototype.setSocialMinerStateDownSuccess = function (response, id) {
        this.setState(id, this.stateType.Down);
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.setSocialMinerStateDownFailure = function (response) {
        this.error = 'State could not be set to "Down" due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.setSocialMinerResubmitRequest = function (fqdn) {
        this.appService.setSocialMinerResubmitRequest(fqdn, this.setSocialMinerResubmitRequestSuccess.bind(this), this.setSocialMinerResubmitRequestFailure.bind(this));
    };
    AppComponent.prototype.setSocialMinerResubmitRequestSuccess = function (response, id) {
        this.setResubmit(id);
        this.getTaskRoutingStatistics();
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.setSocialMinerResubmitRequestFailure = function (response) {
        this.error = 'Tasks could not be requeued due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.setState = function (fqdn, state) {
        for (var i = 0; i < this.socialMiners.length; i++) {
            if (this.socialMiners[i].FQDN == fqdn) {
                this.socialMiners[i].State = state;
                break;
            }
        }
    };
    AppComponent.prototype.setResubmit = function (fqdn) {
        for (var i = 0; i < this.socialMiners.length; i++) {
            if (this.socialMiners[i].FQDN == fqdn) {
                if (!this.socialMiners[i].ResubmitRequest) {
                    this.socialMiners[i].ResubmitRequest = true;
                }
                this.currentSM = this.socialMiners[i];
                break;
            }
        }
    };
    AppComponent.prototype.hideError = function () {
        this.showError = false;
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.getTaskRoutingStatistics = function () {
        this.appService.getTaskRoutingStatistics(this.getTaskRoutingStatisticsSuccess.bind(this), this.getTaskRoutingStatisticsFailure.bind(this));
    };
    AppComponent.prototype.getTaskRoutingStatisticsSuccess = function (response, id) {
        this.setProgress(response.TotalPendingOperations);
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.getTaskRoutingStatisticsFailure = function (response) {
        this.error = 'Requeue progress could not be retrieved due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.setProgress = function (progress) {
        this.currentSM.Progress = progress;
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.refreshApp = function () {
        this.getSocialMinerStates();
        this.cdRef.detectChanges();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(343),
        styles: [__webpack_require__(342)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(187);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppService = (function () {
    function AppService() {
        this.baseUri = upstream.gadget.Config.baseUri;
    }
    AppService.prototype.getSocialMinerStates = function (success, failure) {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/getsocialminerstates',
            type: "GET",
            success: function (data) {
                success(JSON.parse(data.StateList));
            },
            error: function (data) {
                failure(data);
            }
        });
    };
    /*setSocialMinerStateUp(id, success, failure): void {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/setsocialminerstateup?fqdn=' + id,
            type: "PUT",
            success: function (data: any) {
                success(data, id);
            },
            error: function (data: any) {
                failure(data);
            }
        });
    }*/
    AppService.prototype.setSocialMinerStateDown = function (id, success, failure) {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/setsocialminerstatedown?fqdn=' + id,
            type: "PUT",
            success: function (data) {
                success(data, id);
            },
            error: function (data) {
                failure(data);
            }
        });
    };
    AppService.prototype.setSocialMinerResubmitRequest = function (id, success, failure) {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/setsocialminerresubmitrequest?fqdn=' + id,
            type: "PUT",
            success: function (data) {
                success(data, id);
            },
            error: function (data) {
                failure(data);
            }
        });
    };
    AppService.prototype.getTaskRoutingStatistics = function (success, failure) {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/gettaskroutingstatistics',
            type: "GET",
            success: function (data) {
                success(JSON.parse(data.Statistics));
            },
            error: function (data) {
                failure(data);
            }
        });
    };
    return AppService;
}());
AppService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AppService);

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(100)();
// imports


// module
exports.push([module.i, ".mainContainer {\r\n    margin-top: 50px;\r\n    width: 60%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n.uq-admin-table {\r\n    width: 100%;\r\n}\r\n\r\n.uq-admin-table thead {\r\n    color: white;\r\n    background: #4489b6;    \r\n}\r\n\r\n.uq-admin-table tr {\r\n    background: white;\r\n}\r\n\r\n.uq-admin-table td {\r\n    height: 50px;\r\n    padding-left: 15px;\r\n}\r\n\r\n.error {\r\n    width: 100%;\r\n    color: white;\r\n    background: red;\r\n    margin-bottom: 10px;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n}\r\n\r\n.error .message {\r\n    margin-left: 15px;    \r\n}\r\n\r\n.error .closeError {\r\n    float: right;\r\n    margin-right: 5px;\r\n    margin-top: -6px;\r\n}\r\n.right {\r\n    float: right;\r\n}\r\n\r\nbutton:disabled:hover {\r\n    cursor: not-allowed;\r\n}\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 343:
/***/ (function(module, exports) {

module.exports = "<div class=\"mainContainer\" *ngIf=\"uqEnabled == 'true'\">\r\n    <div class=\"error\" *ngIf=\"showError\">\r\n        <span class=\"message\">{{error}}</span>\r\n        <span class=\"closeError\"><i class=\"uwf-cancel\" (click)=\"hideError()\"></i></span>\r\n    </div>\r\n    <button class=\"right\" style=\"padding-top: 4px; margin-bottom: 10px;\">\r\n        <i class=\"uwf-refresh\" (click)=\"refreshApp()\"></i>\r\n    </button>\r\n    <table class=\"uq-admin-table\">\r\n        <thead>\r\n            <td width=\"40%\">Server Name</td>\r\n            <td width=\"15%\">Server Status</td>\r\n            <td>Total Pending Operations</td>\r\n            <td width=\"20%\">Actions</td>\r\n        </thead>\r\n        <tr *ngFor=\"let socialMiner of socialMiners\">\r\n            <td>{{socialMiner.FQDN}}</td>\r\n            <td>{{socialMiner.State}}</td>\r\n            <td><span *ngIf=\"socialMiner.Progress >= 0\">{{socialMiner.Progress}} operation(s) remaining</span></td>\r\n            <td>\r\n                <button style=\"margin-top: 10px; margin-bottom: 10px;\" [disabled]=\"socialMiner.State == stateType.Down\" (click)=\"setSocialMinerStateDown(socialMiner.FQDN)\">Mark As Down</button>\r\n                <button style=\"margin-bottom: 10px;\" [disabled]=\"socialMiner.Progress > 0 || socialMiner.State != stateType.Down\" (click)=\"setSocialMinerResubmitRequest(socialMiner.FQDN)\">Requeue Tasks</button>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n<div class=\"mainContainer\" *ngIf=\"uqEnabled != 'true'\">\r\n    Universal Queue is currently not enabled. To use this feature, please enable Universal Queue in your configurations.\r\n</div>\r\n"

/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(180);


/***/ })

},[620]);
//# sourceMappingURL=main.bundle.js.map