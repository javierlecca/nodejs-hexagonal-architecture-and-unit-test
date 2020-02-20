const ormUser = require('../domain/orm/orm-user');

describe('Post Endpoints', () => {
    it('should info of a USER', async () => {
        const res = await ormUser.GetById("76b446ec-e739-496c-a639-8c42c9cf0f00");
        expect(res.name).toEqual("joanna");
    });
});