using ERP.Domain.Models;
using ERP.EntityFramework;
using ERP.Services.Interface;

namespace ERP.Services
{
    public class MillService : IMillService
    {
        private readonly ERPContext _context;
        public MillService(ERPContext context)
        {
            _context = context;
        }
        public bool CreateMill(Mill mill)
        {
            _context.Mill.Add(mill);
            int entryCount = _context.SaveChanges();

            if (entryCount > 0)
                return true;
            else
                return false;
        }
    }
}
