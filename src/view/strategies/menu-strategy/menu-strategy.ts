import { NODE_TYPE, TreeNode } from "../../../interface/tree-node";

export const getRenderStrategy = (node: TreeNode): ((node: TreeNode) => string) => {
    let strategy: (node: TreeNode) => string;
    switch(node.type) {
        case NODE_TYPE.ITEM:
            strategy = (node: TreeNode) => 
            `<div class="${node.type}">
                ${node.data.quantity} ${node.data.name}
                <span class="right">$${(node.data.price * node.data.quantity).toFixed(2)}</span>
            </div>`;
            break;
        case NODE_TYPE.MODIFIER:
            strategy = (node: TreeNode) => `<div class="${node.type}">${node.data.name} <span class="right">$${node.data.priceAdjustment}</span></div>`;
            break;
        default:
            strategy = (node: TreeNode) => `<div class="${node.type}">${node.data.name || node.data.customerInfo.firstName}</div>`;
            break;
    }
    return strategy;
}