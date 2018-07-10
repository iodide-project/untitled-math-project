//import {NdRange} from "./rust_sci_test"


const ndarray = import("./rust_sci_test")

ndarray.then(module => {
    //let ar = module.NdRange.make(20)
    //console.log(ar.fill_f32(5))
    //console.log(ar.show())
    //let ar2 = module.Nd.make([0,1])
    //console.log(ar2.show())
    //let ar3 = module.Nd.make([0,6,3])
    //console.log(ar2.show())
    //console.log(module.Nd.make([0,6]))
    console.log(module.Nd.make([0,6,3]))
    console.log(module.Nd.make([0,6,9]))
}
)
