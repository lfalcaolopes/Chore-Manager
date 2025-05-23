using Domain.Enums;

namespace Domain.Entites;

public class Chore
{
  public int Id { get; set; }
  public string Title { get; set; } = String.Empty;
  public string? Description { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? CompletedAt { get; set; }
  public ChoreStatus Status { get; set; } = ChoreStatus.Pending;
}
