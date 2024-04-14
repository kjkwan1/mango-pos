import { OrderItem } from "../data-generator/interface/interface";

export enum NODE_TYPE {
    T_ITEM = 't-item-node',
    T_MODIFIER = 't-modifier-node',
    T_ORDER = 't-order-node',
    T_DISCOUNT = 't-discount-node',
    CATEGORY = 'category-node',
    SUBCATEGORY = 'subcategory-node',
    ITEM = 'item-node',
    MODIFIER = 'modifier-node',
    ORDER = 'order-node',
};

export type TreeNode = {
    type: NODE_TYPE;
    data: any;
    childNodes?: TreeNode[];
};

export type Matrix = Record<string, MatrixRow>;
export type MatrixRow = Record<string, OrderItem[]>;