using Application.DTOs.Chores;
using AutoMapper;
using Domain.Entites;
using Domain.Enums;
using Domain.Repositories;
using Domain.Utils;

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
    var chore = await _repository.GetByIdAsync(id, cancellationToken);

    if (chore is null)
    {
      return null;
    }

    return _mapper.Map<ChoreReadDto>(chore);
  }

  public async Task AddAsync(ChoreCreateDto choreDto, CancellationToken cancellationToken)
  {
    var chore = _mapper.Map<Chore>(choreDto);

    chore.CreatedAt = DateTime.UtcNow;
    chore.Status = choreDto.Status != null
      ? ChoreStatusExtension.FromPortuguese(choreDto.Status)
      : ChoreStatus.Pending;

    await _repository.AddAsync(chore, cancellationToken);
    await _repository.SaveChangesAsync(cancellationToken);
  }

  public async Task<bool> UpdateAsync(int id, ChoreUpdateDto choreDto, CancellationToken cancellationToken)
  {
    var existingChore = await _repository.GetByIdAsync(id, cancellationToken);

    if (existingChore is null)
    {
      return false;
    }

    _mapper.Map(choreDto, existingChore);

    if (choreDto.Status != null)
    {
      existingChore.Status = ChoreStatusExtension.FromPortuguese(choreDto.Status);
    }

    await _repository.UpdateAsync(existingChore);
    await _repository.SaveChangesAsync(cancellationToken);

    return true;
  }

  public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken)
  {
    var existingChore = await _repository.GetByIdAsync(id, cancellationToken);

    if (existingChore is null)
    {
      return false;
    }

    await _repository.DeleteAsync(existingChore);
    await _repository.SaveChangesAsync(cancellationToken);

    return true;
  }
}
