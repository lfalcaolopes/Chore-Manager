using Application.DTOs.Chores;
using Application.Services.Chores;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[ApiController]
[Route("[controller]")]
public class ChoresController : ControllerBase
{
  private readonly IChoreService _service;

  public ChoresController(IChoreService choreService)
  {
    _service = choreService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<ChoreReadDto>>> GetAll(CancellationToken cancellationToken)
  {
    var chores = await _service.GetAllAsync(cancellationToken);

    return Ok(chores);
  }

  [HttpGet("{id:int}")]
  public async Task<ActionResult<ChoreReadDto>> GetById(int id, CancellationToken cancellationToken)
  {
    var chore = await _service.GetByIdAsync(id, cancellationToken);

    if (chore is null)
    {
      return NotFound();
    }

    return Ok(chore);
  }

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] ChoreCreateDto chore, CancellationToken cancellationToken)
  {
    await _service.AddAsync(chore, cancellationToken);

    return StatusCode(201);
  }

  [HttpPut("{id:int}")]
  public async Task<IActionResult> Update(int id, [FromBody] ChoreUpdateDto updatedChore, CancellationToken cancellationToken)
  {
    var result = await _service.UpdateAsync(id, updatedChore, cancellationToken);

    if (!result)
    {
      return NotFound();
    }

    return NoContent();
  }

  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
  {
    var result = await _service.DeleteAsync(id, cancellationToken);

    if (!result)
    {
      return NotFound();
    }

    return NoContent();
  }
}
