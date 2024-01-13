using GES_API.Models;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Mvc;

namespace GES_API.Controllers
{
#pragma warning disable 8600, 8602, 8629
    [Route("api/[controller]")]
    [ApiController]
    public class AbonnerCalendrierController : ControllerBase
    {
        private ManipulationDepotEvenementJoueur m_manipulationDepotEvenementJoueur;
        private ManipulationDepotEvenement m_manipulationDepotEvenement;

        public AbonnerCalendrierController(ManipulationDepotEvenementJoueur p_manipulationDepotEvenementJoueur, ManipulationDepotEvenement p_manipulationDepotEvenement)
        {
            if (p_manipulationDepotEvenementJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEvenementJoueur));
            }
            if (p_manipulationDepotEvenement == null)
            {
                throw new ArgumentNullException(nameof(p_manipulationDepotEvenement));
            }
            this.m_manipulationDepotEvenementJoueur = p_manipulationDepotEvenementJoueur;
            this.m_manipulationDepotEvenement = p_manipulationDepotEvenement;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult GetFile(Guid id)
        {
            IEnumerable<EvenementJoueurModel> listeEvenements;
            listeEvenements = this.m_manipulationDepotEvenementJoueur.ChercherEvenementParIdUtilisateur(id).Select(e => new EvenementJoueurModel(e)).ToList();
            if (listeEvenements == null)
            {
                return NotFound();
            }
            else
            {
                List<EvenementModel> evenements = new List<EvenementModel>();
                foreach (var ev in listeEvenements)
                {
                    EvenementModel evenement = new EvenementModel(this.m_manipulationDepotEvenement.ChercherEvenementParId((Guid)ev.Fk_Id_Evenement!));
                    evenements.Add(evenement);
                }

                string calendrier;
                calendrier = "BEGIN:VCALENDAR\r\n";
                calendrier = calendrier + "PRODID:-GestionEquipeSportive v1.0\r\n";
                calendrier = calendrier + "VERSION:2.0\r\n";
                calendrier = calendrier + "CALSCALE:GREGORIAN\r\n";
                calendrier = calendrier + "METHOD:PUBLISH\r\n";

                DateTime date = DateTime.Now;
                string dateNowToString = date.ToString("yyyyMMddTHHmmss");

                foreach (var e in evenements)
                {
                    calendrier = calendrier + "BEGIN:VEVENT\r\n";
                    calendrier = calendrier + "DTSTAMP:" + dateNowToString + "Z\r\n";
                    calendrier = calendrier + "DTSTART:" + RetireSymbolsDeDate(e.DateDebut) + "\r\n";
                    calendrier = calendrier + "DTEND:" + RetireSymbolsDeDate(e.DateFin) + "\r\n";
                    calendrier = calendrier + "UID:" + e.Id + "@gestionequipesportive.ca" + "\r\n";
                    calendrier = calendrier + "SUMMARY:" + e.Description + "\r\n";
                    calendrier = calendrier + "LOCATION:" + e.Emplacement + "\r\n";
                    calendrier = calendrier + "END:VEVENT\r\n";
                }
                calendrier = calendrier + "END:VCALENDAR\r\n";

                return File(System.Text.Encoding.UTF8.GetBytes(calendrier), "text/plain;charset=utf-8", "calendar.ics");
            }
        }
        private string RetireSymbolsDeDate(DateTime? dateACorriger)
        {
            string data = dateACorriger.ToString()!;
            return data.Replace("-", "").Replace(":", "").Replace(" ", "T");
        }
    }
}
