const prepareWorkers = workers => {
  const favorites = {};
  return [
    workers.map(({ profile, customerWorkerFavorites, id, rating, ...rest }) => {
      const isFavorite = Boolean(customerWorkerFavorites?.length);
      favorites[id] = isFavorite;
      return {
        ...rest,
        id,
        services: profile.services.map(item => item.service.name).join(', '),
        isFavorite,
        rating: rating?.toFixed(1),
      };
    }),
    favorites,
  ];
};

const orderByOptions = [{ label: 'Melhor avaliação', name: 'bestRating' }];

export { prepareWorkers, orderByOptions };
