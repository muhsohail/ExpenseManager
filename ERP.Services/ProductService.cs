using ERP.Domain.Models;
using ERP.EntityFramework;
using ERP.Services.Interface;


namespace ERP.Services
{
    public class ProductService : IProductService
    {
        private readonly ERPContext _context;
        public ProductService(ERPContext context)
        {
            _context = context;
        }

        public void CreateProduct(Fabric fabric)
        {

            _context.Fabrics.Add(fabric);
            _context.SaveChanges();
        }
    }
}
