import '../style.scss';
import { generateOrder } from './data-generator/generate-order';
import { generateOrderTreeHTML } from './view/render-tree';

const order = generateOrder();
const container = document.getElementById('treeContainer');
container.innerHTML = generateOrderTreeHTML(order);