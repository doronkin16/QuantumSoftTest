import {Node} from "../../../types/Node";
import {mergeNodes} from "../../../utils/treeUtils";
import ApiService from "../../../services/ApiService";

export const useCacheActions = (setCachedNode: (node: Node | null) => void, setFilteredNodes: (node: Node | null) => void, cachedNode: Node | null, ) => {
    const loadSelectedToCache = (rootSelectedNode: Node) => {
        if (!rootSelectedNode) return;
        setCachedNode({...mergeNodes(cachedNode, rootSelectedNode)!});
    };

    const saveChanges = async () => {
        if (!cachedNode) return;
        const root = await ApiService.saveChanges(cachedNode);
        setFilteredNodes(null);
        setCachedNode(root);
    };

    const resetChanges = async () => {
        await ApiService.resetChanges();
        setCachedNode(null);
        setFilteredNodes(null);
    };

    const clearCache = async () => {
        setCachedNode(null);
    };

    return {
        saveChanges,
        loadSelectedToCache,
        resetChanges,
        clearCache,
    };
};