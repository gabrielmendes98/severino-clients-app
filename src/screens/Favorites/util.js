const prepareProfessionals = professionals => {
  const favorites = {};
  return [
    professionals.map(({ worker: { profile, id, ...rest } }) => {
      favorites[id] = true;
      return {
        ...rest,
        id,
        services: profile.services.map(item => item.service.name).join(', '),
        isFavorite: true,
      };
    }),
    favorites,
  ];
};

export { prepareProfessionals };
