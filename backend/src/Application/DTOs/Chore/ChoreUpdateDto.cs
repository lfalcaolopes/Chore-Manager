using System.Text.Json.Serialization;

namespace Application.DTOs.Chore;

public class ChoreUpdateDto
{
  [JsonPropertyName("titulo")]
  public string Title { get; set; } = String.Empty;

  [JsonPropertyName("descricao")]
  public string? Description { get; set; }

  [JsonPropertyName("dataDeConclusao")]
  public DateTime? CompletedAt { get; set; }

  [JsonPropertyName("status")]
  public string Status { get; set; } = String.Empty;
}
