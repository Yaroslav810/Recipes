using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Recipes.Api.Application;
using Recipes.Api.Application.Builders;
using Recipes.Api.Application.Repositories;
using Recipes.Api.Application.Services;
using Recipes.Api.Infrastructure;
using Recipes.Api.Infrastructure.Dbcontext;
using Recipes.Api.Infrastructure.Repositories;
using Recipes.Api.Settings;

namespace Recipes.Api
{
    public class Startup
    {
        public Startup( IConfiguration configuration )
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices( IServiceCollection services )
        {
            AddAuthentication( services );

            services.AddControllers();
            services.AddSwaggerGen( c =>
             {
                 c.SwaggerDoc( "v1", new OpenApiInfo { Title = "apiRecipes", Version = "v1" } );
             } );
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IRecipesService, RecipesService>();
            services.AddScoped<IRecipesRepository, RecipesRepository>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IDtoBuilder, DtoBuilder>();
            services.AddSingleton( Configuration.GetSection( "ImageStorageSettings" ).Get<ImageStorageSettings>() );
            services.AddDbContext<RecipeContext>( opts =>
                opts.UseSqlServer( Configuration.GetConnectionString( "RecipeConnection" ) ) );
        }

        public void Configure( IApplicationBuilder app, IWebHostEnvironment env, RecipeContext context )
        {
            if ( env.IsDevelopment() || env.IsEnvironment( "Yaroslav" ) )
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI( c => c.SwaggerEndpoint( "/swagger/v1/swagger.json", "apiRecipes v1" ) );
            }

            /*app.UseCors( policy =>
            {
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
                policy.SetIsOriginAllowed( origin => true );
                policy.AllowCredentials();
            } );*/

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseEndpoints( endpoints =>
            {
                endpoints.MapControllers();
            } );
        }

        private void AddAuthentication( IServiceCollection services )
        {
            services
                .AddAuthentication( sharedOptions =>
                     sharedOptions.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme
                )
                .AddCookie(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    options =>
                    {
                        Configuration.Bind( "CookieSettings", options );
                    } );
        }
    };
}

