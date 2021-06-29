namespace Recipes.Api.Application.Entities
{
    public class UserRating
    {
        public int Id { get; protected set; }
        public int RecipeId { get; set; }
        public int UserId { get; set; }
        public bool IsLikeSet { get; set; }
        public bool IsFavoritesSet { get; set; }
    }
}
