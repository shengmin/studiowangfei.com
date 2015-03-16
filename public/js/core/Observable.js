
  function Subscription(observable            , key        , eventName        , callback) {"use strict";
    this.$Subscription_observable = observable;
    this.key = key;
    this.callback = callback;
    this.eventName = eventName;
  }

  Object.defineProperty(Subscription.prototype,"unsubscribe",{writable:true,configurable:true,value:function()       {"use strict";
    this.$Subscription_observable.removeSubscription(this);
  }});



  function Observable() {"use strict";
    this.$Observable_subscriptionsByEventName = {};
  }

  Object.defineProperty(Observable.prototype,"triggerEvent",{writable:true,configurable:true,value:function(eventName        , a, b, c, d, e)       {"use strict";
    var subscriptions = this.$Observable_subscriptionsByEventName[eventName];
    if (!subscriptions) {
      return;
    }

    for (var i = subscriptions.length - 1; i >= 0; i--) {
      var subscription = subscriptions[i];
      if (!subscription) {
        continue;
      }

      subscription.callback(a, b, c, d, e);
    }
  }});

  Object.defineProperty(Observable.prototype,"addListener",{writable:true,configurable:true,value:function(eventName        , callback)               {"use strict";
    var subscriptions = this.$Observable_subscriptionsByEventName[eventName];
    if (!subscriptions) {
      subscriptions = this.$Observable_subscriptionsByEventName[eventName] = [];
    }

    var key = subscriptions.length;
    var subscription = new Subscription(this, key, eventName, callback);
    subscriptions.push(subscription);
    return subscription;
  }});

  Object.defineProperty(Observable.prototype,"removeSubscription",{writable:true,configurable:true,value:function(subscription              )             {"use strict";
    var subscriptions =
      this.$Observable_subscriptionsByEventName[subscription.eventName];
    if (!subscriptions) {
      return this;
    }

    if (subscriptions) {
      this.subscriptions[subscription.key] = null;
    }

    return this;
  }});

  Object.defineProperty(Observable,"withEventMethods",{writable:true,configurable:true,value:function(
events               ,
    type       
  )        {"use strict";
    var proto = type.prototype || type;
    events.forEach(function(eventName)  {
      proto['on' + eventName] = function(callback) {
        return this['_observable'].addListener(eventName, callback);
      };

      proto['trigger' + eventName] = function(a, b, c, d, e) {
        this['_observable'].triggerEvent(eventName, a, b, c, d, e);
      }
    }.bind(this));

    return type;
  }});


module.exports = Observable;
