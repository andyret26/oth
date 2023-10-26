
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using othApi.Data;
using othApi.Data.Entities;

namespace othApi.Controllers
{
    [Route("api/v1/tournament")]
    [ApiController]
    [Produces("application/Json")]
    [Consumes("application/Json")]
    [ApiConventionType(typeof(DefaultApiConventions))]
    public class TournamentsController : ControllerBase
    {

        public TournamentsController()
        {
        }

        // GET: api/Tournamentsy
        
    }
}
