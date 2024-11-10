import React from "react"

const TitleComponent = React.memo(function TitleComponent()
{
    return(
        <>
                <h1 className="text-2xl font-semibold mb-2 ">Crea una orden</h1>
                <p className="text-gray-600 mb-8 ">
                    Dale una ventaja competitiva a tu negocio con entregas el mismo día (Área Metropolitana) y el día siguiente a nivel nacional.
                </p>
        </>
    )
})

export default TitleComponent