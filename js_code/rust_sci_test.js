/* tslint:disable */
import * as wasm from './rust_sci_test_bg';

const TextEncoder = typeof self === 'object' && self.TextEncoder
    ? self.TextEncoder
    : require('util').TextEncoder;

let cachedEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {
    
    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

const stack = [];

function addBorrowedObject(obj) {
    stack.push(obj);
    return ((stack.length - 1) << 1) | 1;
}

const TextDecoder = typeof self === 'object' && self.TextDecoder
    ? self.TextDecoder
    : require('util').TextDecoder;

let cachedDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

const __wbg_forEach_770bf5e7b0c372ba_target = Array.prototype.forEach  || function() {
    throw new Error(`wasm-bindgen: Array.prototype.forEach does not exist`);
} ;

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];
        
        return val.obj;
        
    }
}

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];
    
    slab_next = next;
    
    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

function getGlobalArgument(arg) {
    const idx = globalArgumentPtr() / 4 + arg;
    return getUint32Memory()[idx];
}

export function __wbg_forEach_770bf5e7b0c372ba(arg0, arg1) {
    let cbarg1 = function(arg0, arg1, arg2) {
        let a = this.a;
        this.a = 0;
        try {
            return this.f(a, this.b, addHeapObject(arg0), arg1, addHeapObject(arg2));
            
        } finally {
            this.a = a;
            
        }
        
    };
    cbarg1.f = wasm.__wbg_function_table.get(arg1);
    cbarg1.a = getGlobalArgument(0);
    cbarg1.b = getGlobalArgument(0 + 1);
    try {
        __wbg_forEach_770bf5e7b0c372ba_target.call(getObject(arg0), cbarg1.bind(cbarg1));
    } finally {
        cbarg1.a = cbarg1.b = 0;
        
    }
}

const __wbg_toString_939e7c21a76f6f00_target = Array.prototype.toString  || function() {
    throw new Error(`wasm-bindgen: Array.prototype.toString does not exist`);
} ;

export function __wbg_toString_939e7c21a76f6f00(arg0) {
    return addHeapObject(__wbg_toString_939e7c21a76f6f00_target.call(getObject(arg0)));
}

const __wbg_forEach_a166588e85ea14f2_target = Float32Array.prototype.forEach  || function() {
    throw new Error(`wasm-bindgen: Float32Array.prototype.forEach does not exist`);
} ;

export function __wbg_forEach_a166588e85ea14f2(arg0, arg1) {
    let cbarg1 = function(arg0, arg1, arg2) {
        let a = this.a;
        this.a = 0;
        try {
            return this.f(a, this.b, arg0, arg1, addHeapObject(arg2));
            
        } finally {
            this.a = a;
            
        }
        
    };
    cbarg1.f = wasm.__wbg_function_table.get(arg1);
    cbarg1.a = getGlobalArgument(0);
    cbarg1.b = getGlobalArgument(0 + 1);
    try {
        __wbg_forEach_a166588e85ea14f2_target.call(getObject(arg0), cbarg1.bind(cbarg1));
    } finally {
        cbarg1.a = cbarg1.b = 0;
        
    }
}

class ConstructorToken {
    constructor(ptr) {
        this.ptr = ptr;
    }
}
/**
*/
export class Nd {
    
    static __construct(ptr) {
        return new Nd(new ConstructorToken(ptr));
    }
    
    constructor(...args) {
        if (args.length === 1 && args[0] instanceof ConstructorToken) {
            this.ptr = args[0].ptr;
            return;
        }
        
        // This invocation of new will call this constructor with a ConstructorToken
        let instance = Nd.make(...args);
        this.ptr = instance.ptr;
    }
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_nd_free(ptr);
    }
    /**
    * @param {string} arg0
    * @returns {Nd}
    */
    static from_arg(arg0) {
        const [ptr0, len0] = passStringToWasm(arg0);
        try {
            return Nd.__construct(wasm.nd_from_arg(ptr0, len0));
            
        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);
            
        }
        
    }
    /**
    * @param {any} arg0
    * @param {any} arg1
    * @returns {Nd}
    */
    static from_ab(arg0, arg1) {
        try {
            return Nd.__construct(wasm.nd_from_ab(addBorrowedObject(arg0), addBorrowedObject(arg1)));
            
        } finally {
            stack.pop();
            stack.pop();
            
        }
        
    }
    /**
    * @param {any} arg0
    * @returns {Nd}
    */
    static make(arg0) {
        try {
            return Nd.__construct(wasm.nd_make(addBorrowedObject(arg0)));
            
        } finally {
            stack.pop();
            
        }
        
    }
    /**
    * @param {Nd} arg0
    * @returns {Nd}
    */
    add(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return Nd.__construct(wasm.nd_add(this.ptr, arg0.ptr));
    }
    /**
    * @param {Nd} arg0
    * @returns {Nd}
    */
    dot(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return Nd.__construct(wasm.nd_dot(this.ptr, arg0.ptr));
    }
    /**
    * @param {string} arg0
    * @param {Nd} arg1
    * @returns {Nd}
    */
    op(arg0, arg1) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        const [ptr0, len0] = passStringToWasm(arg0);
        try {
            return Nd.__construct(wasm.nd_op(this.ptr, ptr0, len0, arg1.ptr));
            
        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);
            
        }
        
    }
    /**
    * @param {any} arg0
    * @returns {number}
    */
    get(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        try {
            return wasm.nd_get(this.ptr, addBorrowedObject(arg0));
            
        } finally {
            stack.pop();
            
        }
        
    }
    /**
    * @param {any} arg0
    * @param {number} arg1
    * @returns {void}
    */
    set(arg0, arg1) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        try {
            return wasm.nd_set(this.ptr, addBorrowedObject(arg0), arg1);
            
        } finally {
            stack.pop();
            
        }
        
    }
    /**
    * @returns {string}
    */
    show() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        const retptr = globalArgumentPtr();
        wasm.nd_show(retptr, this.ptr);
        const mem = getUint32Memory();
        const ptr = mem[retptr / 4];
        const len = mem[retptr / 4 + 1];
        
        const realRet = getStringFromWasm(ptr, len).slice();
        wasm.__wbindgen_free(ptr, len * 1);
        return realRet;
        
    }
}

function dropRef(idx) {
    
    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];
    
    obj.cnt -= 1;
    if (obj.cnt > 0) return;
    
    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

export function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number') return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

export function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string') return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

