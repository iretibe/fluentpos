﻿using AutoMapper;
using FluentPOS.Modules.Identity.Core.Entities;
using FluentPOS.Shared.DTOs.Identity.Users;

namespace FluentPOS.Modules.Identity.Infrastructure.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserResponse, FluentUser>().ReverseMap();
        }
    }
}