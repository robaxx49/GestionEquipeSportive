using Microsoft.AspNetCore.Mvc;
using GES_DAL.BackendProject;
using GES_DAL.DbContexts;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipeJoueurEvenementController : ControllerBase
    {
        private Equipe_sportiveContext m_contexte;

        public EquipeJoueurEvenementController(Equipe_sportiveContext contexte)
        {
            if (contexte is null)
            {
                throw new ArgumentNullException(nameof(contexte));
            }

            this.m_contexte = contexte;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult Get(Guid id, [FromQuery] Guid idEvenement)
        {
            Utilisateur? user = new();
            try
            {
                user = this.m_contexte.Utilisateurs.Where(user => user.IdUtilisateur == id).FirstOrDefault();
                if (user is null) return BadRequest();
            }
            catch (Exception) { throw new NotImplementedException(); }

            //trouver toutes les equipes de mon user
            List<EquipeJoueur> equipesDuUser = this.m_contexte.EquipeJoueurs.Where(eq => eq.Fk_Id_Utilisateur == id).ToList();

            if (equipesDuUser.Count == 0) return BadRequest();

            List<Guid?> guidsEquipes = new List<Guid?>();

            foreach (EquipeJoueur eq in equipesDuUser)
            {
                guidsEquipes.Add(eq.Fk_Id_Equipe);
            }

            //trouve l'equipe qui a l'evenement parmis les equipes du user
            EquipeEvenement? equipesEvenement = this.m_contexte.EquipeEvenements
                                                .Where(ee => ee.Fk_Id_Evenement == idEvenement && guidsEquipes
                                                .Contains(ee.Fk_Id_Equipe))
                                                .FirstOrDefault();

            //Lister tous les
            List<EquipeJoueur> equipeJoueurs = this.m_contexte.EquipeJoueurs.Where(eq => eq.Fk_Id_Equipe == equipesEvenement!.Fk_Id_Equipe).ToList();

            if (equipeJoueurs.Count == 0)
            {
                return BadRequest();
            }
            List<Utilisateur> utilisateurs = new();

            foreach (EquipeJoueur eq in equipeJoueurs)
            {
                //Liste les utilisateur qui sont dans l'equipe
                utilisateurs.Add(this.m_contexte.Utilisateurs.Where(u => u.IdUtilisateur == eq.Fk_Id_Utilisateur).FirstOrDefault()!);
            }

            if (utilisateurs.Count == 0)
            {
                return BadRequest();
            }

            return Ok(utilisateurs);
        }
    }
}
