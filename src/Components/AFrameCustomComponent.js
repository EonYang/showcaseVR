import AFRAME from 'aframe';
import { EventEmitter } from 'events';

function registerComponents() {

    const myEmitter = new EventEmitter();

    AFRAME.registerComponent('changetext', {
        schema: {
            event: { type: 'string' },
            value: { type: 'string' },
            delay: { type: 'number', default: 0 }
        },
        multiple: true,

        init: function () {
            var self = this;
            self.eventHandlerFn = function () {
                // console.log(self.data.event);
                // console.log(self.el.getAttribute("value"));
                self.el.setAttribute('value', self.data.value)
                // console.log(self.el.getAttribute("value"));
            };
            self.el.addEventListener(self.data.event, self.eventHandlerFn)
        }
    });

    AFRAME.registerComponent('show-detail', {
        schema: {
            event: { type: 'string' },
            studentid: { type: 'number' },
        },
        init: function () {
            var self = this;
            self.eventHandlerFn = function () {
                
                
                myEmitter.emit('show-project', self.data.studentid);
                console.log('show-project emitter', self.data.studentid);
            };
            self.el.addEventListener(self.data.event, self.eventHandlerFn)
        }
    });

    return myEmitter;
}

export default registerComponents