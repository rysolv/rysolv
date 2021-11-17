const companyValues = [
  'company_name',
  'company_url',
  'contract_accepted_date',
  'created_date',
  'description',
  'id',
  'location',
  'logo',
  'size',
];

const companyPositionValues = ['company_id', 'id'];

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
};
