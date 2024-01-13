
IF OBJECT_ID(N'dbo.Roles', N'U') IS NULL 
	BEGIN 
		CREATE TABLE Roles(
		IdRole INT PRIMARY KEY,
		Description VARCHAR(50) NOT NULL
		);
END;

IF OBJECT_ID(N'dbo.Etats', N'U') IS NULL 
	BEGIN 
		CREATE TABLE Etats(
		IdEtat BIT PRIMARY KEY,
		Description VARCHAR(50) NOT NULL
		);
END;

IF OBJECT_ID(N'dbo.TypeEvenements', N'U') IS NULL 
	BEGIN 
		CREATE TABLE TypeEvenements(
		IdTypeEvenement INT PRIMARY KEY,
		Description VARCHAR(50) NOT NULL
		);
END;

IF OBJECT_ID(N'dbo.Utilisateur', N'U') IS NULL 
	BEGIN 
		CREATE TABLE Utilisateur(
		IdUtilisateur UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
		Nom VARCHAR(50) NOT NULL,
		Prenom VARCHAR(50) NOT NULL,
		DateNaissance DATETIME2 NOT NULL,
		Age INT NOT NULL,
		Email VARCHAR(100) NOT NULL,
		Adresse VARCHAR(120),
		NumTelephone VARCHAR(50),
		DateCreation DATETIME2,
		DateModification DATETIME2,
		Etat BIT NOT NULL,
		Fk_Id_Etat BIT FOREIGN KEY REFERENCES dbo.Etats (IdEtat),
		Fk_Id_Roles INT FOREIGN KEY REFERENCES dbo.Roles (IdRole)
		);
END;

IF OBJECT_ID(N'dbo.Equipe', N'U') IS NULL 
	BEGIN 
		CREATE TABLE Equipe(
		IdEquipe UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
		Nom VARCHAR(50) NOT NULL,
		Region VARCHAR(100) ,
		DateCreation DATETIME2,
		DateModification DATETIME2,
		Sport VARCHAR(100) NOT NULL,
		AssociationSportive VARCHAR(100),
		Etat BIT NOT NULL,
		Fk_Id_Etat BIT FOREIGN KEY REFERENCES dbo.Etats (IdEtat),
        LienGroupeFacebook nvarchar(255) NULL
		);
END;

IF OBJECT_ID(N'dbo.Evenement', N'U') IS NULL 
	BEGIN 
	CREATE TABLE Evenement(
		IdEvenement UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
		Description VARCHAR(350) NOT NULL,
		Emplacement VARCHAR(200) NOT NULL,
		DateDebut DATETIME2 NOT NULL,
		DateFin DATETIME2 NOT NULL,
		Duree float NULL,
		DateCreation DATETIME2,
		DateModification DATETIME2,
		Etat BIT NOT NULL,
		Fk_Id_TypeEvenement INT FOREIGN KEY REFERENCES dbo.TypeEvenements (IdTypeEvenement) NOT NULL);
END;

IF OBJECT_ID(N'dbo.EquipeJoueur', N'U') IS NULL 
	BEGIN 
		CREATE TABLE EquipeJoueur(
		IdJoueurEquipe UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
		Fk_Id_Utilisateur UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur) NOT NULL,
		FK_Id_Equipe UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe) NOT NULL
		);
END;

IF OBJECT_ID(N'dbo.EquipeEvenement', N'U') IS NULL 
	BEGIN 
		CREATE TABLE EquipeEvenement(
		IdEquipeEvenement UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
		FK_Id_Equipe UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe) NOT NULL,
		FK_Id_Evenement UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Evenement (IdEvenement) NOT NULL
		);
END;

IF OBJECT_ID(N'dbo.EvenementJoueur', N'U') IS NULL 
	BEGIN 
		CREATE TABLE EvenementJoueur(
		IdEvenementJoueur UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
		EstPresentAEvenement BIT,
		FK_Id_Evenement UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Evenement (IdEvenement) NOT NULL,
		FK_Id_Utilisateur UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur) NOT NULL
		);
END;

IF OBJECT_ID(N'dbo.UtilisateurEquipeRole', N'U') IS NULL 
	BEGIN 
		CREATE TABLE UtilisateurEquipeRole(
		IdUtilisateurEquipeRole UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
		FK_Id_Utilisateur UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur) NOT NULL,
		FK_Id_Equipe UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe) NOT NULL,
		FK_Id_Role INT FOREIGN KEY REFERENCES dbo.Roles (IdRole) NOT NULL
		);
END;




BEGIN 
	IF NOT EXISTS (SELECT Description FROM TypeEvenements
				   WHERE IdTypeEvenement <= 2)
	BEGIN
		INSERT INTO TypeEvenements(IdTypeEvenement, Description) VALUES(0,'Entrainement');
		INSERT INTO TypeEvenements(IdTypeEvenement, Description) VALUES(1,'Partie');
		INSERT INTO TypeEvenements(IdTypeEvenement, Description) VALUES(2,'Autre');
	END;
END;

BEGIN 
	IF NOT EXISTS (SELECT Description FROM Etats
				   WHERE IdEtat <= 2)
	BEGIN
		INSERT INTO Etats(IdEtat, Description) VALUES(0,'Inactif');
		INSERT INTO Etats(IdEtat, Description) VALUES(1,'Actif');
	END
END

BEGIN 
	IF NOT EXISTS (SELECT Description FROM Roles
				   WHERE IdRole <= 3)
	Begin
		INSERT INTO Roles(IdRole, Description) VALUES(0, 'Administrateur')
		INSERT INTO Roles(IdRole, Description) VALUES(1, 'Entraineur')
		INSERT INTO Roles(IdRole, Description) VALUES(2, 'Tuteur')
		INSERT INTO Roles(IdRole, Description) VALUES(3, 'Athlete')
	END
END

BEGIN

	ALTER TABLE Evenement
	ADD Url varchar(255);

END
BEGIN

	ALTER TABLE UtilisateurEquipeRole
	ADD DescriptionRole varchar(255);

END
