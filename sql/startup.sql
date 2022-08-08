CREATE DATABASE clothesdb;
go
USE clothesdb;
go
CREATE TABLE [dbo].[Users] (
    [Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [Username] NVARCHAR (200) NULL,
    [Email] NVARCHAR (200) NULL, 
    [Password] NVARCHAR (200) NULL
);
go