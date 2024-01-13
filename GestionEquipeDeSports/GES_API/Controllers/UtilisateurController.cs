using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;
using GES_API.Models;
using GES_Services.Entites;
using Microsoft.AspNetCore.Authorization;
using GES_DAL.DbContexts;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UtilisateurController : ControllerBase
    {
        private Equipe_sportiveContext m_context;
        private ManipulationDepotUtilisateur m_manipulationDepotUtilisateur;
        public UtilisateurController(ManipulationDepotUtilisateur p_manipulationDepotUtilisateur, Equipe_sportiveContext p_context)
        {
            if (p_context == null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            if (p_manipulationDepotUtilisateur == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotUtilisateur));
            }
            this.m_manipulationDepotUtilisateur = p_manipulationDepotUtilisateur;
            this.m_context = p_context;
        }

        //Get: api/<UtilisateurController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<UtilisateurModel>> Get()
        {
            List<UtilisateurModel>? utilisateurModels = null;
            // transfer each item from this this.m_manipulationDepotUtilisateur.ListerUtilisateurs() to the list of models
            utilisateurModels = this.m_manipulationDepotUtilisateur.ListerUtilisateurs()
                ?.Select(utilisateur => new UtilisateurModel(utilisateur)).ToList();

            return Ok(utilisateurModels);
        }

        //Get: api/<EquipeController>/5
        /*[HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<UtilisateurModel> Get(Guid id)
        {
            UtilisateurModel model = new UtilisateurModel(this.m_manipulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (model != null)
            {
                return Ok(model);
            }
            else
            {
                return NotFound();
            }
        }
        */

        //Get: api/<UtilisateurController>/5
        [HttpGet("{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult<UtilisateurModel> Get(string email)
        {
            if (email == null)
            {
                return BadRequest();
            }
            GES_DAL.BackendProject.Utilisateur? utilisateur = this.m_context?.Utilisateurs.Where(user => user.Email == email).FirstOrDefault();

            if (utilisateur is null)
            {
                return NotFound();
            }
            else
            {
                UtilisateurModel utilisateurModel = new UtilisateurModel(utilisateur.DeDTOVersEntite());

                return Ok(utilisateur);
            }
        }

        // POST api/<UtilisateurController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] UtilisateurModel p_utilisateurModel)
        {
            UtilisateurModel utilisateurModel = new();

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (p_utilisateurModel == null)
            {
                throw new ArgumentNullException(nameof(p_utilisateurModel));
            }

            try
            {
                p_utilisateurModel.IdUtilisateur = Guid.NewGuid();
                p_utilisateurModel.Roles = EnumTypeRole.Athlete;
                p_utilisateurModel.Etat = true;

                this.m_manipulationDepotUtilisateur.AjouterUtilisateur(p_utilisateurModel.DeModelVersEntite());

                utilisateurModel = new UtilisateurModel(this.m_manipulationDepotUtilisateur.ChercherUtilisateurParId(p_utilisateurModel.IdUtilisateur));
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { message = ex.Message });
            }

            return CreatedAtAction(nameof(Get), new { id = utilisateurModel.IdUtilisateur }, utilisateurModel);
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

            UtilisateurModel utilisateurModel = new UtilisateurModel(this.m_manipulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }

            this.m_manipulationDepotUtilisateur.ModifierUtilisateur(p_utilisateurModel.DeModelVersEntite(), id);

            return NoContent();
        }

        // DELETE api/<EntraineurController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete(Guid id)
        {
            UtilisateurModel utilisateurModel = new UtilisateurModel(this.m_manipulationDepotUtilisateur.ChercherUtilisateurParId(id));
            if (utilisateurModel is null)
            {
                return NotFound();
            }

            this.m_manipulationDepotUtilisateur.SupprimerUtilisateur(utilisateurModel.DeModelVersEntite());

            return NoContent();
        }
    }
}
