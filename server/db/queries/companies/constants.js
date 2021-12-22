const companyValues = [
  'company_name',
  'company_url',
  'created_date',
  'customer_id',
  'description',
  'id',
  'location',
  'logo',
  'modified_date',
  'payment_method',
  'payment_set_date',
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
