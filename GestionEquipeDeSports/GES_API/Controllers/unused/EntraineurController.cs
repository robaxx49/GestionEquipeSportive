using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GES_Services.Entites;
using GES_Services.Manipulations;
using GES_API.Models;


namespace GES_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class EntraineurController : ControllerBase
    {
        private ManipulationDepotUtilisateur m_maniulationDepotUtilisateur;
        public EntraineurController(ManipulationDepotUtilisateur p_maniulationDepotUtilisateur)
        {
            this.m_maniulationDepotUtilisateur = p_maniulationDepotUtilisateur;
        }

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

            p_utilisateurModel.Roles = EnumTypeRole.Entraineur;

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
            //if (p)
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
