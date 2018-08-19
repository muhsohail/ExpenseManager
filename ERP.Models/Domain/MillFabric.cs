namespace ERP.Domain.Models
{
    public class MillFabric
    {
        public int MillId { get; set; }
        public Mill Mill { get; set; }

        public int FabricId { get; set; }
        public Fabric Fabric { get; set; }
    }
}
