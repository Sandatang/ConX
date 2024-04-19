using ConXUser.Management.Service.Model;

namespace ConXUser.Management.Service.Services
{
    public interface IEmailServices
    {
        void SendEmail(Message message);
    }
}
