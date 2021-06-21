using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application.Entities
{
    public class Image
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string DirectoryName { get; set; }
        public byte[] Content { get; set; }
    }
}
