using Microsoft.Extensions.Configuration;

namespace GES_Configuration_Application
{
    public class Configuration
    {
        private static IConfigurationRoot? _configuration;
        private static IConfigurationRoot Settings
        {
            get
            {
                if (_configuration == null)
                {
                    _configuration =
                    new ConfigurationBuilder()
                    .SetBasePath(Directory.GetParent(AppContext.BaseDirectory)!.FullName)
                    .AddJsonFile("appsettings.json", false)
                    .Build();
                }

                return _configuration;
            }
        }

        public static string ChaineConnextion
        {
            get
            {
                return Settings.GetConnectionString("Equipe_sportive");
            }
        }
    }
}
