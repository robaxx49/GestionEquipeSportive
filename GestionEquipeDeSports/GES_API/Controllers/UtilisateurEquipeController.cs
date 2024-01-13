using GES_API.Models;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilisateurEquipeController : ControllerBase
    {
        private ManipulationDepotUtilisateurEquipe m_manipulationDepotUtilisateurEquipe;
        public UtilisateurEquipeController(ManipulationDepotUtilisateurEquipe p_manipulationDepotUtilisateurEquipe)
        {
            this.m_manipulationDepotUtilisateurEquipe = p_manipulationDepotUtilisateurEquipe;
        }

        //GET: api/<EquipeJoueurController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<EquipeModel>> Get(Guid id)
        {
            IEnumerable<EquipeModel> listeEquipes;
            try
            {
                listeEquipes = this.m_manipulationDepotUtilisateurEquipe.ListerEquipesPourUtilisateur(id).Select(e => new EquipeModel(e));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            if (listeEquipes != null)
            {
                return Ok(listeEquipes);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
