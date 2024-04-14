import { Monoid } from "fp-ts/lib/Monoid";
import { Order } from "../interface/interface";
import { NODE_TYPE, TreeNode, convertOrderToTree } from "../node/node";
import { pipe } from "fp-ts/lib/function";
import { getRenderStrategy } from "./strategies/ticket-strategy/ticket-strategy";

const mHtml: Monoid<string> = {
    concat: (x: string, y: string) => x + y,
    empty: ""
}

const renderNode = (node: TreeNode): string => {
    const strategy = getRenderStrategy(node);
    return strategy(node);
};

const appendChild = (childHtml: string) => (parentHtml: string) => parentHtml + childHtml;
const wrapUl = (html: string) => `<ul>${html}</ul>`;
const renderItemTree: (node: TreeNode) => string = (node) => {
    const renderChildren = node.childNodes
        ? pipe(
            node.childNodes.map(renderItemTree),
            (childStrings) => childStrings.reduce(mHtml.concat, mHtml.empty),
            wrapUl,
        )
        : '';
    
    return appendChild(renderChildren)(renderNode(node));
}

export function generateOrderTreeHTML(order: Order) {
    const tree: TreeNode = convertOrderToTree(order);
    return wrapUl(renderItemTree(tree));
}