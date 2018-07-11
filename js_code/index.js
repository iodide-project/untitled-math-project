//import {NdRange} from "./rust_sci_test"


const ndarray = import("./rust_sci_test")

ndarray.then(module => {
    //let ar = module.NdRange.make(20)
    //console.log(ar.fill_f32(5))
    //console.log(ar.show())
    let ar2 = new module.Nd([0,1])
    console.log(ar2.show())
    let ar3 = new module.Nd([0,6,3])
    console.log(ar3.show())
    console.log(new module.Nd([0,6]).show())
    let creationTimer = (arr) => {
        console.log(`timing input: ${arr}`)
        let t1 = performance.now()
        new module.Nd(arr)
        let t2 = performance.now()
        console.log(`time took is ${t2-t1} in ms`)
    }
    let test_arrays =[[0,16,16,16],
        [0,64,64,64],
        [0,512,512,4],
        [0,512,4,512],
        [0,4,512,512],
    ]
    for (test_arr of test_arrays) {
        creationTimer(test_arr)
    }
    let a1 =new module.Nd( [Math.random(),5,5])
    let a2 =new module.Nd( [Math.random(),5,5])
    console.log(`adding \n ${a1.show()} \nplus  ${a2.show()} \n= ${a1.add(a2).show() }`)
    console.log(`subtracting \n ${a1.show()} \nminus  ${a2.show()} \n= ${a1.op("-",a2).show() }`)
    console.log(`multiplying \n ${a1.show()} \ndot prod(mtxmult)  ${a2.show()} \n= ${a1.op("*",a2).show() }`)
    let a3 = new module.Nd([Math.random(),2,3])
    let a4 = new module.Nd([5,1,3])
    console.log(`broadcast result of adding \n${a4.show()} to \n${a3.show()} is \n${a3.op("+",a4).show()}`)
    console.log(`broadcast result of subtracting \n${a4.show()} from \n${a3.show()} is \n${a3.op("-",a4).show()}`)
    console.log(`broadcast result of elementwise_multiplying \n${a3.show()} and \n${a4.show()} is \n${a3.op("*",a4).show()}`)
}
)

