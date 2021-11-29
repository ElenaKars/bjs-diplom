function cachingDecoratorNew(func) {
  const cache = [];

  return function (...args) {
    const hash = args.join(',');

    const idx = cache.findIndex((item)=> {
      return item.hash === hash
    });

    if(idx !== -1) {
      return `Из кэша: ${cache[idx].value}`
    }

    const result = func(...args);

    cache.push({
      hash,
      value: result
    })

    if(cache.length > 5) {
      cache.shift()
    }

    return `Вычисляем: ${result}`;
  }
}

//задача 2
function debounceDecoratorNew(func, ms) {
  let isCooldown = false;
  let currentTimeout = null;

  return function () {
    if(currentTimeout) {
      clearTimeout(currentTimeout)
    }
    currentTimeout = setTimeout(() => (isCooldown = false), ms);
    
    if (isCooldown) return;

    func.apply(this, arguments);

    isCooldown = true;
  };
}


// задача №3
function debounceDecorator2(func, ms) {
  let isCooldown = false;
  let currentTimeout = null;

  const wrapper = function () {
    if(currentTimeout) {
      clearTimeout(currentTimeout)
    }
    currentTimeout = setTimeout(() => (isCooldown = false), ms);

    if (isCooldown) return;

    func.apply(this, arguments);

    wrapper.count += 1;

    isCooldown = true;
  };

  wrapper.count = 0

  return wrapper
}
