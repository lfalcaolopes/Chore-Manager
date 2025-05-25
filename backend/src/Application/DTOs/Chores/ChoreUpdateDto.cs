using System.Text.Json.Serialization;
using Domain.Enums;

namespace Application.DTOs.Chores;

public class ChoreUpdateDto
{
  [JsonPropertyName("titulo")]
  public string? Title { get; set; } = String.Empty;

  [JsonPropertyName("descricao")]
  public string? Description { get; set; }

  [JsonPropertyName("status")]
  public ChoreStatus? Status { get; set; }
}
