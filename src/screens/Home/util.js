const prepareProfessionals = professionals =>
  professionals.map(({ name, rating, profile, ...rest }) => ({
    ...rest,
    name: name.toUpperCase(),
    rating: rating || 'Novo Usuário',
    services: profile.specificServices
      .map(item => item.specificService.name)
      .join(', '),
  }));

export { prepareProfessionals };
