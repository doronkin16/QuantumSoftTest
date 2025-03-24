import React, { useState } from 'react';
import {Button, Splitter} from 'antd';
import CacheView from '../CacheView/CacheView';
import SearchComponent from '../SearchComponent/SearchComponent';
import { Node } from '../../types/Node';
import {useTreeActions} from "./hooks/useTreeActions";
import {useCacheActions} from "./hooks/useCacheActions";
import {useSearchActions} from "./hooks/useSearchActions";

const App: React.FC = () => {
  const [cachedNode, setCachedNode] = useState<Node | null>(null);
  const [filteredTree, setFilteredNodes] = useState<Node | null>(null);

  const { handleAddNode, handleEditNodeValue, handleDeleteNode } = useTreeActions(setCachedNode, cachedNode);
  const { saveChanges,
    loadSelectedToCache,
    resetChanges,
    clearCache
  } = useCacheActions(setCachedNode, setFilteredNodes, cachedNode);

  const { handleSearch } = useSearchActions(setFilteredNodes);

  return (
      <Splitter style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Splitter.Panel defaultSize="50%" min="20%" max="70%" style={{ margin: 16 }}>
          <h2>Cached nodes</h2>
          <CacheView
              root={cachedNode}
              onAdd={handleAddNode}
              onEdit={handleEditNodeValue}
              onDelete={handleDeleteNode}
          />
          <div style={{ marginTop: 16}}>
            <Button type="primary" onClick={saveChanges}>
              Apply Changes
            </Button>
            <Button type="primary" onClick={resetChanges} style={{marginLeft: 8}}>
              Reset
            </Button>
            <Button type="primary" onClick={clearCache} style={{marginLeft: 8}}>
              Clear Cashed Nodes
            </Button>
          </div>
        </Splitter.Panel>
        <Splitter.Panel style={{ margin: 16 }}>
          <h2>Search in database</h2>
          <SearchComponent
              onSearch={handleSearch}
              filteredTree={filteredTree}
              onLoadToCache={loadSelectedToCache}
          />
        </Splitter.Panel>
      </Splitter>
  );
};

export default App;