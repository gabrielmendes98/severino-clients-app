const prepareProfessionals = professionals =>
  professionals.map(({ worker: { profile, ...rest } }) => ({
    ...rest,
    services: profile.services.map(item => item.service.name).join(', '),
    isFavorite: true,
  }));

export { prepareProfessionals };
