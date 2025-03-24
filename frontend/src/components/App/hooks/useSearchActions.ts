import {Node} from "../../../types/Node";
import ApiService from "../../../services/ApiService";

export const useSearchActions = (setFilteredNodes: (node: Node | null) => void) => {
    const handleSearch = async (value: string) => {
        const rootNode = await ApiService.searchNodes(value);
        setFilteredNodes(rootNode);
    };

    return {
        handleSearch
    };
};