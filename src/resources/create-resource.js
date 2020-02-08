import uuid from "uuid";

const PENDING = 0;
const RESOLVED = 1;
const REJECTED = 2;
const cache = {};

function getResource(id, promise, input) {
  let resource = {
    status: PENDING
  };

  if (cache[id]) {
    if (cache[id][input]) {
      return cache[id][input];
    } else {
      cache[id][input] = resource;
    }
  } else {
    cache[id] = {};
    cache[id][input] = resource;
  }

  const promiseValue = promise(input).then(
    result => {
      resource.status = RESOLVED;
      resource.value = result;
      return result;
    },
    error => {
      resource.status = REJECTED;
      resource.value = error;
    }
  );

  resource.value = promiseValue;
  return resource;
}

export default function createResource(promise) {
  const id = uuid();
  const resource = {
    read: input => {
      const { status, value } = getResource(id, promise, input);
      switch (status) {
        case RESOLVED: {
          return value; // resolved value
        }
        case PENDING: {
          throw value; // value is promise
        }
        case REJECTED: {
          throw value; // error
        }
        default: {
          throw new Error("something went wrong");
        }
      }
    },
    preload: input => {
      getResource(id, promise, input);
    }
  };
  return resource;
}
