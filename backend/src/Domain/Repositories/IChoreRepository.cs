using Domain.Entites;

namespace Domain.Repositories;

public interface IChoreRepository
{
  Task<IEnumerable<Chore>> GetAllAsync(CancellationToken cancellationToken);
  Task<Chore?> GetByIdAsync(int id, CancellationToken cancellationToken);
  Task AddAsync(Chore chore, CancellationToken cancellationToken);
  Task UpdateAsync(Chore chore);
  Task DeleteAsync(Chore chore);
  Task SaveChangesAsync(CancellationToken cancellationToken);
}
