import { somar } from "../test/somar";

test('sera um teste:', () => {

    const resultado = somar(3,2);

    expect(resultado).toEqual(5); 

   

});