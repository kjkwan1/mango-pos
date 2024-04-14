import { NODE_TYPE, TreeNode } from "../../../node/node";

export const getRenderStrategy = (node: TreeNode): ((node: TreeNode) => string) => {
    let strategy: (node: TreeNode) => string;
    switch(node.type) {
        case NODE_TYPE.T_ITEM:
            strategy = (node: TreeNode) => 
            `<li class="${node.type}">
                ${node.data.quantity} ${node.data.name}
                <span class="right">${(node.data.price * node.data.quantity).toFixed(2)}</span>
            </li>`;
            break;
        case NODE_TYPE.T_MODIFIER:
            strategy = (node: TreeNode) => `<li class="${node.type}">${node.data.name} <span class="right">${node.data.priceAdjustment}</span></li>`;
            break;
        case NODE_TYPE.T_DISCOUNT:
            strategy = (node: TreeNode) => {
                const totalAffected = node.data.amount * (node.data.percentage / 100);
                return `<li class="${node.type}">${node.data.name}<span class="right">${totalAffected.toFixed(2)}</span></li>`;
            };
            break;
        default:
            strategy = (node: TreeNode) => `<li class="${node.type}">${node.data.name || node.data.customerInfo.firstName}</li>`;
            break;
    }
    return strategy;
}