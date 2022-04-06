const REVIEW_TYPES = {
  ALL: 'ALL',
  POSITIVES: 'POSITIVES',
  NEGATIVES: 'NEGATIVES',
};

const reviewTypes = [
  {
    value: REVIEW_TYPES.ALL,
    label: 'Todas',
  },
  {
    value: REVIEW_TYPES.POSITIVES,
    label: 'Positivas',
  },
  {
    value: REVIEW_TYPES.NEGATIVES,
    label: 'Negativas',
  },
];

export { reviewTypes, REVIEW_TYPES };
