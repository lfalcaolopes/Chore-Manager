using Application.DTOs.Chores;
using Application.Services.Chores;
using AutoMapper;
using Domain.Entites;
using Domain.Enums;
using Domain.Repositories;
using FluentAssertions;
using FluentValidation;
using Moq;
using Presentation.Utils.Exceptions;
using System.Net;

namespace Application.Tests;

public class ChoreServiceTests
{
  private readonly Mock<IChoreRepository> _repositoryMock;
  private readonly Mock<IMapper> _mapperMock;
  private readonly ChoreService _service;

  public ChoreServiceTests()
  {
    _repositoryMock = new Mock<IChoreRepository>();
    _mapperMock = new Mock<IMapper>();
    _service = new ChoreService(_repositoryMock.Object, _mapperMock.Object);
  }

  [Fact]
  public async Task GetAllAsync_ShouldReturnMappedChores()
  {
    // Arrange
    var chores = new List<Chore> { new Chore { Id = 1, Title = "Test Chore" } };
    var choreDtos = new List<ChoreReadDto> { new ChoreReadDto { Id = 1, Title = "Test Chore" } };

    _repositoryMock.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>())).ReturnsAsync(chores);
    _mapperMock.Setup(m => m.Map<IEnumerable<ChoreReadDto>>(chores)).Returns(choreDtos);

    // Act
    var result = await _service.GetAllAsync(CancellationToken.None);

    // Assert
    result.Should().BeEquivalentTo(choreDtos);
  }

  [Fact]
  public async Task GetByIdAsync_ShouldReturnMappedChore_WhenChoreExists()
  {
    // Arrange
    var chore = new Chore { Id = 1, Title = "Test Chore" };
    var choreDto = new ChoreReadDto { Id = 1, Title = "Test Chore" };

    _repositoryMock.Setup(r => r.GetByIdAsync(1, It.IsAny<CancellationToken>())).ReturnsAsync(chore);
    _mapperMock.Setup(m => m.Map<ChoreReadDto>(chore)).Returns(choreDto);

    // Act
    var result = await _service.GetByIdAsync(1, CancellationToken.None);

    // Assert
    result.Should().BeEquivalentTo(choreDto);
  }

  [Fact]
  public async Task GetByIdAsync_ShouldThrowApplicationProblemException_WhenChoreDoesNotExist()
  {
    // Arrange
    _repositoryMock.Setup(r => r.GetByIdAsync(1, It.IsAny<CancellationToken>())).ReturnsAsync((Chore)null);

    // Act
    var act = async () => await _service.GetByIdAsync(1, CancellationToken.None);

    // Assert
    var exception = await act.Should().ThrowAsync<ApplicationProblemException>();
    exception.Which.ProblemDetails.Detail.Should().Be("Não foi possível encontrar nenhuma tarefa com o ID 1");
  }

  [Fact]
  public async Task AddAsync_ShouldAddChore_WhenValid()
  {
    // Arrange
    var choreDto = new ChoreCreateDto { Title = "Test Chore", Status = ChoreStatus.Pending };
    var chore = new Chore { Id = 1, Title = "Test Chore", Status = ChoreStatus.Pending };

    _mapperMock.Setup(m => m.Map<Chore>(choreDto)).Returns(chore);

    // Act
    await _service.AddAsync(choreDto, CancellationToken.None);

    // Assert
    _repositoryMock.Verify(r => r.AddAsync(chore, It.IsAny<CancellationToken>()), Times.Once);
    _repositoryMock.Verify(r => r.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
  }

  [Fact]
  public async Task UpdateAsync_ShouldUpdateChore_WhenValid()
  {
    // Arrange
    var choreDto = new ChoreUpdateDto { Title = "Updated Chore", Status = ChoreStatus.Completed };
    var existingChore = new Chore { Id = 1, Title = "Test Chore", Status = ChoreStatus.Pending };

    _repositoryMock.Setup(r => r.GetByIdAsync(1, It.IsAny<CancellationToken>())).ReturnsAsync(existingChore);

    // Act
    var result = await _service.UpdateAsync(1, choreDto, CancellationToken.None);

    // Assert
    result.Should().BeTrue();
    _repositoryMock.Verify(r => r.UpdateAsync(existingChore), Times.Once);
    _repositoryMock.Verify(r => r.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
  }

  [Fact]
  public async Task UpdateAsync_ShouldThrowApplicationProblemException_WhenChoreDoesNotExist()
  {
    // Arrange
    var choreDto = new ChoreUpdateDto { Title = "Updated Chore", Status = ChoreStatus.Completed };

    _repositoryMock.Setup(r => r.GetByIdAsync(1, It.IsAny<CancellationToken>())).ReturnsAsync((Chore)null);

    // Act
    var act = async () => await _service.UpdateAsync(1, choreDto, CancellationToken.None);

    // Assert
    var exception = await act.Should().ThrowAsync<ApplicationProblemException>();
    exception.Which.ProblemDetails.Detail.Should().Be("Não foi possível encontrar nenhuma tarefa com o ID 1");
  }

  [Fact]
  public async Task DeleteAsync_ShouldDeleteChore_WhenChoreExists()
  {
    // Arrange
    var existingChore = new Chore { Id = 1, Title = "Test Chore" };

    _repositoryMock.Setup(r => r.GetByIdAsync(1, It.IsAny<CancellationToken>())).ReturnsAsync(existingChore);

    // Act
    var result = await _service.DeleteAsync(1, CancellationToken.None);

    // Assert
    result.Should().BeTrue();
    _repositoryMock.Verify(r => r.DeleteAsync(existingChore), Times.Once);
    _repositoryMock.Verify(r => r.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
  }

  [Fact]
  public async Task DeleteAsync_ShouldThrowApplicationProblemException_WhenChoreDoesNotExist()
  {
    // Arrange
    _repositoryMock.Setup(r => r.GetByIdAsync(1, It.IsAny<CancellationToken>())).ReturnsAsync((Chore)null);

    // Act
    var act = async () => await _service.DeleteAsync(1, CancellationToken.None);

    // Assert
    var exception = await act.Should().ThrowAsync<ApplicationProblemException>();
    exception.Which.ProblemDetails.Detail.Should().Be("Não foi possível encontrar nenhuma tarefa com o ID 1");
  }
}