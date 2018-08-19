using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Domain.Models
{
    public class Mill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Product { get; set; }

        public string ManagerName { get; set; }
        public string ManagerCell { get; set; }

        [ForeignKey("City")]
        public int CityId { get; set; }
        public City City { get; set; }

        [ForeignKey("Province")]
        public int ProvinceId { get; set; }
        public Province Province { get; set; }

        public ICollection<MillFabric> MillFabrics { get; set; }

    }
}
