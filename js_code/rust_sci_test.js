
/* tslint:disable */
import * as wasm from './rust_sci_test_bg';

let stack = [];

function addBorrowedObject(obj) {
    stack.push(obj);
    return ((stack.length - 1) << 1) | 1;
}

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
/**
*/
export function get_array_rep() {
    const retptr = globalArgumentPtr();
    wasm.get_array_rep(retptr);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    const realRet = getStringFromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 1);
    return realRet;
    
}

/**
*/
export function make_array() {
    return NdArr.__construct(wasm.make_array());
}

let slab = [{ obj: null }, { obj: undefined }, { obj: true }, { obj: false }];

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];
    
    slab_next = next;
    
    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

export function __wbg_f_decodeURI_decode_uri_n(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(decodeURI(varg0));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

export function __wbg_f_decodeURIComponent_decode_uri_component_n(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(decodeURIComponent(varg0));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

export function __wbg_f_encodeURI_encode_uri_n(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(encodeURI(varg0));
}

export function __wbg_f_encodeURIComponent_encode_uri_component_n(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(encodeURIComponent(varg0));
}

export function __wbg_f_eval_eval_n(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(eval(varg0));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];
        
        return val.obj;
        
    }
}

function dropRef(idx) {
    
    let obj = slab[idx >> 1];
    
    obj.cnt -= 1;
    if (obj.cnt > 0) return;
    
    // If we hit 0 then free up our space in the slab
    slab[idx >> 1] = slab_next;
    slab_next = idx >> 1;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropRef(idx);
    return ret;
}

export function __wbg_f_new_new_Uint8Array(arg0) {
    return addHeapObject(new Uint8Array(takeObject(arg0)));
}

const __wbg_f_fill_fill_Uint8Array_target = Uint8Array.prototype.fill;

export function __wbg_f_fill_fill_Uint8Array(arg0, arg1, arg2, arg3) {
    return addHeapObject(__wbg_f_fill_fill_Uint8Array_target.call(getObject(arg0), takeObject(arg1), arg2, arg3));
}

const __wbg_f_copyWithin_copy_within_Array_target = Array.prototype.copyWithin;

export function __wbg_f_copyWithin_copy_within_Array(arg0, arg1, arg2, arg3) {
    return addHeapObject(__wbg_f_copyWithin_copy_within_Array_target.call(getObject(arg0), arg1, arg2, arg3));
}

const __wbg_f_concat_concat_Array_target = Array.prototype.concat;

export function __wbg_f_concat_concat_Array(arg0, arg1) {
    return addHeapObject(__wbg_f_concat_concat_Array_target.call(getObject(arg0), getObject(arg1)));
}

const __wbg_f_every_every_Array_target = Array.prototype.every;

function getGlobalArgument(arg) {
    const idx = globalArgumentPtr() / 4 + arg;
    return getUint32Memory()[idx];
}

export function __wbg_f_every_every_Array(arg0, arg1) {
    let cbarg1 = function(arg0, arg1, arg2) {
        let a = this.a;
        this.a = 0;
        try {
            return (this.f(a, this.b, addHeapObject(arg0), arg1, addHeapObject(arg2))) !== 0;
            
        } finally {
            this.a = a;
            
        }
        
    };
    cbarg1.f = wasm.__wbg_function_table.get(arg1);
    cbarg1.a = getGlobalArgument(0);
    cbarg1.b = getGlobalArgument(0 + 1);
    try {
        return __wbg_f_every_every_Array_target.call(getObject(arg0), cbarg1.bind(cbarg1)) ? 1 : 0;
    } finally {
        cbarg1.a = cbarg1.b = 0;
        
    }
}

const __wbg_f_fill_fill_Array_target = Array.prototype.fill;

export function __wbg_f_fill_fill_Array(arg0, arg1, arg2, arg3) {
    return addHeapObject(__wbg_f_fill_fill_Array_target.call(getObject(arg0), takeObject(arg1), arg2, arg3));
}

const __wbg_f_filter_filter_Array_target = Array.prototype.filter;

export function __wbg_f_filter_filter_Array(arg0, arg1) {
    let cbarg1 = function(arg0, arg1, arg2) {
        let a = this.a;
        this.a = 0;
        try {
            return (this.f(a, this.b, addHeapObject(arg0), arg1, addHeapObject(arg2))) !== 0;
            
        } finally {
            this.a = a;
            
        }
        
    };
    cbarg1.f = wasm.__wbg_function_table.get(arg1);
    cbarg1.a = getGlobalArgument(0);
    cbarg1.b = getGlobalArgument(0 + 1);
    try {
        return addHeapObject(__wbg_f_filter_filter_Array_target.call(getObject(arg0), cbarg1.bind(cbarg1)));
    } finally {
        cbarg1.a = cbarg1.b = 0;
        
    }
}

const __wbg_f_includes_includes_Array_target = Array.prototype.includes;

export function __wbg_f_includes_includes_Array(arg0, arg1, arg2) {
    return __wbg_f_includes_includes_Array_target.call(getObject(arg0), takeObject(arg1), arg2) ? 1 : 0;
}

const __wbg_f_indexOf_index_of_Array_target = Array.prototype.indexOf;

export function __wbg_f_indexOf_index_of_Array(arg0, arg1, arg2) {
    return __wbg_f_indexOf_index_of_Array_target.call(getObject(arg0), takeObject(arg1), arg2);
}

const __wbg_f_isArray_is_array_Array_target = Array.isArray;

export function __wbg_f_isArray_is_array_Array(arg0) {
    return __wbg_f_isArray_is_array_Array_target(getObject(arg0)) ? 1 : 0;
}

const __wbg_f_join_join_Array_target = Array.prototype.join;

export function __wbg_f_join_join_Array(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(__wbg_f_join_join_Array_target.call(getObject(arg0), varg1));
}

const __wbg_f_lastIndexOf_last_index_of_Array_target = Array.prototype.lastIndexOf;

export function __wbg_f_lastIndexOf_last_index_of_Array(arg0, arg1, arg2) {
    return __wbg_f_lastIndexOf_last_index_of_Array_target.call(getObject(arg0), takeObject(arg1), arg2);
}

const __wbg_f_length_length_Array_target = function() {
    return this.length;
};

export function __wbg_f_length_length_Array(arg0) {
    return __wbg_f_length_length_Array_target.call(getObject(arg0));
}

const __wbg_f_pop_pop_Array_target = Array.prototype.pop;

export function __wbg_f_pop_pop_Array(arg0) {
    return addHeapObject(__wbg_f_pop_pop_Array_target.call(getObject(arg0)));
}

const __wbg_f_push_push_Array_target = Array.prototype.push;

export function __wbg_f_push_push_Array(arg0, arg1) {
    return __wbg_f_push_push_Array_target.call(getObject(arg0), takeObject(arg1));
}

const __wbg_f_reverse_reverse_Array_target = Array.prototype.reverse;

export function __wbg_f_reverse_reverse_Array(arg0) {
    return addHeapObject(__wbg_f_reverse_reverse_Array_target.call(getObject(arg0)));
}

const __wbg_f_shift_shift_Array_target = Array.prototype.shift;

export function __wbg_f_shift_shift_Array(arg0) {
    return addHeapObject(__wbg_f_shift_shift_Array_target.call(getObject(arg0)));
}

const __wbg_f_slice_slice_Array_target = Array.prototype.slice;

export function __wbg_f_slice_slice_Array(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_slice_slice_Array_target.call(getObject(arg0), arg1, arg2));
}

const __wbg_f_some_some_Array_target = Array.prototype.some;

export function __wbg_f_some_some_Array(arg0, arg1) {
    let cbarg1 = function(arg0) {
        let a = this.a;
        this.a = 0;
        try {
            return (this.f(a, this.b, addHeapObject(arg0))) !== 0;
            
        } finally {
            this.a = a;
            
        }
        
    };
    cbarg1.f = wasm.__wbg_function_table.get(arg1);
    cbarg1.a = getGlobalArgument(0);
    cbarg1.b = getGlobalArgument(0 + 1);
    try {
        return __wbg_f_some_some_Array_target.call(getObject(arg0), cbarg1.bind(cbarg1)) ? 1 : 0;
    } finally {
        cbarg1.a = cbarg1.b = 0;
        
    }
}

const __wbg_f_sort_sort_Array_target = Array.prototype.sort;

export function __wbg_f_sort_sort_Array(arg0) {
    return addHeapObject(__wbg_f_sort_sort_Array_target.call(getObject(arg0)));
}

const __wbg_f_toString_to_string_Array_target = Array.prototype.toString;

export function __wbg_f_toString_to_string_Array(arg0) {
    return addHeapObject(__wbg_f_toString_to_string_Array_target.call(getObject(arg0)));
}

const __wbg_f_unshift_unshift_Array_target = Array.prototype.unshift;

export function __wbg_f_unshift_unshift_Array(arg0, arg1) {
    return __wbg_f_unshift_unshift_Array_target.call(getObject(arg0), takeObject(arg1));
}

export function __wbg_f_new_new_ArrayBuffer(arg0) {
    return addHeapObject(new ArrayBuffer(arg0));
}

const __wbg_f_isView_is_view_ArrayBuffer_target = ArrayBuffer.isView;

export function __wbg_f_isView_is_view_ArrayBuffer(arg0) {
    return __wbg_f_isView_is_view_ArrayBuffer_target(takeObject(arg0)) ? 1 : 0;
}

const __wbg_f_slice_slice_ArrayBuffer_target = ArrayBuffer.prototype.slice;

export function __wbg_f_slice_slice_ArrayBuffer(arg0, arg1) {
    return addHeapObject(__wbg_f_slice_slice_ArrayBuffer_target.call(getObject(arg0), arg1));
}

const __wbg_f_slice_slice_with_end_ArrayBuffer_target = ArrayBuffer.prototype.slice;

export function __wbg_f_slice_slice_with_end_ArrayBuffer(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_slice_slice_with_end_ArrayBuffer_target.call(getObject(arg0), arg1, arg2));
}

const __wbg_f_keys_keys_Array_target = Array.prototype.keys;

export function __wbg_f_keys_keys_Array(arg0) {
    return addHeapObject(__wbg_f_keys_keys_Array_target.call(getObject(arg0)));
}

const __wbg_f_entries_entries_Array_target = Array.prototype.entries;

export function __wbg_f_entries_entries_Array(arg0) {
    return addHeapObject(__wbg_f_entries_entries_Array_target.call(getObject(arg0)));
}

export function __wbg_f_new_new_Boolean(arg0) {
    return addHeapObject(new Boolean(takeObject(arg0)));
}

const __wbg_f_valueOf_value_of_Boolean_target = Boolean.prototype.valueOf;

export function __wbg_f_valueOf_value_of_Boolean(arg0) {
    return __wbg_f_valueOf_value_of_Boolean_target.call(getObject(arg0)) ? 1 : 0;
}

export function __wbg_f_new_new_Error(arg0) {
    return addHeapObject(new Error(getObject(arg0)));
}

const __wbg_f_message_message_Error_target = function() {
    return this.message;
};

export function __wbg_f_message_message_Error(arg0) {
    return addHeapObject(__wbg_f_message_message_Error_target.call(getObject(arg0)));
}

const __wbg_f_set_message_set_message_Error_target = function(y) {
    this.message = y;
};

export function __wbg_f_set_message_set_message_Error(arg0, arg1) {
    __wbg_f_set_message_set_message_Error_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_f_name_name_Error_target = function() {
    return this.name;
};

export function __wbg_f_name_name_Error(arg0) {
    return addHeapObject(__wbg_f_name_name_Error_target.call(getObject(arg0)));
}

const __wbg_f_set_name_set_name_Error_target = function(y) {
    this.name = y;
};

export function __wbg_f_set_name_set_name_Error(arg0, arg1) {
    __wbg_f_set_name_set_name_Error_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_f_toString_to_string_Error_target = Error.prototype.toString;

export function __wbg_f_toString_to_string_Error(arg0) {
    return addHeapObject(__wbg_f_toString_to_string_Error_target.call(getObject(arg0)));
}

const __wbg_f_apply_apply_Function_target = Function.prototype.apply;

export function __wbg_f_apply_apply_Function(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_apply_apply_Function_target.call(getObject(arg0), getObject(arg1), getObject(arg2)));
}

const __wbg_f_bind_bind_Function_target = Function.prototype.bind;

export function __wbg_f_bind_bind_Function(arg0, arg1) {
    return addHeapObject(__wbg_f_bind_bind_Function_target.call(getObject(arg0), getObject(arg1)));
}

const __wbg_f_length_length_Function_target = function() {
    return this.length;
};

export function __wbg_f_length_length_Function(arg0) {
    return __wbg_f_length_length_Function_target.call(getObject(arg0));
}

const __wbg_f_name_name_Function_target = function() {
    return this.name;
};

export function __wbg_f_name_name_Function(arg0) {
    return addHeapObject(__wbg_f_name_name_Function_target.call(getObject(arg0)));
}

const __wbg_f_toString_to_string_Function_target = Function.prototype.toString;

export function __wbg_f_toString_to_string_Function(arg0) {
    return addHeapObject(__wbg_f_toString_to_string_Function_target.call(getObject(arg0)));
}

const __wbg_f_next_next_Generator_target = function(x0) {
    return this.next(x0);
};

export function __wbg_f_next_next_Generator(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_f_next_next_Generator_target.call(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

const __wbg_f_return_return__Generator_target = function(x0) {
    return this.return(x0);
};

export function __wbg_f_return_return__Generator(arg0, arg1) {
    return addHeapObject(__wbg_f_return_return__Generator_target.call(getObject(arg0), getObject(arg1)));
}

const __wbg_f_throw_throw_Generator_target = function(x0) {
    return this.throw(x0);
};

export function __wbg_f_throw_throw_Generator(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_f_throw_throw_Generator_target.call(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

const __wbg_f_clear_clear_Map_target = Map.prototype.clear;

export function __wbg_f_clear_clear_Map(arg0) {
    __wbg_f_clear_clear_Map_target.call(getObject(arg0));
}

const __wbg_f_delete_delete_Map_target = Map.prototype.delete;

export function __wbg_f_delete_delete_Map(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return __wbg_f_delete_delete_Map_target.call(getObject(arg0), varg1) ? 1 : 0;
}

const __wbg_f_get_get_Map_target = Map.prototype.get;

export function __wbg_f_get_get_Map(arg0, arg1) {
    return addHeapObject(__wbg_f_get_get_Map_target.call(getObject(arg0), getObject(arg1)));
}

const __wbg_f_has_has_Map_target = Map.prototype.has;

export function __wbg_f_has_has_Map(arg0, arg1) {
    return __wbg_f_has_has_Map_target.call(getObject(arg0), getObject(arg1)) ? 1 : 0;
}

export function __wbg_f_new_new_Map() {
    return addHeapObject(new Map());
}

const __wbg_f_set_set_Map_target = Map.prototype.set;

export function __wbg_f_set_set_Map(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_set_set_Map_target.call(getObject(arg0), getObject(arg1), getObject(arg2)));
}

const __wbg_f_size_size_Map_target = function() {
    return this.size;
};

export function __wbg_f_size_size_Map(arg0) {
    return __wbg_f_size_size_Map_target.call(getObject(arg0));
}

const __wbg_f_entries_entries_Map_target = Map.prototype.entries;

export function __wbg_f_entries_entries_Map(arg0) {
    return addHeapObject(__wbg_f_entries_entries_Map_target.call(getObject(arg0)));
}

const __wbg_f_keys_keys_Map_target = Map.prototype.keys;

export function __wbg_f_keys_keys_Map(arg0) {
    return addHeapObject(__wbg_f_keys_keys_Map_target.call(getObject(arg0)));
}

const __wbg_f_values_values_Map_target = Map.prototype.values;

export function __wbg_f_values_values_Map(arg0) {
    return addHeapObject(__wbg_f_values_values_Map_target.call(getObject(arg0)));
}

const __wbg_f_abs_abs_Math_target = Math.abs;

export function __wbg_f_abs_abs_Math(arg0) {
    return __wbg_f_abs_abs_Math_target(arg0);
}

const __wbg_f_acos_acos_Math_target = Math.acos;

export function __wbg_f_acos_acos_Math(arg0) {
    return __wbg_f_acos_acos_Math_target(arg0);
}

const __wbg_f_acosh_acosh_Math_target = Math.acosh;

export function __wbg_f_acosh_acosh_Math(arg0) {
    return __wbg_f_acosh_acosh_Math_target(arg0);
}

const __wbg_f_asin_asin_Math_target = Math.asin;

export function __wbg_f_asin_asin_Math(arg0) {
    return __wbg_f_asin_asin_Math_target(arg0);
}

const __wbg_f_asinh_asinh_Math_target = Math.asinh;

export function __wbg_f_asinh_asinh_Math(arg0) {
    return __wbg_f_asinh_asinh_Math_target(arg0);
}

const __wbg_f_atan_atan_Math_target = Math.atan;

export function __wbg_f_atan_atan_Math(arg0) {
    return __wbg_f_atan_atan_Math_target(arg0);
}

const __wbg_f_atan2_atan2_Math_target = Math.atan2;

export function __wbg_f_atan2_atan2_Math(arg0, arg1) {
    return __wbg_f_atan2_atan2_Math_target(arg0, arg1);
}

const __wbg_f_atanh_atanh_Math_target = Math.atanh;

export function __wbg_f_atanh_atanh_Math(arg0) {
    return __wbg_f_atanh_atanh_Math_target(arg0);
}

const __wbg_f_cbrt_cbrt_Math_target = Math.cbrt;

export function __wbg_f_cbrt_cbrt_Math(arg0) {
    return __wbg_f_cbrt_cbrt_Math_target(arg0);
}

const __wbg_f_ceil_ceil_Math_target = Math.ceil;

export function __wbg_f_ceil_ceil_Math(arg0) {
    return __wbg_f_ceil_ceil_Math_target(arg0);
}

const __wbg_f_clz32_clz32_Math_target = Math.clz32;

export function __wbg_f_clz32_clz32_Math(arg0) {
    return __wbg_f_clz32_clz32_Math_target(arg0);
}

const __wbg_f_cos_cos_Math_target = Math.cos;

export function __wbg_f_cos_cos_Math(arg0) {
    return __wbg_f_cos_cos_Math_target(arg0);
}

const __wbg_f_cosh_cosh_Math_target = Math.cosh;

export function __wbg_f_cosh_cosh_Math(arg0) {
    return __wbg_f_cosh_cosh_Math_target(arg0);
}

const __wbg_f_exp_exp_Math_target = Math.exp;

export function __wbg_f_exp_exp_Math(arg0) {
    return __wbg_f_exp_exp_Math_target(arg0);
}

const __wbg_f_expm1_expm1_Math_target = Math.expm1;

export function __wbg_f_expm1_expm1_Math(arg0) {
    return __wbg_f_expm1_expm1_Math_target(arg0);
}

const __wbg_f_floor_floor_Math_target = Math.floor;

export function __wbg_f_floor_floor_Math(arg0) {
    return __wbg_f_floor_floor_Math_target(arg0);
}

const __wbg_f_fround_fround_Math_target = Math.fround;

export function __wbg_f_fround_fround_Math(arg0) {
    return __wbg_f_fround_fround_Math_target(arg0);
}

const __wbg_f_imul_imul_Math_target = Math.imul;

export function __wbg_f_imul_imul_Math(arg0, arg1) {
    return __wbg_f_imul_imul_Math_target(arg0, arg1);
}

const __wbg_f_log_log_Math_target = Math.log;

export function __wbg_f_log_log_Math(arg0) {
    return __wbg_f_log_log_Math_target(arg0);
}

const __wbg_f_log10_log10_Math_target = Math.log10;

export function __wbg_f_log10_log10_Math(arg0) {
    return __wbg_f_log10_log10_Math_target(arg0);
}

const __wbg_f_log1p_log1p_Math_target = Math.log1p;

export function __wbg_f_log1p_log1p_Math(arg0) {
    return __wbg_f_log1p_log1p_Math_target(arg0);
}

const __wbg_f_log2_log2_Math_target = Math.log2;

export function __wbg_f_log2_log2_Math(arg0) {
    return __wbg_f_log2_log2_Math_target(arg0);
}

const __wbg_f_pow_pow_Math_target = Math.pow;

export function __wbg_f_pow_pow_Math(arg0, arg1) {
    return __wbg_f_pow_pow_Math_target(arg0, arg1);
}

const __wbg_f_round_round_Math_target = Math.round;

export function __wbg_f_round_round_Math(arg0) {
    return __wbg_f_round_round_Math_target(arg0);
}

const __wbg_f_sign_sign_Math_target = Math.sign;

export function __wbg_f_sign_sign_Math(arg0) {
    return __wbg_f_sign_sign_Math_target(arg0);
}

const __wbg_f_sin_sin_Math_target = Math.sin;

export function __wbg_f_sin_sin_Math(arg0) {
    return __wbg_f_sin_sin_Math_target(arg0);
}

const __wbg_f_sinh_sinh_Math_target = Math.sinh;

export function __wbg_f_sinh_sinh_Math(arg0) {
    return __wbg_f_sinh_sinh_Math_target(arg0);
}

const __wbg_f_sqrt_sqrt_Math_target = Math.sqrt;

export function __wbg_f_sqrt_sqrt_Math(arg0) {
    return __wbg_f_sqrt_sqrt_Math_target(arg0);
}

const __wbg_f_tan_tan_Math_target = Math.tan;

export function __wbg_f_tan_tan_Math(arg0) {
    return __wbg_f_tan_tan_Math_target(arg0);
}

const __wbg_f_tanh_tanh_Math_target = Math.tanh;

export function __wbg_f_tanh_tanh_Math(arg0) {
    return __wbg_f_tanh_tanh_Math_target(arg0);
}

const __wbg_f_trunc_trunc_Math_target = Math.trunc;

export function __wbg_f_trunc_trunc_Math(arg0) {
    return __wbg_f_trunc_trunc_Math_target(arg0);
}

const __wbg_f_isInteger_is_integer_Number_target = Number.isInteger;

export function __wbg_f_isInteger_is_integer_Number(arg0) {
    return __wbg_f_isInteger_is_integer_Number_target(getObject(arg0)) ? 1 : 0;
}

export function __wbg_f_new_new_Number(arg0) {
    return addHeapObject(new Number(takeObject(arg0)));
}

const __wbg_f_toLocaleString_to_locale_string_Number_target = Number.prototype.toLocaleString;

export function __wbg_f_toLocaleString_to_locale_string_Number(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(__wbg_f_toLocaleString_to_locale_string_Number_target.call(getObject(arg0), varg1));
}

const __wbg_f_toPrecision_to_precision_Number_target = Number.prototype.toPrecision;

export function __wbg_f_toPrecision_to_precision_Number(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_f_toPrecision_to_precision_Number_target.call(getObject(arg0), arg1));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

const __wbg_f_toFixed_to_fixed_Number_target = Number.prototype.toFixed;

export function __wbg_f_toFixed_to_fixed_Number(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_f_toFixed_to_fixed_Number_target.call(getObject(arg0), arg1));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

const __wbg_f_toExponential_to_exponential_Number_target = Number.prototype.toExponential;

export function __wbg_f_toExponential_to_exponential_Number(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_f_toExponential_to_exponential_Number_target.call(getObject(arg0), arg1));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

const __wbg_f_toString_to_string_Number_target = Number.prototype.toString;

export function __wbg_f_toString_to_string_Number(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_f_toString_to_string_Number_target.call(getObject(arg0), arg1));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);
        
    }
}

const __wbg_f_valueOf_value_of_Number_target = Number.prototype.valueOf;

export function __wbg_f_valueOf_value_of_Number(arg0) {
    return __wbg_f_valueOf_value_of_Number_target.call(getObject(arg0));
}

const __wbg_f_getDate_get_date_Date_target = Date.prototype.getDate;

export function __wbg_f_getDate_get_date_Date(arg0) {
    return __wbg_f_getDate_get_date_Date_target.call(getObject(arg0));
}

const __wbg_f_getDay_get_day_Date_target = Date.prototype.getDay;

export function __wbg_f_getDay_get_day_Date(arg0) {
    return __wbg_f_getDay_get_day_Date_target.call(getObject(arg0));
}

const __wbg_f_getFullYear_get_full_year_Date_target = Date.prototype.getFullYear;

export function __wbg_f_getFullYear_get_full_year_Date(arg0) {
    return __wbg_f_getFullYear_get_full_year_Date_target.call(getObject(arg0));
}

export function __wbg_f_new_new_Date() {
    return addHeapObject(new Date());
}

const __wbg_f_now_now_Date_target = Date.now;

export function __wbg_f_now_now_Date() {
    return __wbg_f_now_now_Date_target();
}

const __wbg_f_toDateString_to_date_string_Date_target = Date.prototype.toDateString;

export function __wbg_f_toDateString_to_date_string_Date(arg0) {
    return addHeapObject(__wbg_f_toDateString_to_date_string_Date_target.call(getObject(arg0)));
}

const __wbg_f_toISOString_to_iso_string_Date_target = Date.prototype.toISOString;

export function __wbg_f_toISOString_to_iso_string_Date(arg0) {
    return addHeapObject(__wbg_f_toISOString_to_iso_string_Date_target.call(getObject(arg0)));
}

const __wbg_f_toJSON_to_json_Date_target = Date.prototype.toJSON;

export function __wbg_f_toJSON_to_json_Date(arg0) {
    return addHeapObject(__wbg_f_toJSON_to_json_Date_target.call(getObject(arg0)));
}

const __wbg_f_toLocaleDateString_to_locale_date_string_Date_target = Date.prototype.toLocaleDateString;

export function __wbg_f_toLocaleDateString_to_locale_date_string_Date(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_toLocaleDateString_to_locale_date_string_Date_target.call(getObject(arg0), takeObject(arg1), takeObject(arg2)));
}

const __wbg_f_toLocaleString_to_locale_string_Date_target = Date.prototype.toLocaleString;

export function __wbg_f_toLocaleString_to_locale_string_Date(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_toLocaleString_to_locale_string_Date_target.call(getObject(arg0), takeObject(arg1), takeObject(arg2)));
}

const __wbg_f_toLocaleTimeString_to_locale_time_string_Date_target = Date.prototype.toLocaleTimeString;

export function __wbg_f_toLocaleTimeString_to_locale_time_string_Date(arg0, arg1) {
    return addHeapObject(__wbg_f_toLocaleTimeString_to_locale_time_string_Date_target.call(getObject(arg0), takeObject(arg1)));
}

const __wbg_f_toString_to_string_Date_target = Date.prototype.toString;

export function __wbg_f_toString_to_string_Date(arg0) {
    return addHeapObject(__wbg_f_toString_to_string_Date_target.call(getObject(arg0)));
}

const __wbg_f_toTimeString_to_time_string_Date_target = Date.prototype.toTimeString;

export function __wbg_f_toTimeString_to_time_string_Date(arg0) {
    return addHeapObject(__wbg_f_toTimeString_to_time_string_Date_target.call(getObject(arg0)));
}

const __wbg_f_toUTCString_to_utc_string_Date_target = Date.prototype.toUTCString;

export function __wbg_f_toUTCString_to_utc_string_Date(arg0) {
    return addHeapObject(__wbg_f_toUTCString_to_utc_string_Date_target.call(getObject(arg0)));
}

const __wbg_f_UTC_utc_Date_target = Date.UTC;

export function __wbg_f_UTC_utc_Date(arg0, arg1) {
    return __wbg_f_UTC_utc_Date_target(arg0, arg1);
}

const __wbg_f_valueOf_value_of_Date_target = Date.prototype.valueOf;

export function __wbg_f_valueOf_value_of_Date(arg0) {
    return addHeapObject(__wbg_f_valueOf_value_of_Date_target.call(getObject(arg0)));
}

const __wbg_f_hasOwnProperty_has_own_property_Object_target = Object.prototype.hasOwnProperty;

export function __wbg_f_hasOwnProperty_has_own_property_Object(arg0, arg1) {
    return __wbg_f_hasOwnProperty_has_own_property_Object_target.call(getObject(arg0), getObject(arg1)) ? 1 : 0;
}

const __wbg_f_isExtensible_is_extensible_Object_target = Object.isExtensible;

export function __wbg_f_isExtensible_is_extensible_Object(arg0) {
    return __wbg_f_isExtensible_is_extensible_Object_target(getObject(arg0)) ? 1 : 0;
}

const __wbg_f_isFrozen_is_frozen_Object_target = Object.isFrozen;

export function __wbg_f_isFrozen_is_frozen_Object(arg0) {
    return __wbg_f_isFrozen_is_frozen_Object_target(getObject(arg0)) ? 1 : 0;
}

const __wbg_f_isSealed_is_sealed_Object_target = Object.isSealed;

export function __wbg_f_isSealed_is_sealed_Object(arg0) {
    return __wbg_f_isSealed_is_sealed_Object_target(getObject(arg0)) ? 1 : 0;
}

const __wbg_f_isPrototypeOf_is_prototype_of_Object_target = Object.prototype.isPrototypeOf;

export function __wbg_f_isPrototypeOf_is_prototype_of_Object(arg0, arg1) {
    return __wbg_f_isPrototypeOf_is_prototype_of_Object_target.call(getObject(arg0), getObject(arg1)) ? 1 : 0;
}

const __wbg_f_keys_keys_Object_target = Object.keys;

export function __wbg_f_keys_keys_Object(arg0) {
    return addHeapObject(__wbg_f_keys_keys_Object_target(getObject(arg0)));
}

export function __wbg_f_new_new_Object() {
    return addHeapObject(new Object());
}

const __wbg_f_preventExtensions_prevent_extensions_Object_target = Object.preventExtensions;

export function __wbg_f_preventExtensions_prevent_extensions_Object(arg0) {
    __wbg_f_preventExtensions_prevent_extensions_Object_target(getObject(arg0));
}

const __wbg_f_propertyIsEnumerable_property_is_enumerable_Object_target = Object.prototype.propertyIsEnumerable;

export function __wbg_f_propertyIsEnumerable_property_is_enumerable_Object(arg0, arg1) {
    return __wbg_f_propertyIsEnumerable_property_is_enumerable_Object_target.call(getObject(arg0), getObject(arg1)) ? 1 : 0;
}

const __wbg_f_seal_seal_Object_target = Object.seal;

export function __wbg_f_seal_seal_Object(arg0) {
    return addHeapObject(__wbg_f_seal_seal_Object_target(getObject(arg0)));
}

const __wbg_f_setPrototypeOf_set_prototype_of_Object_target = Object.setPrototypeOf;

export function __wbg_f_setPrototypeOf_set_prototype_of_Object(arg0, arg1) {
    return addHeapObject(__wbg_f_setPrototypeOf_set_prototype_of_Object_target(getObject(arg0), getObject(arg1)));
}

const __wbg_f_toLocaleString_to_locale_string_Object_target = Object.prototype.toLocaleString;

export function __wbg_f_toLocaleString_to_locale_string_Object(arg0) {
    return addHeapObject(__wbg_f_toLocaleString_to_locale_string_Object_target.call(getObject(arg0)));
}

const __wbg_f_toString_to_string_Object_target = Object.prototype.toString;

export function __wbg_f_toString_to_string_Object(arg0) {
    return addHeapObject(__wbg_f_toString_to_string_Object_target.call(getObject(arg0)));
}

const __wbg_f_valueOf_value_of_Object_target = Object.prototype.valueOf;

export function __wbg_f_valueOf_value_of_Object(arg0) {
    return addHeapObject(__wbg_f_valueOf_value_of_Object_target.call(getObject(arg0)));
}

const __wbg_f_values_values_Object_target = Object.values;

export function __wbg_f_values_values_Object(arg0) {
    return addHeapObject(__wbg_f_values_values_Object_target(getObject(arg0)));
}

export function __wbg_f_new_new_Proxy(arg0, arg1) {
    return addHeapObject(new Proxy(getObject(arg0), getObject(arg1)));
}

const __wbg_f_revocable_revocable_Proxy_target = Proxy.revocable;

export function __wbg_f_revocable_revocable_Proxy(arg0, arg1) {
    return addHeapObject(__wbg_f_revocable_revocable_Proxy_target(getObject(arg0), getObject(arg1)));
}

const __wbg_f_add_add_Set_target = Set.prototype.add;

export function __wbg_f_add_add_Set(arg0, arg1) {
    return addHeapObject(__wbg_f_add_add_Set_target.call(getObject(arg0), getObject(arg1)));
}

const __wbg_f_clear_clear_Set_target = Set.prototype.clear;

export function __wbg_f_clear_clear_Set(arg0) {
    __wbg_f_clear_clear_Set_target.call(getObject(arg0));
}

const __wbg_f_delete_delete_Set_target = Set.prototype.delete;

export function __wbg_f_delete_delete_Set(arg0, arg1) {
    return __wbg_f_delete_delete_Set_target.call(getObject(arg0), getObject(arg1)) ? 1 : 0;
}

const __wbg_f_has_has_Set_target = Set.prototype.has;

export function __wbg_f_has_has_Set(arg0, arg1) {
    return __wbg_f_has_has_Set_target.call(getObject(arg0), getObject(arg1)) ? 1 : 0;
}

export function __wbg_f_new_new_Set() {
    return addHeapObject(new Set());
}

const __wbg_f_size_size_Set_target = function() {
    return this.size;
};

export function __wbg_f_size_size_Set(arg0) {
    return __wbg_f_size_size_Set_target.call(getObject(arg0));
}

const __wbg_f_entries_entries_Set_target = Set.prototype.entries;

export function __wbg_f_entries_entries_Set(arg0) {
    return addHeapObject(__wbg_f_entries_entries_Set_target.call(getObject(arg0)));
}

const __wbg_f_keys_keys_Set_target = Set.prototype.keys;

export function __wbg_f_keys_keys_Set(arg0) {
    return addHeapObject(__wbg_f_keys_keys_Set_target.call(getObject(arg0)));
}

const __wbg_f_values_values_Set_target = Set.prototype.values;

export function __wbg_f_values_values_Set(arg0) {
    return addHeapObject(__wbg_f_values_values_Set_target.call(getObject(arg0)));
}

export function __wbg_f_new_new_WeakMap() {
    return addHeapObject(new WeakMap());
}

const __wbg_f_set_set_WeakMap_target = WeakMap.prototype.set;

export function __wbg_f_set_set_WeakMap(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_set_set_WeakMap_target.call(getObject(arg0), takeObject(arg1), takeObject(arg2)));
}

const __wbg_f_get_get_WeakMap_target = WeakMap.prototype.get;

export function __wbg_f_get_get_WeakMap(arg0, arg1) {
    return addHeapObject(__wbg_f_get_get_WeakMap_target.call(getObject(arg0), takeObject(arg1)));
}

const __wbg_f_has_has_WeakMap_target = WeakMap.prototype.has;

export function __wbg_f_has_has_WeakMap(arg0, arg1) {
    return __wbg_f_has_has_WeakMap_target.call(getObject(arg0), takeObject(arg1)) ? 1 : 0;
}

const __wbg_f_delete_delete_WeakMap_target = WeakMap.prototype.delete;

export function __wbg_f_delete_delete_WeakMap(arg0, arg1) {
    return __wbg_f_delete_delete_WeakMap_target.call(getObject(arg0), takeObject(arg1)) ? 1 : 0;
}

export function __wbg_f_new_new_WeakSet() {
    return addHeapObject(new WeakSet());
}

const __wbg_f_has_has_WeakSet_target = WeakSet.prototype.has;

export function __wbg_f_has_has_WeakSet(arg0, arg1) {
    return __wbg_f_has_has_WeakSet_target.call(getObject(arg0), takeObject(arg1)) ? 1 : 0;
}

const __wbg_f_add_add_WeakSet_target = WeakSet.prototype.add;

export function __wbg_f_add_add_WeakSet(arg0, arg1) {
    return addHeapObject(__wbg_f_add_add_WeakSet_target.call(getObject(arg0), takeObject(arg1)));
}

const __wbg_f_delete_delete_WeakSet_target = WeakSet.prototype.delete;

export function __wbg_f_delete_delete_WeakSet(arg0, arg1) {
    return __wbg_f_delete_delete_WeakSet_target.call(getObject(arg0), takeObject(arg1)) ? 1 : 0;
}

const __wbg_f_length_length_JsString_target = function() {
    return this.length;
};

export function __wbg_f_length_length_JsString(arg0) {
    return __wbg_f_length_length_JsString_target.call(getObject(arg0));
}

const __wbg_f_charAt_char_at_String_target = String.prototype.charAt;

export function __wbg_f_charAt_char_at_String(arg0, arg1) {
    return addHeapObject(__wbg_f_charAt_char_at_String_target.call(getObject(arg0), arg1));
}

const __wbg_f_charCodeAt_char_code_at_String_target = String.prototype.charCodeAt;

export function __wbg_f_charCodeAt_char_code_at_String(arg0, arg1) {
    return __wbg_f_charCodeAt_char_code_at_String_target.call(getObject(arg0), arg1);
}

const __wbg_f_codePointAt_code_point_at_String_target = String.prototype.codePointAt;

export function __wbg_f_codePointAt_code_point_at_String(arg0, arg1) {
    return addHeapObject(__wbg_f_codePointAt_code_point_at_String_target.call(getObject(arg0), arg1));
}

const __wbg_f_concat_concat_String_target = String.prototype.concat;

export function __wbg_f_concat_concat_String(arg0, arg1) {
    return addHeapObject(__wbg_f_concat_concat_String_target.call(getObject(arg0), getObject(arg1)));
}

const __wbg_f_includes_includes_String_target = String.prototype.includes;

export function __wbg_f_includes_includes_String(arg0, arg1, arg2) {
    return __wbg_f_includes_includes_String_target.call(getObject(arg0), getObject(arg1), arg2) ? 1 : 0;
}

const __wbg_f_indexOf_index_of_String_target = String.prototype.indexOf;

export function __wbg_f_indexOf_index_of_String(arg0, arg1, arg2) {
    return __wbg_f_indexOf_index_of_String_target.call(getObject(arg0), getObject(arg1), arg2);
}

const __wbg_f_slice_slice_String_target = String.prototype.slice;

export function __wbg_f_slice_slice_String(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_slice_slice_String_target.call(getObject(arg0), arg1, arg2));
}

const __wbg_f_startsWith_starts_with_String_target = String.prototype.startsWith;

export function __wbg_f_startsWith_starts_with_String(arg0, arg1, arg2) {
    return __wbg_f_startsWith_starts_with_String_target.call(getObject(arg0), getObject(arg1), arg2) ? 1 : 0;
}

const __wbg_f_substring_substring_String_target = String.prototype.substring;

export function __wbg_f_substring_substring_String(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_substring_substring_String_target.call(getObject(arg0), arg1, arg2));
}

const __wbg_f_substr_substr_String_target = String.prototype.substr;

export function __wbg_f_substr_substr_String(arg0, arg1, arg2) {
    return addHeapObject(__wbg_f_substr_substr_String_target.call(getObject(arg0), arg1, arg2));
}

const __wbg_f_toLowerCase_to_lower_case_String_target = String.prototype.toLowerCase;

export function __wbg_f_toLowerCase_to_lower_case_String(arg0) {
    return addHeapObject(__wbg_f_toLowerCase_to_lower_case_String_target.call(getObject(arg0)));
}

const __wbg_f_toString_to_string_String_target = String.prototype.toString;

export function __wbg_f_toString_to_string_String(arg0) {
    return addHeapObject(__wbg_f_toString_to_string_String_target.call(getObject(arg0)));
}

const __wbg_f_toUpperCase_to_upper_case_String_target = String.prototype.toUpperCase;

export function __wbg_f_toUpperCase_to_upper_case_String(arg0) {
    return addHeapObject(__wbg_f_toUpperCase_to_upper_case_String_target.call(getObject(arg0)));
}

const __wbg_f_trim_trim_String_target = String.prototype.trim;

export function __wbg_f_trim_trim_String(arg0) {
    return addHeapObject(__wbg_f_trim_trim_String_target.call(getObject(arg0)));
}

const __wbg_f_trimEnd_trim_end_String_target = String.prototype.trimEnd;

export function __wbg_f_trimEnd_trim_end_String(arg0) {
    return addHeapObject(__wbg_f_trimEnd_trim_end_String_target.call(getObject(arg0)));
}

const __wbg_f_trimRight_trim_right_String_target = String.prototype.trimRight;

export function __wbg_f_trimRight_trim_right_String(arg0) {
    return addHeapObject(__wbg_f_trimRight_trim_right_String_target.call(getObject(arg0)));
}

const __wbg_f_trimStart_trim_start_String_target = String.prototype.trimStart;

export function __wbg_f_trimStart_trim_start_String(arg0) {
    return addHeapObject(__wbg_f_trimStart_trim_start_String_target.call(getObject(arg0)));
}

const __wbg_f_trimLeft_trim_left_String_target = String.prototype.trimLeft;

export function __wbg_f_trimLeft_trim_left_String(arg0) {
    return addHeapObject(__wbg_f_trimLeft_trim_left_String_target.call(getObject(arg0)));
}

const __wbg_f_valueOf_value_of_String_target = String.prototype.valueOf;

export function __wbg_f_valueOf_value_of_String(arg0) {
    return addHeapObject(__wbg_f_valueOf_value_of_String_target.call(getObject(arg0)));
}
/**
*/
export class NdArr {
    
    static __construct(ptr) {
        return new NdArr(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_ndarr_free(ptr);
    }
    /**
    */
    static make(arg0) {
        const retptr = globalArgumentPtr();
        try {
            wasm.ndarr_make(retptr, addBorrowedObject(arg0));
            const mem = getUint32Memory();
            const ptr = mem[retptr / 4];
            const len = mem[retptr / 4 + 1];
            const realRet = getStringFromWasm(ptr, len).slice();
            wasm.__wbindgen_free(ptr, len * 1);
            return realRet;
            
            
        } finally {
            stack.pop();
            
        }
        
    }
    /**
    */
    show() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        const retptr = globalArgumentPtr();
        wasm.ndarr_show(retptr, this.ptr);
        const mem = getUint32Memory();
        const ptr = mem[retptr / 4];
        const len = mem[retptr / 4 + 1];
        const realRet = getStringFromWasm(ptr, len).slice();
        wasm.__wbindgen_free(ptr, len * 1);
        return realRet;
        
    }
    /**
    */
    fill_f32(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.ndarr_fill_f32(this.ptr, arg0);
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
    */
    static from_arg(arg0) {
        try {
            return Nd.__construct(wasm.nd_from_arg(addBorrowedObject(arg0)));
            
        } finally {
            stack.pop();
            
        }
        
    }
    /**
    */
    static make(arg0) {
        try {
            return Nd.__construct(wasm.nd_make(addBorrowedObject(arg0)));
            
        } finally {
            stack.pop();
            
        }
        
    }
    /**
    */
    add(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return Nd.__construct(wasm.nd_add(this.ptr, arg0.ptr));
    }
    /**
    */
    dot(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return Nd.__construct(wasm.nd_dot(this.ptr, arg0.ptr));
    }
    /**
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

export function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1) return addHeapObject(getObject(idx));
    
    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

export function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

export function __wbindgen_number_new(i) {
    return addHeapObject(i);
}

export function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number') return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

export function __wbindgen_is_null(idx) {
    return getObject(idx) === null ? 1 : 0;
}

export function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
}

export function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    if (typeof(v) === 'boolean') {
        return v ? 1 : 0;
    } else {
        return 2;
    }
}

export function __wbindgen_symbol_new(ptr, len) {
    let a;
    if (ptr === 0) {
        a = Symbol();
    } else {
        a = Symbol(getStringFromWasm(ptr, len));
    }
    return addHeapObject(a);
}

export function __wbindgen_is_symbol(i) {
    return typeof(getObject(i)) === 'symbol' ? 1 : 0;
}

export function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string') return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
}

export function __wbindgen_jsval_eq(a, b) {
    return getObject(a) === getObject(b) ? 1 : 0;
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}
