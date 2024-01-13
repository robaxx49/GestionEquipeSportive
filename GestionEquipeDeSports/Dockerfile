FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /App

# Copy everything
COPY . ./

# RUN grep -r --include '*.list' '^deb ' /etc/apt/sources.list /etc/apt/sources.list.d/
# RUN apt-get --allow-releaseinfo-change update

# Install NodeJs
RUN apt-get update
RUN apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y build-essential nodejs
# End Install

# Restore as distinct layers
RUN dotnet restore

# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT ["dotnet", "GC.GestionEquipeSportive.dll"]
