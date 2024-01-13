-- SELECT TOP (1000) [IdEvenementJoueur]
--       ,[EstPresentAEvenement]
--       ,[FK_Id_Evenement]
--       ,[FK_Id_Utilisateur]
--   FROM [Equipe_sportive].[dbo].[EvenementJoueur]

use Equipe_sportive

insert into [dbo].[EvenementJoueur] (FK_Id_Utilisateur, FK_Id_Evenement, EstPresentAEvenement)
values 
-- Kevin Carufel                       -- Premiere partie de la saison
('6B29FC40-CA47-1067-B31D-00DD010662DA', '4E8A76BC-DE7A-4969-BE20-2EB5A6B0C1F0', 1),
-- Kevin Carufel                       -- Grande finale
('6B29FC40-CA47-1067-B31D-00DD010662DA', '4AF815C6-E466-4B36-A85E-A88758AA33DC', 1),
-- De''Vere - Hunt', 'Maureene'           -- Premiere partie de la saison
('9e06e23b-4215-4bda-bde0-4a860c7ea7f8', '4E8A76BC-DE7A-4969-BE20-2EB5A6B0C1F0', 1),
-- 'Rimer', 'Sadella'                     -- Premiere partie de la saison
('d7a71e2f-28a6-480b-a232-b33bb0d2e833', '4E8A76BC-DE7A-4969-BE20-2EB5A6B0C1F0', 1),
-- De''Vere - Hunt', 'Maureene'           -- Premiere partie de la saison
('9e06e23b-4215-4bda-bde0-4a860c7ea7f8', '4AF815C6-E466-4B36-A85E-A88758AA33DC', 1),
-- 'Rimer', 'Sadella'                     -- Premiere partie de la saison
('d7a71e2f-28a6-480b-a232-b33bb0d2e833', '4AF815C6-E466-4B36-A85E-A88758AA33DC', 1);
