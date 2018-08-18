namespace ERP.Domain.Models
{
    public class FabricType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public bool isRemoved { get; set; }
        public bool isHidden { get; set; }

    }
}
