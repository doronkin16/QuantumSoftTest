package org.doronkin.backend.database;

import org.doronkin.backend.model.Node;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class InMemoryDataStorageTest {
    private InMemoryDataStorage storage;

    @BeforeEach
    void setUp() {
        storage = new InMemoryDataStorage();
        storage.initDB();
    }

    @Test
    void testInitDB() {
        assertNotNull(storage.filterRootTreeByValue("Root"));
    }

    @Test
    void testFilterRootTreeByValue() {
        Node result = storage.filterRootTreeByValue("Root-0");

        assertNotNull(result);
        assertEquals("Root", result.getValue());
        assertEquals("Root-0", result.getChildren().getFirst().getValue());
    }

    @Test
    void testMergeInRoot_addNewNode() {
        Node root = new Node(1L, "Root");
        Node newNode = new Node(0L, "New Node");
        root.addChild(newNode);

        Node result = storage.mergeInRoot(root);

        assertNotEquals(0L, result.getChildren().getFirst().getId());
        assertEquals("New Node", result.getChildren().getFirst().getValue());
    }

    @Test
    void testMergeInRoot_rename() {
        Node root = new Node(1L, "Root");
        Node root0 = new Node(2L, "Root-Rename");
        root.addChild(root0);

        storage.mergeInRoot(root);

        Node result = storage.filterRootTreeByValue("Root-0");
        assertNotNull(result);
        assertEquals(2L, result.getChildren().getFirst().getId());
        assertEquals("Root-Rename", result.getChildren().getFirst().getValue());
    }

    @Test
    void testMergeInRoot_updateDelete() {
        Node root = new Node(1L, "Root");
        Node root0 = new Node(2L, "Root-0");
        root0.setDeleted(true);
        root.addChild(root0);

        storage.mergeInRoot(root);

        Node result = storage.filterRootTreeByValue("Root-0");
        assertNull(result);
    }
}