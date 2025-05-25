using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Domain.Utils;

public class ChoreStatusJsonConverter : JsonConverter<ChoreStatus>
{
  public override ChoreStatus Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    var value = reader.GetString();
    return value?.ToLower() switch
    {
      "pendente" => ChoreStatus.Pending,
      "emprogresso" => ChoreStatus.InProgress,
      "concluida" => ChoreStatus.Completed,
      _ => throw new JsonException($"Valor inválido para Status: {value}")
    };
  }

  public override void Write(Utf8JsonWriter writer, ChoreStatus value, JsonSerializerOptions options)
  {
    var str = value switch
    {
      ChoreStatus.Pending => "Pendente",
      ChoreStatus.InProgress => "Em Progresso",
      ChoreStatus.Completed => "Concluida",
      _ => throw new JsonException($"Valor inválido para Status: {value}")
    };
    writer.WriteStringValue(str);
  }
}