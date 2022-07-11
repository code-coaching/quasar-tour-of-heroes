/* eslint-disable */
const fs = require('fs');
const quasarApi = '../node_modules/quasar/dist/api';
const components = fs.readdirSync(quasarApi);

const COMPONENTS = ['QBtn', 'QInput', 'QCheckbox', 'QColor'];
const PROP_TYPES = ['Boolean'];
const EXCLUDE_PROPS = ['dark'];

let api = {};
components.forEach((fileName) => {
  const component = require(`${quasarApi}/${fileName}`);
  const name = fileName.replace('.json', '');
  if (component.props) {
    PROP_TYPES.forEach((propType) => {
      const styleProps = Object.keys(component.props)
        .filter((key) => component.props[key].category === 'style')
        .filter((key) => {
          let match = false;

          const type = component.props[key].type;
          if (typeof type === 'object' && type.length) {
            match = type.includes(propType);
          } else {
            switch (propType) {
              case 'Boolean':
              case 'String':
              case 'Number':
                match = type === propType;
                break;
            }
          }
          return match;
        })
        .map((key) => {
          const prop = {
            name: key,
            description: component.props[key].desc,
          };
          if (component.props[key].type === 'Boolean') {
            prop.value = false;
          }
          if (component.props[key].type.length) {
            if (component.props[key].type.includes('Boolean')) {
              prop.value = false;
            }
          }
          return prop;
        });

      api[name] = api[name] || {};
      if (styleProps.length) {
        styleProps.forEach((prop) => {
          if (COMPONENTS.includes(name) && !EXCLUDE_PROPS.includes(prop.name)) {
            api[name][prop.name] = {
              // description: prop.description,
              value: prop.value,
            };
          }
        });
      }
    });
  }
});

const filteredKeys = Object.keys(api).filter(
  (item) => Object.values(api[item]).length
);

const filteredApi = {};
filteredKeys.forEach((key) => (filteredApi[key] = api[key]));

fs.writeFile('extracted-api.json', JSON.stringify(filteredApi), (err) => {
  if (err) console.error('error: ', err);
});
console.log('Result saved to extracted-api.json!');
