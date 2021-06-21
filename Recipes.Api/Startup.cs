using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Recipes.Api.Application;
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
            services.AddCors( options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins( "http://localhost:4200" )
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    } );
            } );

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
            services.AddSingleton( Configuration.GetSection( "ImageStorageSettings" ).Get<ImageStorageSettings>() );
            services.AddDbContext<RecipeContext>( opts => opts.UseSqlServer( @"Server=MSI\SQLEXPRESS;Database=Recipes;Trusted_Connection=True;" ) );
        }

        public void Configure( IApplicationBuilder app, IWebHostEnvironment env, RecipeContext context )
        {
            if ( env.IsDevelopment() || env.IsEnvironment( "Yaroslav" ) )
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI( c => c.SwaggerEndpoint( "/swagger/v1/swagger.json", "apiRecipes v1" ) );
            }

            app.UseCors();

            app.UseRouting();

            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseEndpoints( endpoints =>
            {
                endpoints.MapControllers();
            } );
        }
    }
}
