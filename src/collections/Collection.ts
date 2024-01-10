import { Store } from "./Store"

export interface CollectionStore extends Object { 
    items: []
}

class Collection extends Store<CollectionStore> {
    protected data(): CollectionStore {
        return {            
            items: []
        };
    }

    get() {
        return this.state.items
    }
}

export const collection:Collection = new Collection()