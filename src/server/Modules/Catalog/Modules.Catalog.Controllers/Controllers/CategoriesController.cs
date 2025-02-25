﻿using FluentPOS.Modules.Catalog.Core.Features.Categories.Commands;
using FluentPOS.Modules.Catalog.Core.Features.Categories.Queries;
using FluentPOS.Shared.Core.Constants;
using FluentPOS.Shared.DTOs.Catalogs.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FluentPOS.Modules.Catalog.Controllers
{
    internal class CategoriesController : BaseController
    {
        [HttpGet]
        [Authorize(Policy = Permissions.Categories.ViewAll)]
        public async Task<IActionResult> GetAllAsync([FromQuery] PaginatedCategoryFilter filter)
        {
            var categories = await Mediator.Send(new GetAllPagedCategoriesQuery(filter.PageNumber, filter.PageSize, filter.SearchString, filter.OrderBy));
            return Ok(categories);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = Permissions.Categories.View)]
        public async Task<IActionResult> GetByIdAsync(Guid id, bool bypassCache)
        {
            var category = await Mediator.Send(new GetCategoryByIdQuery(id, bypassCache));
            return Ok(category);
        }

        [HttpPost]
        [Authorize(Policy = Permissions.Categories.Register)]
        public async Task<IActionResult> RegisterAsync(RegisterCategoryCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpPut]
        [Authorize(Policy = Permissions.Categories.Update)]
        public async Task<IActionResult> UpdateAsync(UpdateCategoryCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = Permissions.Categories.Remove)]
        public async Task<IActionResult> RemoveAsync(Guid id)
        {
            return Ok(await Mediator.Send(new RemoveCategoryCommand(id)));
        }
    }
}