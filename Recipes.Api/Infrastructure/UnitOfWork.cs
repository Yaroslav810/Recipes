using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Recipes.Api.Application;

namespace Recipes.Api.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly DbContext _context;

        public UnitOfWork( DbContext context )
        {
            _context = context;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
    }
}
