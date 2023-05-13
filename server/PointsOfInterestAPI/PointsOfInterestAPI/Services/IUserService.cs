using Backend.Data.Models;

namespace PointsOfInterestAPI.Services
{
    public interface IUserService
    {
        List<User> GetAllUsers();
        void AddUser(User user);

    }
}
