using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GES_Services.Entites;
using GES_Services.Manipulations;
using GES_API.Models;
using Microsoft.AspNetCore.Authorization;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TuteurController : ControllerBase
    {
        private ManipulationDepotUtilisateur m_maniulationDepotUtilisateur;
        public TuteurController(ManipulationDepotUtilisateur p_maniulationDepotUtilisateur)
        {
            this.m_maniulationDepotUtilisateur = p_maniulationDepotUtilisateur;
        }

        // GET: api/<TuteurController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<TuteurController>/5
        // GET api/<EntraineurController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<UtilisateurModel> Get(Guid id)
        {
            UtilisateurModel utilisateurModel = new UtilisateurModel(this.m_maniulationDepotUtilisateur.ChercherUtilisateurParId(id));

            if (utilisateurModel != null)
            {
                return utilisateurModel;
            }

            return NotFound();
        }

        // POST api/<EntraineurController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] UtilisateurModel p_utilisateurModel)
        {

            if (p_utilisateurModel == null)
            {
                throw new ArgumentNullException(nameof(p_utilisateurModel));
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            p_utilisateurModel.Roles = EnumTypeRole.Tuteur;

            this.m_maniulationDepotUtilisateur.AjouterUtilisateur(p_utilisateurModel.DeModelVersEntite());

            return CreatedAtAction(nameof(Get), new { id = p_utilisateurModel.IdUtilisateur }, p_utilisateurModel.DeModelVersEntite());
        }

        // PUT api/<EntraineurController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult Put(Guid id, [FromBody] UtilisateurModel p_utilisateurModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            UtilisateurModel utilisateurModel = new UtilisateurModel(m_maniulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }
            m_maniulationDepotUtilisateur.ModifierUtilisateur(p_utilisateurModel.DeModelVersEntite(), id);

            return NoContent();
        }

        // DELETE api/<EntraineurController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete(Guid id)
        {
            UtilisateurModel utilisateurModel = new UtilisateurModel(m_maniulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }

            m_maniulationDepotUtilisateur.SupprimerUtilisateur(utilisateurModel.DeModelVersEntite());

            return NoContent();
        }
    }
}
