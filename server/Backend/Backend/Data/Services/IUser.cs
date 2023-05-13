using Backend.Data.Models;

namespace Backend.Data.Services
{
    public interface IUser
    {
        List<User> GetAllUSers();
        void AddUser(User user);

    }
}
