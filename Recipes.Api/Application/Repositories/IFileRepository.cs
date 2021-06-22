using System.Threading.Tasks;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Repositories
{
    public interface IFileRepository
    {
        public Task SaveImageAsync( Image image );
        public Task<Image> GetImageAsync( string imagePath );
        public void DeleteImage( string imagePath );
    }
}
