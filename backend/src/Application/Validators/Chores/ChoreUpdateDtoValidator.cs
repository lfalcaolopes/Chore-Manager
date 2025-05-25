namespace Application.Validators.Chores;

using Application.DTOs.Chores;
using Domain.Enums;
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

    RuleFor(x => x.Status)
      .NotNull().WithMessage("O campo 'status' é obrigatório.")
      .IsInEnum().WithMessage("O status deve ser um valor válido.");

    RuleFor(x => new { x.Status, x.CompletedAt })
      .Must(x => x.Status == ChoreStatus.Completed || x.CompletedAt == null)
      .WithMessage("O campo 'dataDeConclusao' só deve ser preenchido quando o status for 'Concluído'.");
  }
}
