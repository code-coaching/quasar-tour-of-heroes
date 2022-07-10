import { ref, Ref } from 'vue';

interface Property {
  description?: string;
  value?: boolean;
}

export type ComponentApi = Record<string, Record<string, Property>>;

const customApi = {
  FlexWrap: {
    dense: {
      value: false,
    },
  },
};

const quasarApi = {
  QBtn: {
    outline: { value: false },
    flat: { value: false },
    unelevated: { value: false },
    rounded: { value: false },
    push: { value: false },
    glossy: { value: false },
    fab: { value: false },
    'fab-mini': { value: false },
    dense: { value: false },
    ripple: { value: false },
    round: { value: false },
  },
  QCheckbox: { dense: { value: false } },
  QColor: {
    square: { value: false },
    flat: { value: false },
    bordered: { value: false },
  },
  QInput: {
    filled: { value: false },
    outlined: { value: false },
    borderless: { value: false },
    standout: { value: false },
    'hide-bottom-space': { value: false },
    rounded: { value: false },
    square: { value: false },
    dense: { value: false },
    'item-aligned': { value: false },
  },
};

const componentApi: Ref<ComponentApi> = ref({
  ...customApi,
  ...quasarApi,
});

const syncProps = ref(false);


const getDefaults = (property: string) => {
  const defaultProps: Record<string, boolean> = {};
  const prop = componentApi.value[property];
  if (prop) {
    const propertyNames = Object.keys(prop);
    propertyNames.forEach((propertyName) => {
      defaultProps[propertyName] = !!componentApi.value[property][propertyName].value;
    });
  }
  return defaultProps;
};

const getPropertyValue = (component: string, property: string) => {
  return componentApi.value[component][property].value;
};

const setMatchingProperties = (property: string, newValue: boolean) => {
  const componentNames = Object.keys(componentApi.value);
  componentNames.forEach((componentName) => {
    const component = componentApi.value[componentName];
    const properties = Object.keys(component);
    properties.forEach((prop) => {
      let matches = [prop];

      const OUTLINED_PROPERTIES = ['outline', 'outlined'];
      if (OUTLINED_PROPERTIES.includes(prop)) matches = OUTLINED_PROPERTIES;

      if (matches.includes(property)) {
        matches.forEach((propertyName) => {
          const matchingProperty = componentApi.value[componentName][propertyName];
          if (matchingProperty) matchingProperty.value = newValue;
        });
      }
    });
  });
};

const setPropertyValue = (component: string, property: string, syncProps = false) => {
  const newValue = !getPropertyValue(component, property);
  if (syncProps) setMatchingProperties(property, newValue)
  else componentApi.value[component][property].value = newValue;
};

export { componentApi, syncProps, getDefaults, getPropertyValue, setPropertyValue };
