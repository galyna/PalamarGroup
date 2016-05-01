"use strict";
var mongoose_1 = require("mongoose");
//noinspection ReservedWordAsName
var OrderSchema = new mongoose_1.Schema({
    name: String,
    phone: String,
    email: String,
    date: { type: Date, default: Date.now },
    event_name: String,
    event_dates: [Date],
    event_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Course' },
    answered: { type: Boolean, default: false }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose_1.model('Order', OrderSchema);
//# sourceMappingURL=order.js.map