using Application.DTOs.Chores;
using AutoMapper;
using Domain.Entites;

namespace Application.Mapper;

public class ChoreProfile : Profile
{
  public ChoreProfile()
  {
    CreateMap<Chore, ChoreReadDto>();

    CreateMap<ChoreCreateDto, Chore>()
      .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
      .ForMember(dest => dest.CompletedAt, opt => opt.Ignore());

    CreateMap<ChoreUpdateDto, Chore>()
      .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
      .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
  }
}
