const companyValues = [
  'company_name',
  'company_url',
  'contract_accepted_date',
  'created_date',
  'description',
  'id',
  'location',
  'size',
];

const companyPositionValues = ['company_id', 'id'];

const messageValues = [
  'body',
  'created_date',
  'id',
  'position_id',
  'read_date',
  'user_id',
];

const messageReturnValues = `
  messages.body,
  messages.created_date AS "createdDate",
  messages.id AS "commentId",
  messages.position_id AS "positionId",
  messages.read_date,
  messages.user_id AS "userId"
`;

module.exports = {
  companyValues,
  companyPositionValues,
  messageReturnValues,
  messageValues,
};
