import store from 'common/util/store';
import toast from 'common/util/toast';

const locationInterceptor = (path, options) => {
  if (options.needLocation) {
    if (store.location) {
      path = `${path}&location=${store.location}`;
      return path;
    }

    toast.error('Informe sua localização acima');
    return null;
  }

  return path;
};

export { locationInterceptor };
