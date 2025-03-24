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
        assertNotNull(storage.filterRootTreeByValue("0"));
    }

    @Test
    void testFilterRootTreeByValue() {
        Node result = storage.filterRootTreeByValue("0-0");

        assertNotNull(result);
        assertEquals("0", result.getValue());
        assertEquals("0-0", result.getChildren().getFirst().getValue());
    }

    @Test
    void testMergeInRoot_addNewNode() {
        Node root = new Node(1L, "0");
        Node newNode = new Node(0L, "New Node");
        root.addChild(newNode);

        Node result = storage.mergeInRoot(root);

        assertNotEquals(0L, result.getChildren().getFirst().getId());
        assertEquals("New Node", result.getChildren().getFirst().getValue());
    }

    @Test
    void testMergeInRoot_rename() {
        Node root = new Node(1L, "0");
        Node root0 = new Node(2L, "0-Rename");
        root.addChild(root0);

        storage.mergeInRoot(root);

        Node result = storage.filterRootTreeByValue("0-0");
        assertNotNull(result);
        assertEquals(2L, result.getChildren().getFirst().getId());
        assertEquals("0-Rename", result.getChildren().getFirst().getValue());
    }

    @Test
    void testMergeInRoot_updateDelete() {
        Node root = new Node(1L, "0");
        Node root0 = new Node(2L, "deletedNode");
        root0.setDeleted(true);
        root.addChild(root0);

        storage.mergeInRoot(root);

        Node result = storage.filterRootTreeByValue(root0.getValue());
        assertNull(result);
    }
}