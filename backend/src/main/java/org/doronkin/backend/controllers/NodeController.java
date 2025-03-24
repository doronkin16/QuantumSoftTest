package org.doronkin.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.doronkin.backend.database.InMemoryDataService;
import org.doronkin.backend.model.Node;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/Nodes")
public class NodeController {

    private final InMemoryDataService dataService;

    @PostMapping("/save")
    public Node addNode(@RequestBody Node node) {
        return dataService.save(node);
    }

    @PostMapping("/reset")
    public void reset() {
        dataService.reset();
    }

    @GetMapping("/search")
    public Node searchNodes(@RequestParam String value) {
        return dataService.findNodesByValue(value);
    }
}