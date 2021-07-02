namespace Recipes.Api.Application.Dto
{
    public class RecipeOfDayDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public int LikesCount { get; set; }
        public int TimeInMin { get; set; }
        public string ImagePath { get; set; }
        public bool IsLikeSet { get; set; }
    }
}
