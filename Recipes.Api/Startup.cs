using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Recipes.Api.Application;
using Recipes.Api.Application.Repositories;
using Recipes.Api.Application.Services;
using Recipes.Api.Infrastructure;
using Recipes.Api.Infrastructure.Dbcontext;
using Recipes.Api.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

            services.AddControllers();
            services.AddSwaggerGen( c =>
             {
                 c.SwaggerDoc( "v1", new OpenApiInfo { Title = "apiRecipes", Version = "v1" } );
             } );
            services.AddScoped<IRecipesService, RecipesService>();
            services.AddScoped<IRecipesRepository, RecipesRepository>();
            services.AddDbContext<RecipeContext>( opts => opts.UseSqlServer( @"Server=MSI\SQLEXPRESS;Database=Recipes;Trusted_Connection=True;" ) );
            //services.AddScoped<IUnitOfWork, UnitOfWork>();
        }

        public void Configure( IApplicationBuilder app, IWebHostEnvironment env, RecipeContext context )
        {
            context.Database.EnsureCreated();
            if ( env.IsDevelopment() )
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI( c => c.SwaggerEndpoint( "/swagger/v1/swagger.json", "apiRecipes v1" ) );
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints( endpoints =>
             {
                 endpoints.MapControllers();
             } );
        }
    }
}
