namespace Application.Validators.Chores;

using Application.DTOs.Chores;
using Domain.Enums;
using Domain.Utils;
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

  }
}
