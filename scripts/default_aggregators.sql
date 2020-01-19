INSERT INTO dbo.PodcastAggregators ( Id, CreateDate, UpdateDate, Name, Url, ImageUrl, PodcastId ) VALUES
(   
    NEWID(),          -- Id - uniqueidentifier
    SYSDATETIME(), -- CreateDate - datetime2(7)
    SYSDATETIME(), -- UpdateDate - datetime2(7)
    N'iTunes',           -- Name - nvarchar(max)
    N'https://pcr.apple.com/id1495118276',           -- Url - nvarchar(max)
    N'https://cdn.podnoms.com/static/images/pages/aggregators/itunes/itunes-subscribe.png',           -- ImageUrl - nvarchar(max)
    '44f2df97-e6fb-4e4b-b2ec-08d7828f3c69'           -- PodcastId - uniqueidentifier
    )

INSERT INTO dbo.PodcastAggregators ( Id, CreateDate, UpdateDate, Name, Url, ImageUrl, PodcastId ) VALUES
(   
    NEWID(),          -- Id - uniqueidentifier
    SYSDATETIME(), -- CreateDate - datetime2(7)
    SYSDATETIME(), -- UpdateDate - datetime2(7)
    N'Stitcher',           -- Name - nvarchar(max)
    N'https://www.stitcher.com/podcast/sir-henrys-weekly-sweat-choon',           -- Url - nvarchar(max)
    N'https://cdn.podnoms.com/static/images/pages/aggregators/stitcher/Stitcher_Listen_Badge_Color_Light_BG.png',           -- ImageUrl - nvarchar(max)
    '44f2df97-e6fb-4e4b-b2ec-08d7828f3c69'           -- PodcastId - uniqueidentifier
    )
INSERT INTO dbo.PodcastAggregators ( Id, CreateDate, UpdateDate, Name, Url, ImageUrl, PodcastId ) VALUES
(   
    NEWID(),          -- Id - uniqueidentifier
    SYSDATETIME(), -- CreateDate - datetime2(7)
    SYSDATETIME(), -- UpdateDate - datetime2(7)
    N'Spotify',           -- Name - nvarchar(max)
    N'https://open.spotify.com/show/6JG0ApW2wGqPA6AE4i6DGf',           -- Url - nvarchar(max)
    N'https://cdn.podnoms.com/static/images/pages/aggregators/spotify/spotify-podcast-badge-blk-grn-330x80.png',           -- ImageUrl - nvarchar(max)
    '44f2df97-e6fb-4e4b-b2ec-08d7828f3c69'           -- PodcastId - uniqueidentifier
    )

SELECT * FROM Podcasts WHERE Title LIKE('%henry%')
DELETE FROM PodcastAggregators