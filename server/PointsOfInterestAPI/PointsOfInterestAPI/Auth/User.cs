    public class User
using Microsoft.AspNetCore.Identity;
using PointsOfInterestAPI.Entities;

namespace PointsOfInterestAPI.Auth
{
    public class User : IdentityUser
    {
        public List<PoI>? PointsList { get; set; }
    }
}
