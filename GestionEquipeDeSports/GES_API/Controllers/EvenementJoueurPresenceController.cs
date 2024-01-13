using Microsoft.AspNetCore.Mvc;
using GES_DAL.BackendProject;
using GES_DAL.DbContexts;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvenementJoueurPresenceController : ControllerBase
    {
        private Equipe_sportiveContext m_context;

        public EvenementJoueurPresenceController(Equipe_sportiveContext context)
        {
            m_context = context;
        }

        //GET: api/<EvenementJoueurPresenceController>/id
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<bool> Get(Guid id, [FromQuery] string yourParam)
        {
            if (id == Guid.Empty) return BadRequest();

            string g = yourParam;

            if (m_context.Evenements.Find(id) == null) return NotFound();

            Utilisateur? utilisateur = m_context.Utilisateurs.FirstOrDefault(u => u.Email == yourParam);

            if (utilisateur == null) return NotFound();

            //trouver la ligne ou utilisateur.id et le parametre id sont les memes dans la table EvenementJoueur
            EvenementJoueur? evenementJoueurDAL = this.m_context.EvenementJoueurs
                                                      .Where(e => e.Fk_Id_Evenement == id
                                                               && e.Fk_Id_Utilisateur == utilisateur.IdUtilisateur)
                                                      .FirstOrDefault();

            if (evenementJoueurDAL == null)
            {
                return NotFound();
            }

            return Ok(evenementJoueurDAL.EstPresentAevenement);
        }
    }
}
