const request = require("supertest");
const { app } = require("../index");
const ContactUs = require("../models/ContactUs");

jest.mock("../models/ContactUs");

describe('Contact Us Posting', function() {
    afterEach(function() {
        jest.clearAllMocks();
    });

    it('should post a contact us request successfully', function(done) {
        ContactUs.prototype.save.mockResolvedValueOnce({});
        request(app)
            .post('/api/util/postContactUs')
            .send({ authorName: 'John Doe', email: 'john@example.com', title: 'Feedback', content: 'Great service!' })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                expect(ContactUs.prototype.save).toHaveBeenCalled();

                done();
            });
    });

});
