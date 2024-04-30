const request = require("supertest");
const { app } = require("../index");
const News = require("../models/News.js");

jest.mock("../models/News.js");

describe("Retrieval of all News", function (done) {
    afterEach(function () {
        jest.clearAllMocks();
    });

    it('should retrieve all news successfully', async () => {
        const mockNews = [
            {
                _id: "65d4ed3cf952485f4ebd81dd",
                image: 'image1.jpg',
                title: 'News Title 1',
                headlines: 'Headlines for News 1',
                url: 'http://example.com/news1',
                __v: 0
            },
            {
                _id: "65d4ed3cf952485f4ebd81de",
                image: 'image2.jpg',
                title: 'News Title 2',
                headlines: 'Headlines for News 2',
                url: 'http://example.com/news2',
                __v: 0
            }
        ];

        News.find.mockResolvedValueOnce(mockNews);

        request(app)
            .get('/api/news/getAllNews')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.data).toEqual(mockNews);
                done();
            });
        
    });

});
