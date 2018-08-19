using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Domain.Models
{
    public class Fabric
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public string Type { get; set; }
        public string PurchaseArea { get; set; }
        public string SaleUnit { get; set; }
        public bool isRemoved { get; set; }
        public bool isHidden { get; set; }

        [ForeignKey("FabricType")]
        public int FabricTypeId { get; set; }
        public FabricType FabricType { get; set; }

        public ICollection<MillFabric> MillFabrics { get; set; }
    }
}
