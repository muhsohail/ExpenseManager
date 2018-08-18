using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace ERP.Domain.Models
{
    public class Province 
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsHidden { get; set; }

        [JsonIgnore]
        public ICollection<City> Cities { get; set; }
    }
}
