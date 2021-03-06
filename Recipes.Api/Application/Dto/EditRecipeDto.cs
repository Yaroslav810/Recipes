namespace Recipes.Api.Application.Dto
{
    public class EditRecipeDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string[] Keywords { get; set; }
        public int TimeInMinutes { get; set; }
        public int PersonsCount { get; set; }
        public IngredientDto[] Ingredients { get; set; }
        public StepDto[] Steps { get; set; }
    }
}
