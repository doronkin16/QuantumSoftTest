package org.doronkin.backend.database;

import org.doronkin.backend.model.Node;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class InMemoryDataStorage {

    private final int MAX_LEVEL = 4;
    private final int CHILDREN_COUNT = 2;

    private Node root;
    private final AtomicLong idCounter = new AtomicLong();

    public void initDB() {
        idCounter.set(1);

        root = new Node(idCounter.getAndIncrement(), "0");
        createNestedLevels(0, root);
    }

    private void createNestedLevels(int level, Node parent) {
        if (level > MAX_LEVEL) {
            return;
        }

        for (int i = 0; i < CHILDREN_COUNT; i++) {
            Node childNode = new Node(idCounter.getAndIncrement(), parent.getValue() + "-" + i);
            parent.addChild(childNode);
            createNestedLevels(level + 1, childNode);
        }
    }

    public Node filterRootTreeByValue(String value) {
        return filterTree(this.root, value);
    }

    private Node filterTree(Node node, String value) {
        if (node == null || node.isDeleted()) {
            return null;
        }
        Node filteredNode = new Node(node.getId(), node.getValue());
        filteredNode.setDeleted(node.isDeleted());
        for (Node child : node.getChildren()) {
            Node filteredChild = filterTree(child, value);
            if (filteredChild != null) {
                filteredNode.addChild(filteredChild);
            }
        }
        if (filteredNode.getValue().toLowerCase().contains(value.toLowerCase()) || !filteredNode.getChildren().isEmpty()) {
            return filteredNode;
        }
        return null;
    }

    public Node mergeInRoot(Node source) {
        mergeTrees(source, this.root);
        return source;
    }

    private void mergeTrees(Node source, Node target) {
        if (source == null || target == null) {
            return;
        }
        target.setDeleted(source.isDeleted());
        if (!target.isDeleted() && !Objects.equals(source.getValue(), target.getValue())) {
            target.setValue(source.getValue());
        }
        for (Node sourceChild : source.getChildren()) {
            Node targetChild = findChildById(target, sourceChild.getId());
            if (targetChild == null) {
                sourceChild.setId(idCounter.getAndIncrement());
                target.addChild(sourceChild);
            } else {
                mergeTrees(sourceChild, targetChild);
            }
        }
    }

    private Node findChildById(Node parent, Long id) {
        if (parent == null || id == null) {
            return null;
        }
        return parent.getChildren().stream()
                .filter(child -> child.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
