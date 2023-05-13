using Backend.Data.Models;

namespace Backend.Data.Services
{
    public interface IInterestPoint
    {
        List<InterestPoint> GetAllInterstPoint();
        void AddInterestPoint();
    }
}
