using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pruebatecnica.Models;
using Microsoft.AspNetCore.Authorization;


namespace Pruebatecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampoesController : ControllerBase
    {
        private readonly prueba_tecnicaContext _context;

        public CampoesController(prueba_tecnicaContext context)
        {
            _context = context;
        }

        // GET: api/Campoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Campo>>> GetCampos()
        {
          if (_context.Campos == null)
          {
              return NotFound();
          }
            return await _context.Campos.ToListAsync();
        }

        // GET: api/Campoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Campo>> GetCampo(int id)
        {
          if (_context.Campos == null)
          {
              return NotFound();
          }
            var campo = await _context.Campos.FindAsync(id);

            if (campo == null)
            {
                return NotFound();
            }

            return campo;
        }

        // PUT: api/Campoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampo(int id, Campo campo)
        {
            if (id != campo.Id)
            {
                return BadRequest();
            }

            _context.Entry(campo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampoExists(id))
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

        // POST: api/Campoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Campo>> PostCampo(Campo campo)
        {
          if (_context.Campos == null)
          {
              return Problem("Entity set 'prueba_tecnicaContext.Campos'  is null.");
          }
            _context.Campos.Add(campo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CampoExists(campo.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCampo", new { id = campo.Id }, campo);
        }

        // DELETE: api/Campoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampo(int id)
        {
            if (_context.Campos == null)
            {
                return NotFound();
            }
            var campo = await _context.Campos.FindAsync(id);
            if (campo == null)
            {
                return NotFound();
            }

            _context.Campos.Remove(campo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Campoes/DeleteByLinkFormulario/{linkFormulario}
        [HttpDelete("deleteCampoes/{linkFormulario}")]
        public async Task<IActionResult> DeleteCamposByLinkFormulario(string linkFormulario)
        {
            if (_context.Campos == null)
            {
                return NotFound();
            }

            var campos = await _context.Campos
                .Where(c => c.LinkFormulario == linkFormulario)
                .ToListAsync();

            if (campos == null || campos.Count == 0)
            {
                return NotFound();
            }

            _context.Campos.RemoveRange(campos);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool CampoExists(int id)
        {
            return (_context.Campos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
