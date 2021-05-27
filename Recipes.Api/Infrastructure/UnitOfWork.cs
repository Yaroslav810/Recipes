using Recipes.Api.Application;
using Recipes.Api.Infrastructure.Dbcontext;

namespace Recipes.Api.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly RecipeContext _context;

        public UnitOfWork( RecipeContext context )
        {
            _context = context;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
    }
}
