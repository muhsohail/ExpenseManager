using ERP.Domain.Models;
using ERP.EntityFramework;
using ERP.Services.Interface;


namespace ERP.Services
{
    public class MillFabricService : IMillFabricService
    {
        private readonly ERPContext _context;

        public MillFabricService(ERPContext context)
        {
            _context = context;
        }

        public bool CreateMillFabric(MillFabric millFabric)
        {
            _context.MillFabrics.Add(millFabric);
            int entriesCount = _context.SaveChanges();
            if (entriesCount > 0)
                return true;
            else
                return false;

        }
    }
}
