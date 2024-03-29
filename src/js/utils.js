import moment from "moment";

export const getRandomNum = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const makeFirstSymUp = (value) => value === `` ? `` : `${value[0].toUpperCase()}${value.substring(1)}`;

export const getRandomArray = (arr, min, max) => {
  const sortedArray = arr.slice().sort(() => Math.random() - 0.5);
  const randomMax = getRandomNum(min, max);

  return sortedArray.slice(min, randomMax);
};

export const getFullEventPrice = (eventsList) => (
  eventsList.reduce((acc, {cost, offers}) => {
    const offerFullPrice = offers.reduce((accum, {price, accepted}) => (accepted ? accum + Number(price) : accum), 0);

    return acc + Number(cost) + offerFullPrice;
  }, 0)
);

export const getFormattedTimeDifference = (dateFrom, dateTo) => {
  const diff = dateTo.diff(dateFrom);
  const duration = moment.duration(diff);

  const minutesPart = `${String(duration.minutes()).padStart(2, `0`)}M`;
  const hoursPart = (duration.days() > 0 || duration.hours() > 0) ? `${String(duration.hours()).padStart(2, `0`)}H` : ``;
  const daysPart = duration.days() > 0 ? `${String(duration.days()).padStart(2, `0`)}D` : ``;

  return `${daysPart} ${hoursPart} ${minutesPart}`;
};

export const POSITION = {
  afterbegin: `afterbegin`,
  beforeend: `beforeend`,
  afterend: `afterend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case POSITION.afterbegin:
      container.prepend(element);
      break;
    case POSITION.beforeend:
      container.append(element);
      break;
    case POSITION.afterend:
      container.after(element);
      break;
  }
};

export const unrenderElement = (element) => {
  if (element) {
    element.remove();
  }
};

export const getTripInfoData = (trips) => trips.length > 0
  ? ({
    cities: trips.map(({destination: {name}}) => name),
    date: {
      start: trips[0].eventTime.from,
      end: trips[trips.length - 1].eventTime.to
    }
  })
  : ({
    cities: [],
    date: {}
  });

export const getMenuData = (value) => ({
  name: value,
  isActive: value === `table`
});

export const getFilterData = (value) => ({
  name: value,
  isChecked: value === `everything`
});

export const TRANSPORT_TYPES = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);

export const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};
