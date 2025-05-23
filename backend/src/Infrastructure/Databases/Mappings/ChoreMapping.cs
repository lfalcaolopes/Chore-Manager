using Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Databases.Mappings;

public class ChoreMapping : IEntityTypeConfiguration<Chore>
{
  public void Configure(EntityTypeBuilder<Chore> builder)
  {
    builder.ToTable("Chores");

    builder.HasKey(x => x.Id);

    builder.Property(x => x.Id)
      .IsRequired()
      .ValueGeneratedOnAdd();

    builder.Property(x => x.Title)
      .IsRequired()
      .HasMaxLength(100);

    builder.Property(x => x.Description)
      .HasMaxLength(500);

    builder.Property(x => x.Status)
      .IsRequired();

    builder.Property(x => x.CreatedAt)
      .IsRequired();

    builder.Property(x => x.CompletedAt);
  }
}
