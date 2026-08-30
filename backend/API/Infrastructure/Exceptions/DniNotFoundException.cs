using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Infrastructure.Exceptions
{
    public class DniNotFoundException : Exception
    {
        public string Code { get; }

        public DniNotFoundException(string message, string code) : base(message)
        {
            Code = code;
        }
    }
}