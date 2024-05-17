    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Pruebatecnica.Models;

    namespace Pruebatecnica.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        [Authorize]

        public class FormulariosController : ControllerBase
        {
            private readonly prueba_tecnicaContext _context;

            public FormulariosController(prueba_tecnicaContext context)
            {
                _context = context;
            }

            // GET: api/Formularios
            [HttpGet]
        [AllowAnonymous
            ]
            public async Task<ActionResult<IEnumerable<Formulario>>> GetFormularios()
            {
              if (_context.Formularios == null)
              {
                  return NotFound();
              }
                return await _context.Formularios.ToListAsync();
            }

            // GET: api/Formularios/5
            [HttpGet("{id}")]
        [AllowAnonymous
            ]
        public async Task<ActionResult<Formulario>> GetFormulario(string id)
            {
              if (_context.Formularios == null)
              {
                  return NotFound();
              }
                var formulario = await _context.Formularios.FindAsync(id);

                if (formulario == null)
                {
                    return NotFound();
                }

                return formulario;
            }

            // PUT: api/Formularios/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut("{id}")]
            public async Task<IActionResult> PutFormulario(string id, Formulario formulario)
            {
                if (id != formulario.LinkFormulario)
                {
                    return BadRequest();
                }

                _context.Entry(formulario).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FormularioExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // POST: api/Formularios
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
            public async Task<ActionResult<Formulario>> PostFormulario(Formulario formulario)
            {
                if (_context.Formularios == null)
                {
                    return Problem("Entity set 'prueba_tecnicaContext.Formularios' is null.");
                }

                // Generar el enlace único utilizando un GUID
                var uniqueLink = Guid.NewGuid().ToString();

                // Asignar el enlace único al formulario
                formulario.LinkFormulario = uniqueLink;

                _context.Formularios.Add(formulario);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (FormularioExists(formulario.LinkFormulario))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }

                // Retornar una respuesta CreatedAtAction con el enlace generado
                return CreatedAtAction(nameof(GetFormulario), new { id = formulario.LinkFormulario }, formulario);
            }


  

            // DELETE: api/Formularios/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteFormulario(string id)
            {
                if (_context.Formularios == null)
                {
                    return NotFound();
                }
                var formulario = await _context.Formularios.FindAsync(id);
                if (formulario == null)
                {
                    return NotFound();
                }

                _context.Formularios.Remove(formulario);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            private bool FormularioExists(string id)
            {
                return (_context.Formularios?.Any(e => e.LinkFormulario == id)).GetValueOrDefault();
            }
        }
    }
