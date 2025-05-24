using Domain.Enums;

namespace Domain.Utils;

public static class ChoreStatusExtension
{
  public static string ToPortuguese(this ChoreStatus status)
  {
    return status switch
    {
      ChoreStatus.Pending => "Pendente",
      ChoreStatus.InProgress => "Em Progresso",
      ChoreStatus.Completed => "Concluída",
      _ => status.ToString()
    };
  }

  public static ChoreStatus FromPortuguese(string status)
  {
    return status.Trim().ToLower() switch
    {
      "pendente" => ChoreStatus.Pending,
      "em progresso" => ChoreStatus.InProgress,
      "emprogresso" => ChoreStatus.InProgress,
      "concluída" => ChoreStatus.Completed,
      _ => throw new ArgumentException("Status inválido", nameof(status))
    };
  }
}
