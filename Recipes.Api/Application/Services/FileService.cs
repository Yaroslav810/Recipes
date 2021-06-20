using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Repositories;

namespace Recipes.Api.Application.Services
{
    public interface IFileService
    {
        public bool IsValidImage( IFormFile file );
        public Image CreateImage( IFormFile image );
        public Task SaveImageAsync( Image image );
        public Task<Image> GetImageAsync( string imagePath );
        public void DeleteImage( string imagePath );
    }

    public class FileService : IFileService
    {
        protected readonly IFileRepository _fileRepository;
        protected readonly string[] validExpansionImage = new string[] { ".PNG", ".JPEG", ".JPG", ".WEBP" };

        public FileService( IFileRepository fileRepository )
        {
            _fileRepository = fileRepository;
        }

        public bool IsValidImage( IFormFile image )
        {
            if ( string.IsNullOrEmpty( image.FileName ) || image == null || image.Length == 0 )
            {
                return false;
            }

            string ext = Path.GetExtension( image.FileName );
            if ( string.IsNullOrEmpty( ext ) )
            {
                return false;
            }

            ext = ext.ToUpperInvariant();
            if ( !Array.Exists( validExpansionImage, element => element.Equals( ext ) ) )
            {
                return false;
            }

            return true;
        }

        public Image CreateImage( IFormFile image )
        {
            if ( image == null )
            {
                return null;
            }

            string imageType = image.ContentType.Split( '/' ).Last();
            string imageName = GenerateName( imageType );

            return new Image
            {
                Name = imageName,
                Type = imageType,
                DirectorySave = $"{ DateTime.Now.Month }_{ DateTime.Now.Year }",
                Content = FileToBytes( image ),
            };
        }

        public async Task SaveImageAsync( Image image )
        {
            await _fileRepository.SaveImageAsync( image );
        }

        public async Task<Image> GetImageAsync( string imagePath )
        {
            return await _fileRepository.GetImageAsync( imagePath );
        }

        public void DeleteImage( string imagePath )
        {
            _fileRepository.DeleteImage( imagePath );
        }

        private string GenerateName( string type )
        {
            return $"Recipe_{Guid.NewGuid()}.{type}";
        }

        private byte[] FileToBytes( IFormFile file )
        {
            using Stream imageStream = file.OpenReadStream();
            byte[] bytes = new byte[ file.Length ];
            imageStream.Read( bytes, 0, ( int )file.Length );

            return bytes;
        }
    }
}
