using Microsoft.EntityFrameworkCore;
using PointsOfInterestAPI.Auth;

namespace PointsOfInterestAPI.Services
{
    public class UserService : IUserService
    {
        private PoIDbContext _context;
        public UserService(PoIDbContext dbContext)
        {
            _context = dbContext;
        }
        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }
        ~UserService() 
        {
            _context.Dispose();
        }
    }
}
