using System.Net;
using Application.DTOs.Chores;
using Application.Validators.Chores;
using AutoMapper;
using Domain.Entites;
using Domain.Enums;
using Domain.Repositories;
using Domain.Utils;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Presentation.Utils.Exceptions;

namespace Application.Services.Chores;

public class ChoreService : IChoreService
{
  private readonly IChoreRepository _repository;
  private readonly IMapper _mapper;
  public ChoreService(IChoreRepository repository, IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }

  public async Task<IEnumerable<ChoreReadDto>> GetAllAsync(CancellationToken cancellationToken)
  {
    var chores = await _repository.GetAllAsync(cancellationToken);

    return _mapper.Map<IEnumerable<ChoreReadDto>>(chores);
  }

  public async Task<ChoreReadDto?> GetByIdAsync(int id, CancellationToken cancellationToken)
  {
    var chore = await _repository.GetByIdAsync(id, cancellationToken)
      ?? throw new ApplicationProblemException(HttpStatusCode.NotFound, new ProblemDetails
      {
        Title = "Tarefa não encontrada",
        Detail = $"Não foi possível encontrar nenhuma tarefa com o ID {id}",
        Status = (int)HttpStatusCode.NotFound
      });

    return _mapper.Map<ChoreReadDto>(chore);
  }

  public async Task AddAsync(ChoreCreateDto choreDto, CancellationToken cancellationToken)
  {
    var validator = new ChoreCreateDtoValidator();
    var validationResult = validator.Validate(choreDto);
    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    var chore = _mapper.Map<Chore>(choreDto);

    chore.CreatedAt = DateTime.UtcNow;
    chore.CompletedAt = chore.Status == ChoreStatus.Completed
      ? DateTime.UtcNow
      : null;

    await _repository.AddAsync(chore, cancellationToken);
    await _repository.SaveChangesAsync(cancellationToken);
  }

  public async Task<bool> UpdateAsync(int id, ChoreUpdateDto choreDto, CancellationToken cancellationToken)
  {
    var validator = new ChoreUpdateDtoValidator();
    var validationResult = validator.Validate(choreDto);
    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    var existingChore = await _repository.GetByIdAsync(id, cancellationToken)
      ?? throw new ApplicationProblemException(HttpStatusCode.NotFound, new ProblemDetails
      {
        Title = "Tarefa não encontrada",
        Detail = $"Não foi possível encontrar nenhuma tarefa com o ID {id}",
        Status = (int)HttpStatusCode.NotFound
      });

    if (choreDto.CompletedAt < existingChore.CreatedAt)
    {
      throw new ApplicationProblemException(HttpStatusCode.BadRequest, new ProblemDetails
      {
        Title = "Data de conclusão inválida",
        Detail = "A data de conclusão não pode ser anterior à data de criação da tarefa.",
        Status = (int)HttpStatusCode.BadRequest
      });
    }

    var previousStatus = existingChore.Status;

    _mapper.Map(choreDto, existingChore);

    if (previousStatus != existingChore.Status)
    {
      existingChore.CompletedAt = existingChore.Status == ChoreStatus.Completed
        ? existingChore.CompletedAt ?? DateTime.UtcNow
        : null;
    }

    await _repository.UpdateAsync(existingChore);
    await _repository.SaveChangesAsync(cancellationToken);

    return true;
  }

  public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken)
  {
    var existingChore = await _repository.GetByIdAsync(id, cancellationToken)
      ?? throw new ApplicationProblemException(HttpStatusCode.NotFound, new ProblemDetails
      {
        Title = "Tarefa não encontrada",
        Detail = $"Não foi possível encontrar nenhuma tarefa com o ID {id}",
        Status = (int)HttpStatusCode.NotFound
      });

    await _repository.DeleteAsync(existingChore);
    await _repository.SaveChangesAsync(cancellationToken);

    return true;
  }
}
