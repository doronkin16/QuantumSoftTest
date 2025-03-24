import React, {useMemo, useState} from 'react';
import { Input, Button, Tree } from 'antd';
import { Node } from '../../types/Node';
import {buildTreeDataSearchComponent, buildTreeFromSelectedNode} from "../../utils/treeUtils";

interface SearchComponentProps {
    onSearch: (value: string) => void;
    filteredTree: Node | null;
    onLoadToCache: (rootSelected: Node) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, filteredTree, onLoadToCache }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [selectedNode, setSelectedNode] = useState<any>(null);

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const treeData = useMemo(() => buildTreeDataSearchComponent(filteredTree, null), [filteredTree]);

    const handleLoadSelectedToCache = () => {
        if (selectedKeys.length === 0 || !filteredTree || !selectedNode) return;

        onLoadToCache(buildTreeFromSelectedNode(selectedNode));
    };

    return (
        <div>
            <Input
                placeholder="Enter node value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ width: 200, marginRight: 8 }}
            />
            <Button type="primary" onClick={handleSearch}>
                Search
            </Button>

            {treeData.length > 0 ?
                (<Tree
                    treeData={treeData}
                    selectable
                    defaultExpandAll
                    selectedKeys={selectedKeys}
                    onSelect={(selectedKeys, info) => {
                        setSelectedKeys(selectedKeys as React.Key[])
                        setSelectedNode(selectedKeys.length > 0 ? info.node : null);
                    }}
                    style={{ marginTop: 16, border: 2, minHeight: '300px' }}
                    fieldNames={{key: "id", title: "value"}}/>)
                : (<div style={{ marginTop: 16, border: 2, minHeight: '300px' }}>
                    No one node found
                </div>)}

            <Button type="primary" onClick={handleLoadSelectedToCache} style={{ marginTop: 16 }}>
                Load Selected to Cache
            </Button>
        </div>
    );
};

export default SearchComponent;