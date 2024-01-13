# A- Phases de travail

Tout au long de notre projet, nous avons travaillé sur 3 phases:
#1.La Phase de développement
Dans cette phase, nous avons utilisé trois environnements distincts. 

* L'environnement nommé : unitaire
C'est l’endroit où nous avons écris tout le code et effectué les tests unitaires.

Les logiciels que nous avons utilisés dans cet environnement sont les suivants:
- Bases de données: Microsoft SQL Server
- Backend: Microsoft Visual Studio 2022
- Frontend: Visual Studio Code

* L’environnement d’acceptation
C'est l'endroit où nous avons migré la solution une fois qu'elle a réussie tous les tests dans l'environnement Unitaire.
Ce qui permet ainsi au client de consulter l'application et faire les tests d'acceptation.
Les ressources et services sont hébergées sur Azure afin de permettre au client d’y accéder.

* L’environnement de production
C'est celui vers lequel nous avons migré la solution une fois que le client etait satisfait du résultat présent dans l’environnement d’acceptation.

Dans cet environnement, les technologies que nous avons utilisées sont: 
- ASP.NET 6, 
- Microsoft SQL server 2022, 
- React 18.0.2, 
- Docker (pour image app), 
- Git (Azure DevOps)

#2.La Phase de Production
C'est la phase finale avant le déploiement de la solution.
Dans cette phase, nous avons principalement effectué la mise en œuvre du projet et l'optimisation. Nous avons également effectué divers tests pour un déploiement efficace du projet.

Dans cet environnement, les technologies que nous avons utilisées sont:
- ASP .NET 7, 
- Microsoft SQL server 2022, 
- React 18.0.2, 
- Azure (pour l’hébergement).

#3.La Phase de déploiement
Une fois que notre application est devenue prête et fonctionnelle, nous avons utilisé cette phase pour la rendre accessible au grand public.

Dans cette phase les services utilisés sont sensiblement les mêmes que dans la phase de production C'est à dire : 
- Un service d’application web, 
- Un server de base de données, 
- une base de données principale. 

Le tout hébergé via les services d’Azure et disponible via un DNS à déterminer avec le client.


# B- Normes de travail utilisées

Dans le projet React(Frontend), nous avons:
- Le dossier components: qui contient toutes les composantes communes et réutilisables partout
- Le dossier pages: qui contient les différentes pages de notre application
- Le dossier images: qui contient toutes les images que nous avons utilisées dans l'application
- Le dossier styles: qui contient le fichier du CSS

 
# C- Autres éléments utilisés dans le projet
* Authentification
Pour l'authentification, nous avons utilisé Auth0.
	
*Génerer le courriel pour inviter un joueur à rejoindre une équipe
Pour effectuer cette tâche, nous avons utilisé le service EmailJS. Pour accéder à ce service, suivez ce lien: https://www.emailjs.com/

*Créer des tutoriels pour les utilisateurs
https://scribehow.com/

Les credentials pour accéder aux comptes pour notre projet sont:
- email: devinternationalinc@gmail.com
- password ???: Azerty123
- password Gmail, Auth0, Scribe: FEVQCi6IINA0wzRm
