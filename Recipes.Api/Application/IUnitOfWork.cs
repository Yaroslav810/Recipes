namespace Recipes.Api.Application
{
    public interface IUnitOfWork
    {
        public void Commit();
    }
}
