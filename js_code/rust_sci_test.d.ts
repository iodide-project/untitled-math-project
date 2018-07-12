/* tslint:disable */
export function get_array_rep(): string;

export function make_array(): NdArr;

export class Nd {
constructor(...args: any[]);
free(): void;
static  make(arg0: any): Nd;

 add(arg0: Nd): Nd;

 dot(arg0: Nd): Nd;

 op(arg0: string, arg1: Nd): Nd;

 show(): string;

}
export class NdArr {
free(): void;
static  make(arg0: any): string;

 show(): string;

 fill_f32(arg0: number): void;

}
