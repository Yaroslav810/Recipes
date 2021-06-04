using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application
{
    public interface IUnitOfWork
    {
        public void Commit();
    }
}
