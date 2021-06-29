using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Repositories
{
    public interface IAccountRepository
    {
        public void AddUser( User user );
        public User GetUserById( int userId );
        public User GetUserByLogin( string login );
    }
}
