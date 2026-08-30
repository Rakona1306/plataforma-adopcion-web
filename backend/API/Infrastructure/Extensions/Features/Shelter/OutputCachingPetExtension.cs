namespace API.Infrastructure.Extensions.Features.Shelter
{
    public static class OutputCachingPetExtension
    {
        public const string PetsListPolicy = "PetsListCache";
        public const string PetsDetailPolicy = "PetsDetailCache";
        public const string PetsRecommendationsPolicy = "PetsRecommendationsCache";

        public static IServiceCollection AddAppOutputCache(this IServiceCollection services)
        {
            services.AddOutputCache(options =>
            {
                // Listado paginado — varía por todos los filtros posibles
                options.AddPolicy(PetsListPolicy, policy =>
                    policy.Expire(TimeSpan.FromSeconds(60))
                          .SetVaryByQuery(
                              "Page", "PageSize", "Sort", "Search",
                              "Genders", "Sizes", "SpeciesIds", "BreedIds",
                              "MinAge", "MaxAge")
                          .Tag("pets"));

                // Detalle por slug — varía por el route value
                options.AddPolicy(PetsDetailPolicy, policy =>
                    policy.Expire(TimeSpan.FromMinutes(5))
                          .SetVaryByRouteValue("slug")
                          .Tag("pets"));

                // Recomendaciones — varía por sus propios query params
                options.AddPolicy(PetsRecommendationsPolicy, policy =>
                    policy.Expire(TimeSpan.FromSeconds(60))
                          .SetVaryByQuery("PetId", "SpecieId", "BreedIds", "TraitIds", "PageSize")
                          .Tag("pets"));
            });

            return services;
        }

        public static IApplicationBuilder UseAppOutputCache(this IApplicationBuilder app)
        {
            app.UseOutputCache();
            return app;
        }

    }
}