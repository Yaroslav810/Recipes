using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Repositories;
using Recipes.Api.Settings;

namespace Recipes.Api.Infrastructure.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly ImageStorageSettings _imageStorageSettings;

        public FileRepository( ImageStorageSettings imageStorageSettings )
        {
            _imageStorageSettings = imageStorageSettings;
        }

        public async Task SaveImageAsync( Image image )
        {
            string fullDirectory = $"{_imageStorageSettings.BaseUri}\\{image.DirectorySave}";
            string fullPath = $"{fullDirectory}\\{image.Name}";

            Directory.CreateDirectory( fullDirectory );

            using ( FileStream fileStram = new FileStream( fullPath, FileMode.Create ) )
            {
                await fileStram.WriteAsync( image.Content );
            }
        }

        public async Task<Image> GetImageAsync( string imagePath )
        {
            string directorySave = imagePath.Split( '/' ).First();
            string imageName = imagePath.Split( '/', 2 ).Last();
            string imageType = imageName.Split( '.' ).Last();
            string fullPath = $"{_imageStorageSettings.BaseUri}\\{imagePath}";

            if ( !File.Exists( fullPath ) )
            {
                return null;
            }

            using FileStream fileStram = File.OpenRead( fullPath );
            byte[] bytes = new byte[ fileStram.Length ];
            await fileStram.ReadAsync( bytes, 0, bytes.Length );

            return new Image
            {
                Name = imageName,
                Type = imageType,
                DirectorySave = directorySave,
                Content = bytes,
            };
        }

        public void DeleteImage( string imagePath )
        {
            string fullPath = $"{_imageStorageSettings.BaseUri}\\{imagePath}";

            if ( File.Exists( fullPath ) )
                File.Delete( fullPath );
        }
    }
}
