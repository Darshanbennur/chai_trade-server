const request = require("supertest");
const { app } = require("../index");
const Mentor = require("../models/Mentor.js");

jest.mock("../models/Mentor.js");

describe("Retrieval of all Featured Blogs", function (done) {
    afterEach(function () {
        jest.clearAllMocks();
    });

    it('should retrieve all featured blogs successfully', async () => {
        const mockMentors = [
            {
                _id: "65d4ed3cf952485f4ebd81dd",
                mentorID: 'mentor1',
                mentorName: 'Mentor 1',
                mentorImage: 'image1.jpg',
                mentorEmail: 'mentor1@example.com',
                title: 'Title for Mentor 1',
                content: 'Content for Mentor 1',
                time: '2024-04-30T10:00:00Z',
                likedBy: [],
                __v: 0
            },
            {
                _id: "65d4ed3cf952485f4ebd81de",
                mentorID: 'mentor2',
                mentorName: 'Mentor 2',
                mentorImage: 'image2.jpg',
                mentorEmail: 'mentor2@example.com',
                title: 'Title for Mentor 2',
                content: 'Content for Mentor 2',
                time: '2024-04-30T11:00:00Z',
                likedBy: [],
                __v: 0
            }
        ];

        Mentor.find.mockResolvedValueOnce(mockMentors);

        request(app)
            .get('/api/mentor/getAllFeaturedBlogs')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.data).toEqual(mockMentors);
                done();
            });
    });
});
