using System.Linq;
using ERP.Domain.Models;

namespace ERP.EntityFramework
{
    public class DbInitializer
    {
        public static void Initialize(ERPContext _context)
        {
            _context.Database.EnsureCreated();
            _seedProvince(_context);
            _seedCities(_context);
            //_seedProducts(_context);
            _seedFabricTypes(_context);

        }

        private static void _seedFabricTypes(ERPContext _context)
        {
            if (_context.FabricTypes.Any())
                return;
            else
            {
                _context.FabricTypes.Add(new FabricType
                {
                    Name = "No of meshes",
                    isHidden = false,
                    isRemoved = false
                });

                _context.FabricTypes.Add(new FabricType
                {
                    Name = "GSM (Gramage  / square meter)",
                    isHidden = false,
                    isRemoved = false
                });

                _context.SaveChanges();
            }
        }

        //private static void _seedProducts(HashContext _context)
        //{
        //}

        private static void _seedCities(ERPContext _context)
        {

            int _punjabId = _context.Provinces.FirstOrDefault(x => x.Name == "Punjab").Id;
            int _kPKId = _context.Provinces.FirstOrDefault(x => x.Name == "KPK").Id;
            int _sindhId = _context.Provinces.FirstOrDefault(x => x.Name == "Sindh").Id;
            int _balochistanId = _context.Provinces.FirstOrDefault(x => x.Name == "Balochistan").Id;

            if (_context.Cities.Any())
                return;
            else
            {

                // Punjab
                _context.Cities.Add(new City
                {
                    Name = "Lahore",
                    ProvinceId = _punjabId
                });

                _context.Cities.Add(new City
                {
                    Name = "Gujranwala",
                    ProvinceId = _punjabId
                });

                _context.Cities.Add(new City
                {
                    Name = "Multan",
                    ProvinceId = _punjabId
                });

                _context.Cities.Add(new City
                {
                    Name = "Sialkot",
                    ProvinceId = _punjabId
                });

                _context.Cities.Add(new City
                {
                    Name = "Gujranwala",
                    ProvinceId = _punjabId
                });

                // Sindh
                _context.Cities.Add(new City
                {
                    Name = "Karachi",
                    ProvinceId = _sindhId
                });

                _context.Cities.Add(new City
                {
                    Name = "Hydrabad",
                    ProvinceId = _sindhId
                });


                // KPK
                _context.Cities.Add(new City
                {
                    Name = "Peshwar",
                    ProvinceId = _kPKId
                });

                _context.Cities.Add(new City
                {
                    Name = "Balakot",
                    ProvinceId = _kPKId
                });

                // Baluchistan
                _context.Cities.Add(new City
                {
                    Name = "Queta",
                    ProvinceId = _balochistanId
                });

                _context.Cities.Add(new City
                {
                    Name = "Mustang",
                    ProvinceId = _balochistanId
                });

                _context.SaveChanges();
            }
        }

        private static void _seedProvince(ERPContext _context)
        {

            if (_context.Provinces.Any())
                return;
            else
            {

                _context.Provinces.Add(new Province
                {
                    Name = "KPK",
                    IsHidden = false
                });

                _context.Provinces.Add(new Province
                {
                    Name = "Punjab",
                    IsHidden = false
                });

                _context.Provinces.Add(new Province
                {
                    Name = "Sindh",
                    IsHidden = false
                });

                _context.Provinces.Add(new Province
                {
                    Name = "Balochistan",
                    IsHidden = false
                });

                _context.SaveChanges();
            }

        }
    }
}
