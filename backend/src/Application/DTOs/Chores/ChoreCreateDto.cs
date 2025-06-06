using System.Text.Json.Serialization;
using Domain.Entites;
using Domain.Enums;

namespace Application.DTOs.Chores;

public class ChoreCreateDto
{
  [JsonPropertyName("titulo")]
  public string Title { get; set; } = String.Empty;
  [JsonPropertyName("descricao")]
  public string? Description { get; set; }
  [JsonPropertyName("dataDeConclusao")]
  public DateTime? CompletedAt { get; set; }
  [JsonPropertyName("status")]
  public ChoreStatus? Status { get; set; }
}
