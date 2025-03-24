import {Node} from '../types/Node';

export const buildTreeDataSearchComponent = (node: Node | null, parent: Node | null): any[] => {
    if (!node) {
        return [];
    }
    const treeNode = {
        parent: parent,
        ...node,
        disabled: node.deleted,
    };
    treeNode.children = node.children ? node.children.map(child => buildTreeDataSearchComponent(child, treeNode)[0]) : [];
    return [treeNode];
};

export const buildTreeDataCacheView = (nodes: Node[]): any[] => {
    return nodes.map(node => ({
        key: node.id === 0 ? node.tempId : node.id,
        title: node.value,
        children: node.children ? buildTreeDataCacheView(node.children) : undefined,
        realNode: node,
        disabled: node.deleted,
    }));
};

export const mergeNodes = (cacheNode: Node | null, selectedNode: Node): Node | null => {
    if (!selectedNode) return cacheNode;
    if (!cacheNode) {
        return selectedNode;
    }
    cacheNode.value = selectedNode.value;
    cacheNode.deleted = selectedNode.deleted;
    cacheNode.tempId = selectedNode.tempId;

    if (selectedNode.children) {
        if (!cacheNode.children) {
            cacheNode.children = [];
        }

        const cacheChildrenMap = new Map<number, Node>();
        cacheNode.children.forEach(child => {
            cacheChildrenMap.set(child.id, child);
        });

        selectedNode.children.forEach(selectedChild => {
            const existingChild = cacheChildrenMap.get(selectedChild.id);
            if (existingChild) {
                mergeNodes(existingChild, selectedChild);
            } else {
                cacheNode.children!.push(selectedChild);
            }
        });
    }
    return cacheNode;
};

export const buildTreeFromSelectedNode = (selectedNode: any): Node => {
    let currentNode: Node = {
        id: selectedNode.id,
        value: selectedNode.value,
        children: [],
        deleted: selectedNode.deleted,
    };

    let parent = selectedNode.parent;
    while (parent) {
        currentNode = {
            id: parent.id,
            value: parent.value,
            children: [currentNode],
            deleted: parent.deleted,
        };
        parent = parent.parent;
    }

    return currentNode;
};