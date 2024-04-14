import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/Array";
import * as R from 'fp-ts/Record';
import { Matrix, MatrixRow, NODE_TYPE, TreeNode } from "../interface/tree-node";
import { OrderItem } from "../data-generator/interface/interface";
import { groupBy } from "fp-ts/lib/NonEmptyArray";
import { Ord, fromCompare } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";

const groupByCat = groupBy((item: OrderItem) => item.category);
const groupBySubcat = groupBy((item: OrderItem) => item.subcategory);
const orderByCatAndSubcat: Ord<OrderItem> = fromCompare((a: OrderItem, b: OrderItem) => {
    const categoryComparison = a.category.localeCompare(b.category);
    if (categoryComparison !== 0) return categoryComparison as Ordering;
    return a.subcategory.localeCompare(b.subcategory) as Ordering;
})
const sortItems = A.sort(orderByCatAndSubcat);

const createTreeNode = (type: NODE_TYPE, data: any, childNodes?: TreeNode[]): TreeNode => ({ type, data, childNodes });
const convertItemToTreeNode = (item: OrderItem): TreeNode => createTreeNode(
    NODE_TYPE.ITEM,
    item,
    item.childItems.map(convertItemToTreeNode),
)

const convertSubcatToTreeNode = (subcat: MatrixRow) => 
    pipe(
        subcat,
        R.mapWithIndex((key, items) => createTreeNode(NODE_TYPE.SUBCATEGORY, key, items.map(convertItemToTreeNode))),
        R.toArray,
        A.map(([_, node]) => node)
    )

const convertCategoryToTreeNode = (categories: Matrix) => 
    pipe(
        categories,
        R.mapWithIndex((key, subcategories) => 
            createTreeNode(NODE_TYPE.CATEGORY, key, convertSubcatToTreeNode(subcategories))
        ),
        R.toArray,
        A.map(([_, node]) => node)
    )

export const convertMatrixToTree = (matrix: Matrix): TreeNode => createTreeNode(NODE_TYPE.ORDER, null, convertCategoryToTreeNode(matrix))
export const convertMenuToMatrix = (items: OrderItem[]): Record<string, Record<string, OrderItem[]>> => {
    const sortedItems = sortItems(items);
    const categoryGroups = groupByCat(sortedItems);

    return Object.fromEntries(
        Object.entries(categoryGroups).map(([category, items]) => [
            category,
            groupBySubcat(items)
        ])
    );
};
