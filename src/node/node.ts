import { pipe } from "fp-ts/lib/function";
import { Order, OrderItem } from "../interface/interface";
import * as A from "fp-ts/Array";

export enum NODE_TYPE {
    T_ITEM = 'item-node',
    T_MODIFIER = 'modifier-node',
    T_ORDER = 'order-node',
    T_DISCOUNT = 'discount-node',
};

export type TreeNode = {
    type: NODE_TYPE;
    data: any;
    childNodes?: TreeNode[];
};

const createNode = (type: NODE_TYPE, data: any, childNodes?: TreeNode[]): TreeNode => { return { type, data, childNodes }};
const convertItemToTreeNode = (item: OrderItem): TreeNode => createNode(
    NODE_TYPE.T_ITEM,
    item,
    [
        ...pipe(
            item.childItems,
            A.map(convertItemToTreeNode)
        ),
        ...pipe(
            item.modifiers,
            A.map(modifier => createNode(NODE_TYPE.T_MODIFIER, modifier))
        )
    ]
)

export const convertOrderToTree = (order: Order): TreeNode => createNode(
    NODE_TYPE.T_ORDER,
    order,
    [
        ...pipe(
            order.items,
            A.map(convertItemToTreeNode)
        ),
        ...pipe(
            order.discountsApplied,
            A.map(discount => createNode(NODE_TYPE.T_DISCOUNT, discount))
        )
    ]
)