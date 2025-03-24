import React, { useState } from 'react';
import { Tree, Button } from 'antd';
import { Node } from '../../types/Node';
import {buildTreeDataCacheView} from "../../utils/treeUtils";

interface TreeViewProps {
    root: Node | null;
    onAdd: (parentNode: Node) => void;
    onEdit: (Node: Node) => void;
    onDelete: (Node: Node) => void;
}

const CacheView: React.FC<TreeViewProps> = ({ root, onAdd, onEdit, onDelete }) => {
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [selectedNode, setSelectedNode] = useState<any>(null);

    const treeData = buildTreeDataCacheView(root ? [root] : []);

    const deleteNode = (node: Node) => {
        onDelete(node)
        setSelectedKeys([]);
        setSelectedNode(undefined);

    };

    return (
        <div>
            <Tree
                treeData={treeData}
                selectedKeys={selectedKeys}
                defaultExpandAll
                onSelect={(selectedKeysValue, info) => {
                    setSelectedKeys(selectedKeysValue);
                    setSelectedNode(selectedKeysValue.length > 0 ? info.node.realNode : undefined);
                }}
                style={{ border: 2, minHeight: '300px' }}
            />
            <div style={{ marginTop: 16 }}>
                <Button
                    type="primary"
                    onClick={() => selectedNode && onAdd(selectedNode)}
                    disabled={!selectedNode}
                >
                    Add Child
                </Button>
                <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => selectedNode && onEdit(selectedNode)}
                    disabled={!selectedNode}
                >
                    Edit
                </Button>
                <Button
                    style={{ marginLeft: 8 }}
                    danger
                    onClick={() => selectedNode && deleteNode(selectedNode)}
                    disabled={!selectedNode}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default CacheView;