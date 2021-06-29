#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Repositories;

namespace Recipes.Api.Application.Services
{
    public interface IAccountService
    {
        public bool TryRegistrationUser( User user );
        public User? GetUserIfValid( User user );
        public User GetUserById( int userId );
        public bool ChangeUserData( User user, int userId );
        public bool ChangeUserPassword( PasswordDto passwordDto, int userId );
        public User GetUserByLogin( string login );
        public List<User> GetUsersByUserIds( List<int> userIds );
    }

    public class AccountService : IAccountService
    {
        protected readonly IAccountRepository _accountRepository;

        public AccountService( IAccountRepository accountRepository )
        {
            _accountRepository = accountRepository;
        }

        public bool TryRegistrationUser( User user )
        {
            User currentUser = _accountRepository.GetUserByLogin( user.Login );
            if ( currentUser != null )
                return false;

            user.Password = HashPassword( user.Password );
            _accountRepository.AddUser( user );

            return true;
        }

        public User? GetUserIfValid( User user )
        {
            User currentUser = _accountRepository.GetUserByLogin( user.Login );
            if ( currentUser == null )
                return null;

            bool isPasswordValid = CheckPassword( currentUser.Password, user.Password );
            if ( !isPasswordValid )
                return null;

            return currentUser;

        }

        public User GetUserById( int userId )
        {
            User user = _accountRepository.GetUserById( userId );
            if ( user == null )
                throw new ApplicationException( "Ошибка получения пользователя" );

            return user;
        }

        public bool ChangeUserData( User user, int userId )
        {
            User currentUser = _accountRepository.GetUserById( userId );
            if ( currentUser == null )
                throw new Exception( "Нет пользователя с таким идентификатором" );

            User sameLogin = _accountRepository.GetUserByLogin( user.Login );
            if ( sameLogin != null && sameLogin.Id != userId )
                return false;

            currentUser.FirstName = user.FirstName;
            currentUser.Login = user.Login;
            currentUser.About = user.About;

            return true;
        }

        public bool ChangeUserPassword( PasswordDto passwordDto, int userId )
        {
            User currentUser = _accountRepository.GetUserById( userId );
            if ( currentUser == null )
                throw new Exception( "Нет пользователя с таким идентификатором" );

            bool isPasswordSame = CheckPassword( currentUser.Password, passwordDto.CurrentPassword );
            if ( !isPasswordSame )
                return false;

            currentUser.Password = HashPassword( passwordDto.NewPassword );
            return true;
        }

        public User GetUserByLogin( string login )
        {
            User user = _accountRepository.GetUserByLogin( login );
            if ( user == null )
                throw new ApplicationException( "Ошибка получения пользователя" );

            return user;
        }

        public List<User> GetUsersByUserIds( List<int> userIds )
        {
            return userIds.Select( x => _accountRepository.GetUserById( x ) ).ToList();
        }

        private string HashPassword( string password )
        {
            if ( string.IsNullOrEmpty( password ) )
            {
                throw new Exception( "Пустой пароль" );
            }

            byte[] salt;
            byte[] buffer;
            using ( Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes( password, 16, 1000 ) )
            {
                salt = bytes.Salt;
                buffer = bytes.GetBytes( 32 );
            }

            byte[] hash = new byte[ 49 ];
            Buffer.BlockCopy( salt, 0, hash, 1, 16 );
            Buffer.BlockCopy( buffer, 0, hash, 17, 32 );

            return Convert.ToBase64String( hash );
        }

        private bool CheckPassword( string hashedPassword, string password )
        {
            if ( password == null )
                throw new Exception( "Пустой пароль" );

            if ( hashedPassword == null )
                return false;

            byte[] hash = Convert.FromBase64String( hashedPassword );
            if ( ( hash.Length != 49 ) || ( hash[ 0 ] != 0 ) )
                return false;


            byte[] salt = new byte[ 16 ];
            Buffer.BlockCopy( hash, 1, salt, 0, 16 );


            byte[] bufferHashedPassword = new byte[ 32 ];
            Buffer.BlockCopy( hash, 17, bufferHashedPassword, 0, 32 );

            byte[] bufferPassword;
            using ( Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes( password, salt, 1000 ) )
            {
                bufferPassword = bytes.GetBytes( 32 );
            }

            return bufferHashedPassword.SequenceEqual( bufferPassword );
        }
    }
}
