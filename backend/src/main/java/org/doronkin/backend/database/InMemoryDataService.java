package org.doronkin.backend.database;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.doronkin.backend.model.Node;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InMemoryDataService {

    private final InMemoryDataStorage storage;

    @PostConstruct
    public void init() {
        storage.initDB();
    }

    public Node findNodesByValue(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        return storage.filterRootTreeByValue(value);
    }

    public Node save(Node node) {
        if (node == null) {
            return null;
        }
        return storage.mergeInRoot(node);
    }

    public void reset() {
        storage.initDB();
    }
}