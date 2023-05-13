using PointsOfInterestAPI.Auth;

namespace PointsOfInterestAPI.Services
{
    public interface IUserService
    {
        List<User> GetAllUsers();
        void AddUser(User user);

    }
}
