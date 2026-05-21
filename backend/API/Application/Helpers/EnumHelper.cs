using API.Application.Features.System.Enums.Dto;

namespace API.Application.Helpers
{
    public static class EnumHelper
    {
        public static List<EnumResponse> ToList<T>()
            where T : Enum
        {
            return Enum.GetValues(typeof(T))
                .Cast<T>()
                .Select(x => new EnumResponse
                {
                    Key = Convert.ToInt32(x),
                    Value = x.ToString()
                })
                .ToList();
        }
    }
}
