using GES_API.Models;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvenementEquipeController : ControllerBase
    {
        private ManipulationDepotEvenementEquipe m_manipulationDepotEvenementEquipe;
        public EvenementEquipeController(ManipulationDepotEvenementEquipe p_manipulationDepotEvenementEquipe)
        {
            if (p_manipulationDepotEvenementEquipe == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEvenementEquipe));
            }
            this.m_manipulationDepotEvenementEquipe = p_manipulationDepotEvenementEquipe;
        }

        // GET: api/<EvenementEquipeController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult Index()
        {
            throw new NotImplementedException();
        }

        // GET: api/<EvenementEquipeController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<EquipeModel>> Get(Guid id)
        {
            IEnumerable<EquipeModel> listeEquipe;
            try
            {
                listeEquipe = this.m_manipulationDepotEvenementEquipe.ListerEvenementEquipe(id).Select(e => new EquipeModel(e));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            if (listeEquipe != null)
            {
                return Ok(listeEquipe);
            }
            else
            {
                return NotFound();
            }
        }

        // POST: api/<EvenementEquipeController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] EquipeEvenementModel p_equipeEvenement)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                throw new NotImplementedException();
            }
        }

        // POST: EvenementEquipeController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                throw new NotImplementedException();
            }
        }

        // POST: EvenementEquipeController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                throw new NotImplementedException();
            }
        }
    }
}
