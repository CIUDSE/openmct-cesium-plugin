export default function ExamplePlugin(options) {
  return function install(openmct) {
    console.log("Example plugin installed", options);

    openmct.objects.addRoot({
      namespace: 'example',
      key: 'spacecraft'
    });

    openmct.types.addType('example.altitude', {
      name: 'Altitude Telemetry Point',
      description: 'An example altitude telemetry point.',
      cssClass: 'icon-telemetry'
    });

    openmct.objects.addProvider('example', {
      get: function (identifier) {
        if (identifier.key === 'spacecraft') {
          return Promise.resolve({
            identifier: identifier,
            name: 'Example Spacecraft',
            type: 'folder',
            location: 'ROOT'
          });
        } else if (identifier.key == 'altitude') {
          return Promise.resolve({
            identifier: identifier,
            name: 'Altitude',
            type: 'example.altitude',
            telemetry: {
              values: [
                {
                  key: 'utc',
                  source: 'timestamp',
                  name: 'Timestamp',
                  format: 'utc',
                  hints: {
                    domain: 1
                  }
                },
                {
                  key: 'value',
                  name: 'Value',
                  units: 'm',
                  format: 'float',
                  hints: {
                    range: 1
                  }
                }
              ]
            }
          });
        }
      }
    });

    openmct.composition.addProvider({
      appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === 'example';
      },
      load: function (domainObject) {
        if (domainObject.identifier.key === 'spacecraft') {
          return Promise.resolve([
            {
              namespace: 'example',
              key: 'altitude'
            }
          ]);
        } else {
          return Promise.resolve([]);
        }
      }
    });

    openmct.telemetry.addProvider({
      supportsSubscribe: function (domainObject) {
        return domainObject.type === 'example.altitude';
      },
      subscribe: function (domainObject, f) {
        var interval = setInterval(function () {
          var datum = {
            value: Math.random() * 100,
            timestamp: Date.now()
          };
          f(datum);
        }, 1000);

        return function unsubscribe() {
          clearInterval(interval);
        };
      }
    })
  }
}