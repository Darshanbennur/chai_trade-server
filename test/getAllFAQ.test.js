const request = require("supertest");
const { app } = require("../index");
const MarketTerm = require("../models/MarketTerms.js");

jest.mock("../models/MarketTerms.js");

describe("Retrieval of all FAQ's", function (done) {
    afterEach(function () {
        jest.clearAllMocks();
    });

    it('Test to check retrieval of all FAQs', async () => {
        const mockFAQs = [
            {
                _id: "65d4ed3cf952485f4ebd81dd",
                question: 'What is Lorem Ipsum?',
                answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                __v: 0
            },
            {
                _id: "65d4ed3cf952485f4ebd81dd",
                question: 'Why do we use it?',
                answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
                __v: 0
            }];

        // Correctly mocking MarketTerm.find method
        MarketTerm.find.mockResolvedValueOnce(mockFAQs);

        request(app)
            .get('/api/marketTerm/getAllFAQ')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.data).toEqual(mockFAQs);
                done();
            });
    });
});
