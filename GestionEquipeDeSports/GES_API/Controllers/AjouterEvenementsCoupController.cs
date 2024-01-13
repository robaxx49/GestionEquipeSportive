using GES_API.Models;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GES_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AjouterEvenementsCoupController : ControllerBase
    {
        private ManipulationDepotEvenement m_manipulationDepotEvenement;
        public AjouterEvenementsCoupController(ManipulationDepotEvenement p_manipulationDepotEvenement)
        {
            this.m_manipulationDepotEvenement = p_manipulationDepotEvenement;
        }

        // POST api/<AjouterEvenementsCoupController>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult Post([FromBody] EvenementModel[] p_listeEvenements)
        {
            if (p_listeEvenements == null)
            {
                throw new ArgumentNullException(nameof(p_listeEvenements));
            }
            foreach (var ev in p_listeEvenements)
            {
                ev.Id = Guid.NewGuid();
                GES_Services.Entites.Evenement evenem = ev.DeModelVersEntite();
                this.m_manipulationDepotEvenement.AjouterEvenement(evenem);
            }
            return Ok(p_listeEvenements);
        }
    }
}
