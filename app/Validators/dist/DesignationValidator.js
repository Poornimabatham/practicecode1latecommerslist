"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Validator_1 = require("@ioc:Adonis/Core/Validator");
var BaseValidator_1 = require("./BaseValidator");
var DesignationValidator = /** @class */ (function (_super) {
    __extends(DesignationValidator, _super);
    function DesignationValidator(ctx) {
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        return _this;
    }
    DesignationValidator.AddDesignationschema = {
        schema: Validator_1.schema.create({
            uid: Validator_1.schema.number(),
            orgid: Validator_1.schema.number(),
            name: Validator_1.schema.string(),
            sts: Validator_1.schema.number.optional(),
            desc: Validator_1.schema.string.optional()
        })
    };
    DesignationValidator.Designationschema = {
        schema: Validator_1.schema.create({
            orgid: Validator_1.schema.number(),
            status: Validator_1.schema.number.optional(),
            pagename: Validator_1.schema.number.optional(),
            currentpage: Validator_1.schema.number.optional(),
            perpage: Validator_1.schema.number.optional()
        })
    };
    DesignationValidator.updateDesignationschema = {
        schema: Validator_1.schema.create({
            Updateid: Validator_1.schema.number(),
            UpdateName: Validator_1.schema.string(),
            sts: Validator_1.schema.number.optional(),
            Updateorgid: Validator_1.schema.number.optional()
        })
    };
    return DesignationValidator;
}(BaseValidator_1["default"]));
exports["default"] = DesignationValidator;