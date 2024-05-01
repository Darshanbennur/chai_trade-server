const News = require('../models/News.js');
const redis = require('redis');
const client = require('../utils/redis');

const getAllNews = async (req, res, next) => {
    try {
        const cacheKey = 'all-news';
        let data = await client.get(cacheKey);

        if (!data) {
            const newsData = await News.find()
                .select("image title headlines url")
                .exec();

            data = {
                data: newsData,
                custom: "News Fetched Successfully!!"
            };

            client.set(cacheKey, JSON.stringify(data));
            console.log('News data set into Redis cache');
        } else {
            console.log('News data retrieved from Redis cache');
            data = JSON.parse(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving news data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllNewsWithoutCache = async (req, res, next) => {
    try {
        const result = await News.find();
        res.status(200).json({
            data: result
        });
    } catch (err) {
        console.error('Error retrieving news data:', err);
        res.status(500)
            .json({
                err: 'Internal server error'
            });
    }
}

module.exports = { getAllNews, getAllNewsWithoutCache };
