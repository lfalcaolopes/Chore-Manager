namespace Application.Validators.Chores;

using Application.DTOs.Chores;
using Domain.Enums;
using Domain.Utils;
using FluentValidation;

public class ChoreCreateDtoValidator : AbstractValidator<ChoreCreateDto>
{
  public ChoreCreateDtoValidator()
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

  private bool BeAValidStatus(string? status)
  {
    if (string.IsNullOrWhiteSpace(status))
    {
      return true; // Allow null or empty values
    }

    try
    {
      ChoreStatusExtension.FromPortuguese(status);
      return true;
    }
    catch
    {
      return false;
    }
  }
}
