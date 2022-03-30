const prepareProfessionals = professionals =>
  professionals.map(({ name, profile, customerWorkerFavorites, ...rest }) => ({
    ...rest,
    name: name.toUpperCase(),
    services: profile.services.map(item => item.service.name).join(', '),
    isFavorite: Boolean(customerWorkerFavorites?.length),
  }));

export { prepareProfessionals };
