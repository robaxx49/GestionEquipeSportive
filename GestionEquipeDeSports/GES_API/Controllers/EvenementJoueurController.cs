using Microsoft.AspNetCore.Mvc;
using GES_API.Models;
using GES_Services.Manipulations;
using GES_Services.Entites;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvenementJoueurController : ControllerBase
    {
        private ManipulationDepotEvenementJoueur m_manipulationDepotEvenementJoueur;

        public EvenementJoueurController(ManipulationDepotEvenementJoueur p_manipulationDepotEvenementJoueur)
        {
            if (p_manipulationDepotEvenementJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEvenementJoueur));
            }

            this.m_manipulationDepotEvenementJoueur = p_manipulationDepotEvenementJoueur;
        }

        //GET: api/<EvenementJoueurController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<EvenementJoueurModel>> Get(Guid id)
        {
            IEnumerable<EvenementJoueurModel> listeEvenementsPourJoueur;
            try
            {
                listeEvenementsPourJoueur = this.m_manipulationDepotEvenementJoueur
                                                .ChercherEvenementParIdUtilisateur(id)
                                                .Select(e => new EvenementJoueurModel(e));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            if (listeEvenementsPourJoueur == null)
            {
                return Ok();
            }
            else
            {
                return Ok(listeEvenementsPourJoueur);
            }
        }

        //GET: api/<EvenementJoueurController>/5
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<EvenementJoueurModel> Get([FromBody] EvenementJoueurModel p_evenementJoueurModel)
        {
            if (p_evenementJoueurModel == null)
            {
                return BadRequest();
            }

            EvenementJoueurModel evemementModel = new EvenementJoueurModel(this.m_manipulationDepotEvenementJoueur.ChercherJoueurParIdEvenementIdJoueur(p_evenementJoueurModel.DeModelVersEntite()));

            if (evemementModel == null)
            {
                return NotFound();
            }

            return evemementModel;
        }


        //Put api/<EvenementJoueurController>/5
        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult Put([FromBody] EvenementJoueurModel p_evenementJoueurModel)
        {
            if (p_evenementJoueurModel == null)
            {
                return BadRequest();
            }
            try
            {
                this.m_manipulationDepotEvenementJoueur.AjouterPresencePourJoueur(p_evenementJoueurModel.DeModelVersEntite());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok();
        }

        //DELETE: api/<EvenementJoueurController
        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Delete([FromBody] EvenementJoueurModel p_evenementJoueurModel)
        {
            if (p_evenementJoueurModel == null)
            {
                throw new ArgumentNullException(nameof(p_evenementJoueurModel));
            }
            EvenementJoueur evenementJoueur = p_evenementJoueurModel.DeModelVersEntite();
            EvenementJoueurModel model = new EvenementJoueurModel(this.m_manipulationDepotEvenementJoueur.ChercherJoueurParIdEvenementIdJoueur(evenementJoueur));
            if (model == null)
            {
                return NoContent();
            }
            else
            {
                this.m_manipulationDepotEvenementJoueur.SupprimerEvenementJoueur(model.DeModelVersEntite());
                return NoContent();
            }
        }
    }
}
