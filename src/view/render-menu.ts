import { pipe } from "fp-ts/lib/function";
import { Matrix, TreeNode } from "../interface/tree-node";
import { getRenderStrategy } from "./strategies/menu-strategy/menu-strategy";
import { MonoidHtmlString } from "../util/monoids/monoids";
import { convertMatrixToTree, convertMenuToMatrix } from "../node/menu-node";
import { OrderItem } from "../data-generator/interface/interface";

const renderNode = (node: TreeNode): string => {
    const strategy = getRenderStrategy(node);
    return strategy(node);
};

const appendChild = (childHtml: string) => (parentHtml: string) => parentHtml + childHtml;
const wrapDiv = (html: string) => `<div>${html}</div>`;
const renderItemTree: (node: TreeNode) => string = (node) => {
    const renderChildren = node.childNodes
        ? pipe(
            node.childNodes.map(renderItemTree),
            (childStrings) => childStrings.reduce(MonoidHtmlString.concat, MonoidHtmlString.empty),
            wrapDiv,
        )
        : '';
    
    return appendChild(renderChildren)(renderNode(node));
}

export const renderMenuItems = (menu: OrderItem[]) => pipe(
    menu,
    convertMenuToMatrix,
    convertMatrixToTree
)