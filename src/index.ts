import '../style.scss';
import { generateOrder, generateOrderItem } from './data-generator/generate-order';
import { OrderItem } from './data-generator/interface/interface';
import { Matrix } from './interface/tree-node';
import { renderMenuItems } from './view/render-menu';
import { generateOrderTreeHTML } from './view/render-tree';

const items: OrderItem[] = Array.from({ length: 100 }, generateOrderItem);
console.log('items unsorted: ', items);
console.log('menu tree: ', renderMenuItems(items));

const order = generateOrder();
const container = document.getElementById('treeContainer');
container.innerHTML = generateOrderTreeHTML(order);