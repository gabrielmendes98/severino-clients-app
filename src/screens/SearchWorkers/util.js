const prepareProfessionals = professionals =>
  professionals.map(({ profile, customerWorkerFavorites, ...rest }) => ({
    ...rest,
    services: profile.services.map(item => item.service.name).join(', '),
    isFavorite: Boolean(customerWorkerFavorites?.length),
  }));

const orderByOptions = [{ label: 'Melhor avaliação', name: 'bestRating' }];

export { prepareProfessionals, orderByOptions };
