const registry = new Map();

export function registerService(serviceName, getter) {
  registry.set(serviceName, getter);
}

export function getService(serviceName, fetcher) {
  return registry.get(serviceName)(fetcher);
}