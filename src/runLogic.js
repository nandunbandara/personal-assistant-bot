const InitClient = require('initai-node')

module.exports = function runLogic(eventData) {
  return new Promise((resolve) => {
    const client = InitClient.create(eventData, {succeed: resolve})

      const handleGreeting = client.createStep({
        satisfied() { return false; },
        prompt(){
          client.addResponse('greeting');
          client.done();
        }
      })

      const handleGoodbye = client.createStep({
        satisfied() { return false; },
        prompt(){
          client.addResponse('goodbye');
          client.done();
        }
      })

      client.runFlow({
        streams:{
          goodbye: handleGoodbye,
            greeting: handleGreeting
        },
          classifications:{
            goodbye: 'goodbye',
            greeting: 'greeting'
          }
      })
  })
}
