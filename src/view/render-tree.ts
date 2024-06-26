import { convertOrderToTree, totalOrder } from "../node/ticket-node";
import { pipe } from "fp-ts/lib/function";
import { getRenderStrategy } from "./strategies/ticket-strategy/ticket-strategy";
import { TreeNode } from "../interface/tree-node";
import { Order } from "../data-generator/interface/interface";
import { MonoidHtmlString } from "../util/monoids/monoids";

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
            (childStrings) => childStrings.reduce(MonoidHtmlString.concat, MonoidHtmlString.empty),
            wrapUl,
        )
        : '';
    
    return appendChild(renderChildren)(renderNode(node));
}

export function generateOrderTreeHTML(order: Order) {
    const tree: TreeNode = convertOrderToTree(order);
    console.log(totalOrder(tree));
    return wrapUl(renderItemTree(tree));
}