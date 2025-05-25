using System.Text.Json.Serialization;
using Domain.Utils;

namespace Domain.Enums;

[JsonConverter(typeof(ChoreStatusJsonConverter))]
public enum ChoreStatus
{
  Pending,
  InProgress,
  Completed
}
