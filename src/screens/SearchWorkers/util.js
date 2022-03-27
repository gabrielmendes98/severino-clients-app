const prepareProfessionals = professionals =>
  professionals.map(({ name, rating, profile, ...rest }) => ({
    ...rest,
    name: name.toUpperCase(),
    rating: rating || 'Novo Usuário',
    services: profile.services.map(item => item.service.name).join(', '),
  }));

const orderByOptions = [{ label: 'Melhor avaliação', name: 'bestRating' }];

export { prepareProfessionals, orderByOptions };
