using Application.DTOs.Chores;
using Domain.Entites;

namespace Application.Services.Chores;

public interface IChoreService
{
  Task<IEnumerable<ChoreReadDto>> GetAllAsync(CancellationToken cancellationToken);
  Task<ChoreReadDto?> GetByIdAsync(int id, CancellationToken cancellationToken);
  Task AddAsync(ChoreCreateDto chore, CancellationToken cancellationToken);
  Task<bool> UpdateAsync(int id, ChoreUpdateDto updatedChore, CancellationToken cancellationToken);
  Task<bool> DeleteAsync(int id, CancellationToken cancellationToken);
}
