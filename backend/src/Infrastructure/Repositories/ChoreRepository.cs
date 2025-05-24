using Domain.Entites;
using Infrastructure.Databases;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ChoreRepository : IChoreRepository
{
  private readonly AppDbContext _context;

  public ChoreRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<Chore>> GetAllAsync(CancellationToken cancellationToken)
  {
    return await _context.Chores
      .AsNoTracking()
      .ToListAsync(cancellationToken);
  }

  public async Task<Chore?> GetByIdAsync(int id, CancellationToken cancellationToken)
  {
    return await _context.Chores
      .AsNoTracking()
      .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
  }

  public async Task AddAsync(Chore chore, CancellationToken cancellationToken)
  {
    await _context.Chores.AddAsync(chore, cancellationToken);
  }

  public Task UpdateAsync(Chore chore)
  {
    _context.Chores.Update(chore);
    return Task.CompletedTask;
  }

  public Task DeleteAsync(Chore chore)
  {
    _context.Chores.Remove(chore);
    return Task.CompletedTask;
  }

  public async Task SaveChangesAsync(CancellationToken cancellationToken)
  {
    await _context.SaveChangesAsync(cancellationToken);
  }
}
