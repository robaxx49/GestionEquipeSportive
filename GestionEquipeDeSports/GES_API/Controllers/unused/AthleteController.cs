using Microsoft.AspNetCore.Mvc;
using GES_API.Models;
using GES_Services.Manipulations;
using GES_Services.Entites;
using Microsoft.AspNetCore.Authorization;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GES_API.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/[controller]")]
    public class AthleteController : ControllerBase
    {
        private ManipulationDepotUtilisateur m_maniulationDepotUtilisateur;
        public AthleteController(ManipulationDepotUtilisateur p_maniulationDepotUtilisateur)
        {
            this.m_maniulationDepotUtilisateur = p_maniulationDepotUtilisateur;
        }

        // GET api/<JoueurController>/5
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

        // POST api/<JoueurController>
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
                return BadRequest("model non valide");
            }

            p_utilisateurModel.Etat = true;

            p_utilisateurModel.Roles = EnumTypeRole.Athlete;

            this.m_maniulationDepotUtilisateur.AjouterUtilisateur(p_utilisateurModel.DeModelVersEntite());

            return CreatedAtAction(nameof(Get), new { id = p_utilisateurModel.IdUtilisateur }, p_utilisateurModel.DeModelVersEntite());
        }

        // PUT api/<JoueurController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult Put(Guid id, [FromBody] UtilisateurModel p_utilisateurModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("model non valide");
            }
            UtilisateurModel utilisateurModel = new UtilisateurModel(m_maniulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }
            m_maniulationDepotUtilisateur.ModifierUtilisateur(p_utilisateurModel.DeModelVersEntite(), id);

            return NoContent();
        }

        // DELETE api/<JoueurController>/5
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
