use Equipe_sportive

insert into Utilisateur (IdUtilisateur, Nom, Prenom, DateNaissance, Age, email, Adresse, NumTelephone, DateCreation, DateModification, Etat, Fk_Id_Etat, Fk_Id_Roles)
VALUES 

-- ajout compte admin
('53f09484-f07b-4489-aac7-4b5428dc4283', 'Scott', 'Lucas', DATEADD(YEAR, -27, GETDATE()), 27,'lucasscott494@yahoo.com', '2539 Chemin Sainte-foy, G1V1F9, QC', '819-570-7356', GETDATE(), null, 1, 1, 0),

-- ajout de trois entraineurs 
('bc2362a8-cc57-4e37-b70a-abb1ab611717', 'Addionisio', 'Katheryn', DATEADD(YEAR, -35, GETDATE()), 35, 'kaddionisioe@reddit.com', 'PO Box 20597', '(845) 7898853', GETDATE(), null, 1, 1, 1),
('6B29FC40-CA47-1067-B31D-00DD010662DA', 'Carufel', 'Kevin', DATEADD(YEAR, -47, GETDATE()), 34, 'kevin.carufel@hotmail.com', 'PO Box 36733', '(667) 6927777', GETDATE(), null, 1, 1, 1),
('0434894c-51ac-4a0b-816b-0cd3da0d52eb', 'Duinbleton', 'Consuelo', DATEADD(YEAR, -47, GETDATE()), 26, 'cduinbletonb@surveymonkey.com', 'Room 1461', '(930) 1095089', GETDATE(), null, 1, 1, 1),

-- ajout de joueurs
('9e06e23b-4215-4bda-bde0-4a860c7ea7f8', 'De''Vere - Hunt', 'Maureene', DATEADD(YEAR, -47, GETDATE()), 47, 'mdeverehunt0@latimes.com', 'PO Box 51373', '(629) 6086917', GETDATE(), null, 1, 1, 3),
('d7a71e2f-28a6-480b-a232-b33bb0d2e833', 'Rimer', 'Sadella', DATEADD(YEAR, -27, GETDATE()), 27, 'srimer1@theglobeandmail.com', '13th Floor', '(955) 5891978', GETDATE(), null, 1, 1, 3),
('f8b06b1e-a13d-4816-987e-594dbca09fdb', 'Sanger', 'Nina', DATEADD(YEAR, -37, GETDATE()), 37, 'nsanger2@t.co', 'PO Box 44298', '(563) 6271489', '2022-09-18', GETDATE(), 1, 1, 3),
('6a33b0c4-35f4-4b53-a7f7-190410262e4e', 'Dockwray', 'Fayth', DATEADD(YEAR, -57, GETDATE()), 57, 'fdockwray3@usda.gov', '16th Floor', '(871) 6162381', GETDATE(), null, 1, 1, 3),
('a05dd4ba-6439-469d-ba50-7c4672041d65', 'Lartice', 'Franklin', DATEADD(YEAR, -52, GETDATE()), 52, 'flartice4@msn.com', '4th Floor', '(841) 5168155', GETDATE(), null, 1, 1, 3),
('acf94397-68f6-4b93-b71c-1d6a5b8f2553', 'Standring', 'Dew', DATEADD(YEAR, -58, GETDATE()), 58, 'dstandring5@wordpress.org', 'Suite 71', '(735) 4301399', GETDATE(), null, 1, 1, 3),
('31f2e3e7-83c9-4ca8-a57a-2736e284d45d', 'Stooke', 'Adria', DATEADD(YEAR, -11, GETDATE()), 11, 'astooke6@digg.com', 'PO Box 74353', '(796) 9416984', GETDATE(), null, 1, 1, 3),
('d472f6a9-95c8-453e-a0ff-3ba295e6277f', 'Drayton', 'Ronni', DATEADD(YEAR, -56, GETDATE()), 56, 'rdrayton7@de.vu', 'Room 1198', '(645) 8681296', GETDATE(), null, 1, 1, 3),
('d7acf9c2-b303-4eae-8b6a-2d55920f85a3', 'Whorf', 'Genevieve', DATEADD(YEAR, -9, GETDATE()), 9, 'gwhorf8@purevolume.com', 'PO Box 27090', '(565) 6196150', GETDATE(), null, 1, 1, 3),
('831c47eb-869c-43f1-b2dc-facd41325fa5', 'McDonand', 'Cullen', DATEADD(YEAR, -8, GETDATE()), 8, 'cmcdonand9@va.gov', 'PO Box 17279', '(636) 2469447', GETDATE(), null, 1, 1, 3),
('b9cd4311-0a4b-4d27-9dc4-589d62736da9', 'Ryrie', 'Roley', DATEADD(YEAR, -23, GETDATE()), 23, 'rryriea@ucla.edu', '5th Floor', '(900) 8645990', GETDATE(), null, 1, 1, 3),
('319ba171-147b-4233-8581-6ee05a17979a', 'Vallantine', 'Giulio', DATEADD(YEAR, -42, GETDATE()), 42, 'gvallantinec@senate.gov', '9th Floor', '(371) 3549251', GETDATE(), null, 1, 1, 3),
('a911271e-ef40-4c62-8c5c-43833d722417', 'Playdon', 'Ellene', DATEADD(YEAR, -38, GETDATE()), 38, 'eplaydond@jalbum.net', 'Suite 61', '(979) 4528877', GETDATE(), null, 1, 1, 3),
('2cde8067-2c46-4ad6-91a1-d4de6926d30d', 'Cashley', 'Ermengarde', DATEADD(YEAR, -47, GETDATE()), 30, 'ecashleyf@drupal.org', '2nd Floor', '(174) 6392563', GETDATE(), null, 1, 1, 3),
('c3af879f-1efa-47c9-8f32-bfb1c355a623', 'Colyer', 'Parke', DATEADD(YEAR, -12, GETDATE()), 12, 'pcolyerg@netscape.com', 'Room 1882', '(778) 8611313', GETDATE(), null, 1, 1, 3),
('4b645bb9-f74a-47ec-8f5c-6067d2e63da2', 'Linnett', 'Delinda', DATEADD(YEAR, -12, GETDATE()), 12, 'dlinnetth@wiley.com', 'Apt 1038', '(962) 3373751', GETDATE(), null, 1, 1, 3),
('1732020c-644b-4e48-bba4-bb37210f5d3f', 'Clee', 'Salomi', DATEADD(YEAR, -36, GETDATE()), 36, 'scleei@amazon.de', 'Room 999', '(135) 1825539', GETDATE(), null, 1, 1, 3),
('402ebf90-b524-43c5-bc72-6ac9d38e7d36', 'Aylen', 'Charissa', DATEADD(YEAR, -34, GETDATE()), 34, 'caylenj@artisteer.com', 'PO Box 36733', '(667) 9940263', GETDATE(), null, 1, 1, 3);
