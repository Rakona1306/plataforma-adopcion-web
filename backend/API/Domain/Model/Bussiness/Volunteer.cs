using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class Volunteer : BaseModelInt
    {
        public int RequestVolunteerId { get; set; }
        public DateTime ApplicationDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public RequestVolunteer RequestVolunteer { get; set; } = new();
    }
}