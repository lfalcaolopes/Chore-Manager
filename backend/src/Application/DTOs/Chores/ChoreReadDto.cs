using System.Text.Json.Serialization;
using Domain.Enums;

namespace Application.DTOs.Chores;

public class ChoreReadDto
{
  [JsonPropertyName("id")]
  public int Id { get; set; }

  [JsonPropertyName("titulo")]
  public string Title { get; set; } = String.Empty;

  [JsonPropertyName("descricao")]
  public string? Description { get; set; }

  [JsonPropertyName("dataDeCriacao")]
  public DateTime CreatedAt { get; set; }

  [JsonPropertyName("dataDeConclusao")]
  public DateTime? CompletedAt { get; set; }

  [JsonPropertyName("status")]
  public ChoreStatus Status { get; set; }
}
