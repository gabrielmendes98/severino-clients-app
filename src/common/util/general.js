const isFunction = value => typeof value === 'function';

const focus = ref => ref.current.focus();

export { isFunction, focus };
