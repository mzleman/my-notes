let id = -1;
export default class Dep {
    constructor() {
        this.id = ++id;
        this.subs = []; 
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    removeSub(watcher) {
        const index = this.subs.findIndex(watcher);
        if(index != -1) {
            this.subs.splice(index, 1);
        }
    }
    depend() {
        if(Dep.target !== undefined) {
            this.addSub(Dep.target);
        }
    }
    notify() {
        this.subs.forEach( watcher => {
            watcher.update();
        } )
    }
}