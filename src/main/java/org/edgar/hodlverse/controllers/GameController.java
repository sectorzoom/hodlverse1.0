package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Game;
import org.edgar.hodlverse.services.GameService;
import org.edgar.hodlverse.services.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games") // Ruta base para el controlador
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // Obtener todas las partidas
    @GetMapping
    public ResponseEntity<List<Game>> all() {
        return ResponseEntity.ok(gameService.findAll());
    }

    // Crear una nueva partida
    @PostMapping
    public ResponseEntity<Game> newGame(@RequestBody Game newGame) {
        return ResponseEntity.ok(gameService.save(newGame));
    }

    // Obtener una partida por ID
    @GetMapping("/{id}")
    public ResponseEntity<Game> one(@PathVariable Long id) {
        return gameService.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new NotFoundException("Partida con ID " + id + " no encontrada."));
    }

    // Actualizar una partida
    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@RequestBody Game newGame, @PathVariable Long id) {
        return gameService.findById(id)
                .map(game -> {
                    game.setDifficulty(newGame.getDifficulty());
                    game.setInitialCredit(newGame.getInitialCredit());
                    game.setObjective(newGame.getObjective());
                    game.setDuration(newGame.getDuration());
                    game.setStartDate(newGame.getStartDate());
                    return ResponseEntity.ok(gameService.save(game));
                })
                .orElseThrow(() -> new NotFoundException("Partida con ID " + id + " no encontrada."));
    }

    // Eliminar una partida
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        if (gameService.findById(id).isEmpty()) {
            throw new NotFoundException("Partida con ID " + id + " no encontrada.");
        }
        gameService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
