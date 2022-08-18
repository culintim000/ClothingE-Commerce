CREATE DATABASE clothesdb;
go
USE clothesdb;
go
CREATE TABLE [dbo].[Users] (
    [Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [Username] NVARCHAR (200) NULL,
    [Email] NVARCHAR (200) NULL, 
    [PasswordSalt] VARBINARY (200) NULL,
    [PasswordHash] VARBINARY (200) NULL
);
go