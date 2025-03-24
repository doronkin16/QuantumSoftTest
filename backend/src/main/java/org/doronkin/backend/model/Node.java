package org.doronkin.backend.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Node {
    private Long id;
    private String value;
    private List<Node> children = new ArrayList<>();
    private boolean deleted = false;

    public Node(Long id, String value) {
        this.id = id;
        this.value = value;
    }

    public void addChild(Node child) {
        children.add(child);
    }
}