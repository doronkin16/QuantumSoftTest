import {Node} from "../../../types/Node";

export const useTreeActions = (setCachedNode: (node: Node | null) => void,  root: Node | null) => {
    const handleAddNode = async (parentNode: Node) => {
        const value = prompt("Enter new value");

        if (value) {
            parentNode?.children?.push({
                id: 0,
                tempId: crypto.randomUUID(),
                value: value,
                children: [],
                deleted: false
            });
            setCachedNode({...root!});
        }
    };

    const handleEditNodeValue = async (Node: Node) => {
        const value = prompt("Enter new value");
        if (value) {
            Node.value = value;
            setCachedNode({...root!});
        }
    };

    const handleDeleteNode = async (Node: Node) => {
        Node.deleted = true;
        Node.children?.forEach(child => handleDeleteNode(child));
        setCachedNode({...root!});
    };

    return {
        handleAddNode,
        handleEditNodeValue,
        handleDeleteNode,
    };
};