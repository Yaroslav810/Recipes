using System.Linq;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Repositories;
using Recipes.Api.Infrastructure.Dbcontext;

namespace Recipes.Api.Infrastructure.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        protected readonly RecipeContext _recipeContext;

        public AccountRepository( RecipeContext recipeContext )
        {
            _recipeContext = recipeContext;
        }

        public void AddUser( User user )
        {
            _recipeContext
                .Set<User>()
                .Add( user );
        }

        public User GetUserById( int userId )
        {
            return _recipeContext
                .Set<User>()
                .FirstOrDefault( x => x.Id == userId );
        }

        public User GetUserByLogin( string login )
        {
            return _recipeContext
                .Set<User>()
                .FirstOrDefault( x => x.Login == login );
        }

        public int GetRecipesCount( int userId )
        {
            return _recipeContext
                .Set<Recipe>()
                .Count( x => x.AuthorId == userId );
        }

        public int GetLikesCount( int userId )
        {
            return _recipeContext
                .Set<Recipe>()
                .Where( x => x.AuthorId == userId )
                .Sum( x => x.LikesCount );
        }

        public int GetStarsCount( int userId )
        {
            return _recipeContext
                .Set<Recipe>()
                .Where( x => x.AuthorId == userId )
                .Sum( x => x.StarsCount );
        }
    }
}
