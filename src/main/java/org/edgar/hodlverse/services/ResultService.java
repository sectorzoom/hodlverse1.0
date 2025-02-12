package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.Result;
import org.edgar.hodlverse.repositories.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultService {

    private final ResultRepository resultRepository;

    @Autowired
    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    // Obtener todos los resultados
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    // Obtener un resultado por ID
    public Optional<Result> getResultById(Long resultId) {
        return resultRepository.findById(resultId);
    }

    // Obtener un resultado por el ID del juego
    public Optional<Result> getResultByGameId(Long gameId) {
        return resultRepository.findByGameId(gameId);
    }

    // Guardar un nuevo resultado
    public Result saveResult(Result result) {
        return resultRepository.save(result);
    }

    // Eliminar un resultado
    public void deleteResult(Long resultId) {
        resultRepository.deleteById(resultId);
    }
}
