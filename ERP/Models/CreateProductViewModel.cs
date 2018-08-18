using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Models
{
    public class CreateProductViewModel
    {
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int FabricTypeId { get; set; }
        public int CategoryId { get; set; }
        public string PurchaseArea { get; set; }
        public string SaleUnit { get; set; }
        public int PurchaseUnitCategoryId { get; set; }
        public int SaleUnitCategoryId { get; set; }
    }
}
