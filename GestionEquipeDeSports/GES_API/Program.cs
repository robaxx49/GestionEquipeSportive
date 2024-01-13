using dotenv.net;
using GES_API.Middlewares;
using GES_DAL.DbContexts;
using GES_DAL.Depots;
using GES_Services.Interfaces;
using GES_Services.Manipulations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Host.ConfigureAppConfiguration((configBuilder) =>
{
    configBuilder.Sources.Clear();
    DotEnv.Load();
    configBuilder.AddEnvironmentVariables();
});

builder.WebHost.ConfigureKestrel(serverOptions => serverOptions.AddServerHeader = false);
builder.Services.AddDbContext<Equipe_sportiveContext>(options => options.UseSqlServer(connectionString).UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddScoped<ManipulationDepotEvenement>();
builder.Services.AddScoped<IDepotEvenement, DepotEvenementsSQLServer>();

builder.Services.AddScoped<ManipulationDepotEquipe>();
builder.Services.AddScoped<IDepotEquipe, DepotEquipeSQLServer>();

builder.Services.AddScoped<ManipulationDepotImporationEvenementCSV>();
builder.Services.AddScoped<IDepotImportationEvenementCSV, DepotImportationEvenementCSVSQLServer>();

builder.Services.AddScoped<ManipulationDepotEquipeEvenement>();
builder.Services.AddScoped<IDepotEquipeEvenement, DepotEquipeEvenementSQLServer>();

builder.Services.AddScoped<ManipulationDepotUtilisateur>();
builder.Services.AddScoped<IDepotUtilisateur, DepotUtilisateurSQLServer>();

builder.Services.AddScoped<ManipulationDepotEquipeJoueur>();
builder.Services.AddScoped<IDepotEquipeJoueur, DepotEquipeJoueurSQLServer>();

builder.Services.AddScoped<ManipulationDepotEvenementEquipe>();
builder.Services.AddScoped<IDepotEvenementEquipe, DepotEvenementEquipeSQLServer>();

builder.Services.AddScoped<ManipulationDepotEvenementJoueur>();
builder.Services.AddScoped<IDepotEvenementJoueur, DepotEvenementJoueurSQLServer>();

builder.Services.AddScoped<ManipulationDepotUtilisateurEquipe>();
builder.Services.AddScoped<IDepotUtilisateurEquipe, DepotUtilisateurEquipeSQLServer>();

builder.Services.AddScoped<ManipulationDepotUtilisateurEquipeRole>();
builder.Services.AddScoped<IDepotUtilisateurEquipeRole, DepotUtilisateurEquipeRoleSQLServer>();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<Equipe_sportiveContext>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
            builder.Configuration.GetValue<string>("CLIENT_ORIGIN_URL"))
            .WithHeaders(new string[] {
                HeaderNames.ContentType,
                HeaderNames.Authorization,
            })
            .WithMethods("GET")
            .SetPreflightMaxAge(TimeSpan.FromSeconds(86400));
    });
});

builder.Services.AddHealthChecks().AddSqlServer(connectionString, tags: new[] { "db" });
builder.Services.AddControllers();

builder.Host.ConfigureServices((services) =>
   services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
       .AddJwtBearer(options =>
       {
           var audience = builder.Configuration.GetValue<string>("AUTH0_AUDIENCE");

           options.Authority = $"https://{builder.Configuration.GetValue<string>("AUTH0_DOMAIN")}/";
           options.Audience = audience;
           options.TokenValidationParameters = new TokenValidationParameters
           {
               ValidateAudience = true,
               ValidateIssuerSigningKey = true
           };
       })
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseDeveloperExceptionPage();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

try
{
    using (var scope = app.Services.CreateScope())
    {
        using (var context = scope.ServiceProvider.GetService<Equipe_sportiveContext>())
        {
            context?.Database.Migrate();
        }
    }
}
catch (Exception ex)
{
    Console.Error.WriteLine(ex.Message);
    throw;
}

var requiredVars =
   new string[] {
          "BACKEND_PORT",
          "CLIENT_ORIGIN_URL",
          "AUTH0_DOMAIN",
          "AUTH0_AUDIENCE",
   };

foreach (var key in requiredVars)
{
    var value = app.Configuration.GetValue<string>(key);

    if (value == "" || value == null)
    {
        throw new Exception($"Config variable missing: {key}.");
    }
}

//app.Urls.Add($"https://+:{app.Configuration.GetValue<string>("BACKEND_PORT")}");
app.Urls.Add($"https://localhost:{app.Configuration.GetValue<string>("BACKEND_PORT")}");// LOCALHOST NE DOIT PAS ÊTRE HARDCODÉ

app.UseErrorHandler();
app.UseSecureHeaders();
app.MapControllers();
app.UseCors();

//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
    endpoints.MapRazorPages();
});

app.MapFallbackToFile("index.html"); ;

app.MapHealthChecks("/healthz/live", new HealthCheckOptions
{
    Predicate = healthCheck => !healthCheck.Tags.Contains("db")
});

app.MapHealthChecks("/healthz/db");
app.Run();
