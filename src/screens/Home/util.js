const prepareProfessionals = professionals => {
  const favorites = {};
  return [
    professionals.map(({ profile, customerWorkerFavorites, id, ...rest }) => {
      const isFavorite = Boolean(customerWorkerFavorites?.length);
      favorites[id] = isFavorite;
      return {
        ...rest,
        id,
        services: profile.services.map(item => item.service.name).join(', '),
        isFavorite,
      };
    }),
    favorites,
  ];
};

export { prepareProfessionals };
