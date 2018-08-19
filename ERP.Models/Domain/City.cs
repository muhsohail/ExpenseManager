using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace ERP.Domain.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }


        
        [ForeignKey("Province")]
        public int ProvinceId { get; set; }

        [JsonIgnore]
        public Province Province { get; set; }

        [JsonIgnore]
        public ICollection<Mill> Mill { get; set; }
    }
}
