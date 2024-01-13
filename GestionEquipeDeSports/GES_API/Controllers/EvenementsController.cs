using Microsoft.AspNetCore.Mvc;
using GES_Services.Manipulations;
using GES_API.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EvenementsController : ControllerBase
    {
        private ManipulationDepotEvenement m_maniulationDepotEvenement;
        public EvenementsController(ManipulationDepotEvenement p_maniulationDepotEvenement)
        {
            this.m_maniulationDepotEvenement = p_maniulationDepotEvenement;
        }

        // GET: api/evenements
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<EvenementModel>> Get()
        {
            List<EvenementModel> evenements = new List<EvenementModel>();

            foreach (var evenement in this.m_maniulationDepotEvenement.ListerEvenements())
            {
                evenements.Add(new EvenementModel(evenement));
            }

            return Ok(evenements);
        }

        // GET api/<EvenementController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<EvenementModel> Get(Guid id)
        {
            EvenementModel evenementModel = new EvenementModel(this.m_maniulationDepotEvenement.ChercherEvenementParId(id));

            evenementModel = evenementModel.ModifierDateFinEnDuree(evenementModel);

            if (evenementModel != null)
            {
                return Ok(evenementModel);
            }
            return NotFound();
        }

        // POST api/<EvenementController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] EvenementModel p_evenementModel)
        {
            if (p_evenementModel == null)
            {
                throw new ArgumentNullException(nameof(p_evenementModel));
            }

            p_evenementModel.Id = Guid.NewGuid();
            Guid guid = p_evenementModel.Id;

            GES_Services.Entites.Evenement evenem = p_evenementModel.DeModelVersEntite();
            this.m_maniulationDepotEvenement.AjouterEvenement(evenem);
            return Ok(guid);
        }

        // PUT api/<EvenementController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult Put(Guid id, [FromBody] EvenementModel p_evenementModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //if (p)
            EvenementModel model = new EvenementModel(m_maniulationDepotEvenement.ChercherEvenementParId(id));
            if (model is null)
            {
                return NotFound();
            }
            m_maniulationDepotEvenement.ModifierEvenement(p_evenementModel.DeModelVersEntite());
            return NoContent();
        }

        // DELETE api/<EvenementController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete(Guid id)
        {
            EvenementModel model = new EvenementModel(m_maniulationDepotEvenement.ChercherEvenementParId(id));
            if (model is null)
            {
                return NotFound();
            }

            m_maniulationDepotEvenement.SupprimerEvenement(model.DeModelVersEntite());
            return NoContent();
        }
    }
}
