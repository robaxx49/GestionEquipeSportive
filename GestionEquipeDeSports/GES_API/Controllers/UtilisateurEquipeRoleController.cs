using Microsoft.AspNetCore.Mvc;
using GES_Services.Manipulations;
using GES_API.Models;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UtilisateurEquipeRoleController : ControllerBase
    {
        private ManipulationDepotUtilisateurEquipeRole m_manipulationUtilisateurEquipeRole;

        public UtilisateurEquipeRoleController(ManipulationDepotUtilisateurEquipeRole manipulationUtilisateurEquipeRole)
        {
            if (manipulationUtilisateurEquipeRole is null)
            {
                throw new ArgumentNullException(nameof(manipulationUtilisateurEquipeRole));
            }
            m_manipulationUtilisateurEquipeRole = manipulationUtilisateurEquipeRole;
        }

        //GET: api/<UtilisateurEquipeRoleController>/{email}
        [HttpGet("{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<List<UtilisateurEquipeRoleModel>> Get(string email)
        {
            List<UtilisateurEquipeRoleModel> utilisateurEquipeRoleModels = new List<UtilisateurEquipeRoleModel>();

            Guid guid_user = this.m_manipulationUtilisateurEquipeRole.ChercherUtilisateurParEmail(email);

            foreach (var item in this.m_manipulationUtilisateurEquipeRole.ChercherUtilisateurEquipeRoleParId(guid_user))
            {
                utilisateurEquipeRoleModels.Add(new UtilisateurEquipeRoleModel(item));
            }

            if (utilisateurEquipeRoleModels != null)
            {
                return Ok(utilisateurEquipeRoleModels);
            }
            else return NotFound();
        }

        // PUT api/<UtilisateurEquipeRoleController>
        [HttpPut]
        [ProducesResponseType(203)]
        [ProducesResponseType(400)]
        public ActionResult Put([FromBody] UtilisateurEquipeRoleModel p_utilisateurEquipeRoleModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (p_utilisateurEquipeRoleModel == null)
            {
                throw new ArgumentNullException(nameof(p_utilisateurEquipeRoleModel));
            }

            try
            {                
                this.m_manipulationUtilisateurEquipeRole.ModifierUtilisateurEquipeRole(p_utilisateurEquipeRoleModel.DeModelVersEntite());
            }
            catch (Exception ex) { return BadRequest(ex.Message); }

            return Ok();
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] UtilisateurEquipeRoleModel p_utilisateurEquipeRoleModel)
        {
            if (!ModelState.IsValid) return BadRequest();
            if (p_utilisateurEquipeRoleModel == null)
            {
                throw new ArgumentNullException(nameof(p_utilisateurEquipeRoleModel));
            }

            try
            {
                UtilisateurEquipeRoleModel utilisateurEquipeRoleModelEnt = new UtilisateurEquipeRoleModel()
                {
                    IdUtilisateurEquipeRole = Guid.NewGuid(),
                    FkIdUtilisateur = p_utilisateurEquipeRoleModel.FkIdUtilisateur,
                    FkIdEquipe = p_utilisateurEquipeRoleModel.FkIdEquipe,
                    FkIdRole = p_utilisateurEquipeRoleModel.FkIdRole,
                    DescriptionRole = p_utilisateurEquipeRoleModel.DescriptionRole
                };
                this.m_manipulationUtilisateurEquipeRole.AjouterUtilisateurEquipeRole(utilisateurEquipeRoleModelEnt.DeModelVersEntite());
            }

            catch (Exception ex) { return BadRequest(ex.Message); }

            return Ok();
        }
    }
}
