"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_item_1 = require("./data-generator/generate-item");
const generate_order_1 = require("./data-generator/generate-order");
console.log((0, generate_item_1.generateItems)(10));
console.log((0, generate_order_1.generateOrders)(2));
