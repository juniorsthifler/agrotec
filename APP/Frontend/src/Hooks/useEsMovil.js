//Creando nuestro ptopio Hoock
import { useState, useEffect } from 'react';

export default function useEsMovil() {
    const [esMovilo, setEsMovil] = useState(null);
    //
    useEffect(() => {
        const mql = window.matchMedia('(min-width: 576px)');
        mql.addListener(revisarSiEsmovil);
        function revisarSiEsmovil() {
            if (mql.matches) {
                setEsMovil(false);
            } else {
                setEsMovil(true);
            }
        }
        revisarSiEsmovil();

        return () => mql.removeListener(revisarSiEsmovil);
    }, []);

    return esMovilo;
}