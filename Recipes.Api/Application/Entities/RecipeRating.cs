namespace Recipes.Api.Application.Entities
{
    public class RecipeRating
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public int Rating { get; set; }
    }
}
