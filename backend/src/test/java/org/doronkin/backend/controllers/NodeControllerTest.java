package org.doronkin.backend.controllers;

import org.doronkin.backend.database.InMemoryDataStorage;
import org.doronkin.backend.model.Node;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class NodeControllerTest {
    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private InMemoryDataStorage inMemoryDataStorage;

    private final String NEW_NODE_VALUE = "New Node";

    @Test
    void testAddNode() {
        Node root = createHierarchyWithNewNode();

        ResponseEntity<Node> response = restTemplate.postForEntity("/api/Nodes/save", root, Node.class);

        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertEquals(NEW_NODE_VALUE, response.getBody().getChildren().getFirst().getValue());
        assertNotEquals(0L, response.getBody().getChildren().getFirst().getId());
    }

    @Test
    void testSearchNodes() {
        ResponseEntity<Node> response = restTemplate.getForEntity("/api/Nodes/search?value=0-0", Node.class);

        assertTrue(response.getStatusCode().is2xxSuccessful());

        Node result = response.getBody();
        assertNotNull(result);
        assertEquals("0", result.getValue());
        assertEquals("0-0", result.getChildren().getFirst().getValue());
    }

    @Test
    void testReset() {
        addNewNode();

        ResponseEntity<String> response = restTemplate.postForEntity("/api/Nodes/reset", null, String.class);

        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertNull(inMemoryDataStorage.filterRootTreeByValue(NEW_NODE_VALUE));
    }

    private void addNewNode() {
        inMemoryDataStorage.mergeInRoot(createHierarchyWithNewNode());
    }

    private Node createHierarchyWithNewNode() {
        Node root = new Node(1L, "0");
        Node newNode = new Node(0L, NEW_NODE_VALUE);
        root.addChild(newNode);
        return root;
    }
}