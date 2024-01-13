using Microsoft.AspNetCore.Mvc;
using GES_Services.Manipulations;
using GES_API.Models;
using Microsoft.AspNetCore.Authorization;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EquipeController : ControllerBase
    {
        private ManipulationDepotEquipe m_manipulationDepotEquipe;
        private ManipulationDepotUtilisateurEquipeRole m_manipulationUtilisateurEquipeRole;
        private ManipulationDepotEquipeJoueur m_manipulationDepotEquipeJoueur;

        public EquipeController(ManipulationDepotEquipe p_manipulationDepotEquipe,
                                ManipulationDepotUtilisateurEquipeRole manipulationUtilisateurEquipeRole,
                                ManipulationDepotEquipeJoueur manipulationDepotEquipeJoueur)
        {
            if (p_manipulationDepotEquipe == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEquipe));
            }
            if (manipulationUtilisateurEquipeRole == null)
            {
                throw new ArgumentNullException(nameof(manipulationUtilisateurEquipeRole));
            }
            if (manipulationDepotEquipeJoueur is null)
            {
                throw new ArgumentNullException(nameof(manipulationDepotEquipeJoueur));
            }

            this.m_manipulationDepotEquipe = p_manipulationDepotEquipe;
            this.m_manipulationUtilisateurEquipeRole = manipulationUtilisateurEquipeRole;
            this.m_manipulationDepotEquipeJoueur = manipulationDepotEquipeJoueur;
        }

        //GET: api/<EquipeController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<EquipeModel>> Get()
        {
            return Ok(this.m_manipulationDepotEquipe.ListerEquipes());
        }

        //Get: api/<EquipeController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<EquipeModel> Get(Guid id)
        {
            EquipeModel model = new EquipeModel(this.m_manipulationDepotEquipe.ChercherEquipeParId(id));
            if (model != null)
            {
                return Ok(model);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<EquipeController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] EquipeModel p_equipeModel, [FromQuery] Guid idUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (p_equipeModel is null)
            {
                return BadRequest();
            }

            try
            {
                p_equipeModel.IdEquipe = Guid.NewGuid();

                //Ajout de lequipe dans la table equipe
                this.m_manipulationDepotEquipe.AjouterEquipe(p_equipeModel.DeModelVersEntite());

                //Ajout de lutilisateur dans la table utilisateurEquipeRole en tant qu'entraineur
                UtilisateurEquipeRoleModel utilisateurEquipeRoleModelEnt = new UtilisateurEquipeRoleModel()
                {
                    IdUtilisateurEquipeRole = Guid.NewGuid(),
                    FkIdUtilisateur = idUser,
                    FkIdEquipe = p_equipeModel.IdEquipe,
                    FkIdRole = 1,
                    DescriptionRole = "Createur"
                };
                this.m_manipulationUtilisateurEquipeRole.AjouterUtilisateurEquipeRole(utilisateurEquipeRoleModelEnt.DeModelVersEntite());

                //ajout de lutilisateur dans la table equipeJoueur
                EquipeJoueurModel equipeJoueurModel = new EquipeJoueurModel()
                {
                    IdJoueurEquipe = Guid.NewGuid(),
                    Fk_Id_Equipe = p_equipeModel.IdEquipe,
                    Fk_Id_Utilisateur = idUser
                };
                this.m_manipulationDepotEquipeJoueur.AjouterEquipeJoueur(equipeJoueurModel.DeModelVersEntite());
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }

        // PUT api/<EquipeController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult Put(Guid id, [FromBody] EquipeModel p_equipeModel)
        {
            if (!ModelState.IsValid || p_equipeModel.IdEquipe != id)
            {
                return BadRequest();
            }

            EquipeModel equipeModel = new EquipeModel(this.m_manipulationDepotEquipe.ChercherEquipeParId(id));

            if (equipeModel is null)
            {
                return NotFound();
            }

            this.m_manipulationDepotEquipe.ModifierEquipe(p_equipeModel.DeModelVersEntite());

            return NoContent();
        }

        // DELETE api/<EquipeController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete(Guid id)
        {
            EquipeModel equipeModel = new EquipeModel(this.m_manipulationDepotEquipe.ChercherEquipeParId(id));

            if (equipeModel is null)
            {
                return NotFound();
            }

            this.m_manipulationDepotEquipe.SupprimerEquipe(equipeModel.DeModelVersEntite());

            return NoContent();
        }
    }
}
