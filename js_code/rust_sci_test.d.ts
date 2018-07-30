/* tslint:disable */
export class Nd {
constructor(...args: any[]);
free(): void;
static  from_arg(arg0: string): Nd;

static  from_ab(arg0: any, arg1: any): Nd;

static  make(arg0: any): Nd;

 add(arg0: Nd): Nd;

 dot(arg0: Nd): Nd;

 op(arg0: string, arg1: Nd): Nd;

 get(arg0: any): number;

 set(arg0: any, arg1: number): void;

 show(): string;

}
