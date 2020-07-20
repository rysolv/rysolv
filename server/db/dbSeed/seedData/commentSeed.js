// comments(id, createdDate, modifiedDate, target, body, user)
const commentSeed = [
  [
    '331127d2-50ea-4366-970d-90a14222f2dc', // id
    new Date(), // create date
    new Date(), // last modified date
    '20619026-0f61-4772-9bb8-36ed643d4dcd', // target id
    'Misunderstood: this is a feature, not a bug.', // body
    'cdd583cf-4711-4f33-a202-c937081afd7e', // user id
  ],
  [
    '3f2ac445-94d8-46eb-94b4-6730140edc4e',
    new Date(),
    new Date(),
    '20619026-0f61-4772-9bb8-36ed643d4dcd',
    'Comment comment comment comment',
    'c2209ded-9219-4ee3-9c29-f863889053c0',
  ],
  [
    'f0ee8d0a-78cf-4f88-9e58-05ed51296b0a',
    new Date(),
    new Date(),
    '20619026-0f61-4772-9bb8-36ed643d4dcd',
    'Comment comment comment comment comment',
    'b519b064-b5db-4472-ad1b-00e30bdbfa4c',
  ],
];

module.exports = commentSeed;
