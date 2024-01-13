--IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Evenement'))
--BEGIN;
--    DROP TABLE [Evenement];
--END;
--GO

--CREATE TABLE [Evenement] (
--    [EvenementID] INTEGER NOT NULL IDENTITY(1, 1),
--    [Description] VARCHAR(MAX) NULL,
--    [Emplacement] VARCHAR(MAX) NULL,
--    [dateDebut] VARCHAR(255) NULL,
--    [dateFin] VARCHAR(255) NULL,
--    [TypeEvenement] INTEGER NULL,
--    PRIMARY KEY ([EvenementID])
--);
--GO
use Equipe_sportive

INSERT INTO [Evenement] (IdEvenement,Description,Emplacement,dateDebut,dateFin,Duree, Etat, Fk_Id_TypeEvenement)
VALUES
  ('4af815c6-e466-4b36-a85e-a88758aa33dc', 'Grande finale','Nunc commodo','Apr 20, 2022 11:44','Apr 21, 2022 11:44',90, 1,1),
  ('77f03161-b320-48f6-b65f-9ca8080f40e1', 'Partie contre les capitales','accumsan interdum','Apr 20, 2022 11:44','Apr 21, 2022 11:44', 45,1,1),
  ('4e8a76bc-de7a-4969-be20-2eb5a6b0c1f0', 'Premiere partie de la saison','sodales purus,','Apr 20, 2022 11:44','Apr 21, 2022 11:44',180, 1,1),
  ('522b639c-4c1f-46fc-9313-44ddeb6fe5b6', 'montes, nascetur ridiculus','purus ac','Apr 20, 2022 11:44','Apr 21, 2022 11:44',45, 1,1),
  ('66e7f109-0855-4e08-a668-15c4daa422f7', 'egestas. Duis ac','mauris, aliquam','Apr 20, 2022 11:44','Apr 21, 2022 11:44',90, 1,1),
  ('0195c634-ec67-4e70-b2d6-2a869ccc41c7', 'morbi tristique senectus','sit amet,','Apr 20, 2022 11:44','Apr 21, 2022 11:44',180, 1,2),
  ('63f58f2e-7c47-4654-b96c-445c297c55f4', 'Partie contre les capitale','Nulla facilisis.','Apr 20, 2022 11:44','Apr 21, 2022 11:44',30, 1,0),
  ('cb52bded-7e1a-4d63-8fe3-8ef4515ea920', 'libero. Morbi accumsan','at sem','Apr 20, 2022 11:44','Apr 21, 2022 11:44',60, 1,1),
  ('4689a4c1-5c14-4983-9a15-bf51e52c9ad4', 'arcu vel quam','amet, dapibus','Apr 20, 2022 11:44','Apr 21, 2022 11:44',15, 1,1),
  ('df15a7b8-f765-4fbf-b1f0-768ffab494c1', 'Partie contre les capitale','Cras pellentesque.','Apr 20, 2022 11:44','Apr 21, 2022 11:44',20,1,1);
