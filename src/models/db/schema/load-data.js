const faker = require('faker')

var book = {
    title: faker.lorem.words(),
    author: faker.name.findName(),
    image: faker.image.abstract(),
    short_description: faker.lorem.sentence(),
    long_description: faker.lorem.paragraph()
}

console.log(book);
