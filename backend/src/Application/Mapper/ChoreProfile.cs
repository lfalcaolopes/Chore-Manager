using Application.DTOs.Chores;
using AutoMapper;
using Domain.Entites;
using Domain.Enums;
using Domain.Utils;

namespace Application.Mapper;

public class ChoreProfile : Profile
{
  public ChoreProfile()
  {
    CreateMap<Chore, ChoreReadDto>()
      .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToPortuguese()));

    CreateMap<ChoreCreateDto, Chore>()
      .ForMember(dest => dest.Status, opt =>
        opt.MapFrom(src => !string.IsNullOrEmpty(src.Status)
          ? ChoreStatusExtension.FromPortuguese(src.Status)
          : ChoreStatus.Pending))
      .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
      .ForMember(dest => dest.CompletedAt, opt => opt.Ignore());

    CreateMap<ChoreUpdateDto, Chore>()
      .ForMember(dest => dest.Status, opt =>
        opt.MapFrom(src => !string.IsNullOrEmpty(src.Status)
          ? ChoreStatusExtension.FromPortuguese(src.Status)
          : (ChoreStatus?)null))
      .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
      .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
  }
}
