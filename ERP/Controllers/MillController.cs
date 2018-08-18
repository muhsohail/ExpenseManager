using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP.Domain.Models;
using ERP.EntityFramework;
using ERP.Models;
using ERP.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ERP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MillController : ControllerBase
    {
        private readonly ERPContext _context;
        public readonly IMillService _millService;
        private readonly IMillFabricService _millFabricService;

        public MillController(ERPContext context, IMillService millService, IMillFabricService millFabricService)
        {
            _context = context;
            _millService = millService;
            _millFabricService = millFabricService;
        }

        [HttpGet("GetProvinces")]
        public IEnumerable<Province> GetProvinces()
        {
            return _context.Provinces.ToList();
        }

        [HttpGet("GetMills")]
        public IEnumerable<MillViewModel> GetMills()
        {
            List<Mill> mills = _context.Mill
                .Include(x => x.Province)
                .Include(x => x.City)
                .Include(x => x.MillFabrics)
                .ToList();

            List<MillViewModel> millViewModel = new List<MillViewModel>();
            foreach (Mill mill in mills)
            {
                millViewModel.Add(new MillViewModel
                {

                    Id = mill.Id,
                    Name = mill.Name,
                    CityId = mill.CityId,
                    CityName = mill.City.Name,
                    ManagerCell = mill.ManagerCell,
                    ManagerName = mill.ManagerName,
                    //FabricId = mill.MillFabrics.Select(x =>x.FabricId).First(),
                    //FabricName = mill.MillFabrics.Select(x =>x.Fabric.Name).First(),
                    ProvinceId = mill.ProvinceId,
                    ProvinceName = mill.Province.Name
                });
            }
            return millViewModel;
        }

        [HttpPost]
        [Route("CreateMill")]
        //[DisableCors]
        public IActionResult CreateMill([FromBody] CreateMillViewModel viewModel)
        {

            Mill mill = new Mill
            {
                Name = viewModel.Name,
                CityId = Convert.ToInt32(viewModel.CityId),
                ManagerCell = viewModel.ManagerCell,
                ManagerName = viewModel.ManagerName,
                ProvinceId = Convert.ToInt32(viewModel.ProvinceId)
            };

            bool result = _millService.CreateMill(mill);

            if (result)
            {
                MillFabric millFabric = new MillFabric
                {
                    MillId = mill.Id,
                    FabricId = Convert.ToInt32(viewModel.FabricId)
                };

                _millFabricService.CreateMillFabric(millFabric);
            }

            // TODO Need to send Ok().
            // TODO if sent Ok then gives console error

            return Ok(new Mill());
        }

    }
}