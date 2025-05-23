namespace Application.Validators.Chore;

using Application.DTOs.Chore;
using FluentValidation;

public class ChoreUpdateDtoValidator : AbstractValidator<ChoreUpdateDto>
{
  public ChoreUpdateDtoValidator()
  {
    RuleFor(x => x.Title)
        .NotEmpty().WithMessage("O campo 'titulo' é obrigatório.")
        .MaximumLength(100).WithMessage("O título deve ter no máximo 100 caracteres.");

    RuleFor(x => x.Description)
        .MaximumLength(500).WithMessage("A descrição deve ter no máximo 500 caracteres.")
        .When(x => !string.IsNullOrWhiteSpace(x.Description));

    RuleFor(x => x.CompletedAt)
        .GreaterThan(DateTime.Now).WithMessage("A data de conclusão deve ser futura.")
        .When(x => x.CompletedAt.HasValue);

    RuleFor(x => x.Status)
        .Must(BeAValidStatus).WithMessage("Status inválido. Use: 'Pendente', 'EmProgresso' ou 'Concluída'.");
  }

  private bool BeAValidStatus(string status)
  {
    var accepted = new[] { "Pendente", "EmProgresso", "Concluída" };
    return accepted.Contains(status.Trim(), StringComparer.OrdinalIgnoreCase);
  }
}
