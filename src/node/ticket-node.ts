import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/Array";
import { Monoid, concatAll, fold } from "fp-ts/lib/Monoid";
import { NODE_TYPE, TreeNode } from "../interface/tree-node";
import { Order, OrderItem } from "../data-generator/interface/interface";

const currencyMonoid: Monoid<number> = { concat: (x: number, y: number) => x + y, empty: 0 }
const calculateItemValue = (node: TreeNode): number => node.data.price * node.data.quantity;
const calculateModifierValue = (node: TreeNode): number => node.data.priceAdjustment;
const calculateDiscountEffect = (node: TreeNode): number => -(node.data.amount * (node.data.percentage / 100));
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

export const totalOrder = (node: TreeNode): number => {
    let nodeValue = 0;

    switch (node.type) {
        case NODE_TYPE.T_ITEM:
          nodeValue = calculateItemValue(node);
          break;
        case NODE_TYPE.T_MODIFIER:
          nodeValue = calculateModifierValue(node);
          break;
        case NODE_TYPE.T_DISCOUNT:
          nodeValue = calculateDiscountEffect(node);
          break;
        default:
          nodeValue = 0;
    }

    const childrenVal = node.childNodes
        ? concatAll(currencyMonoid)(node.childNodes.map(totalOrder))
        : nodeValue;

    return currencyMonoid.concat(nodeValue, childrenVal);
}

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
