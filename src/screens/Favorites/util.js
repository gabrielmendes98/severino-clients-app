const prepareWorkers = workers => {
  const favorites = {};
  return [
    workers.map(({ worker: { profile, id, rating, ...rest } }) => {
      favorites[id] = true;
      return {
        ...rest,
        id,
        services: profile.services.map(item => item.service.name).join(', '),
        isFavorite: true,
        rating: rating?.toFixed(1),
      };
    }),
    favorites,
  ];
};

export { prepareWorkers };
