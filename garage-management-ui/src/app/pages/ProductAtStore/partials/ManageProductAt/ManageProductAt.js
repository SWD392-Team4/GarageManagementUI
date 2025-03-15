import React, { useState } from 'react';
import ListProductAtGarage from './ListProductAtGarage';
import SelectGaragePartial from './SelectGaragePartial';

export default function ManageProductAt() {
    const [selectedGarageId, setSelectedGarageId] = useState(null);

    console.log("Check id :", selectedGarageId);

    return (
        <>
            <SelectGaragePartial
                selectedGarageId={selectedGarageId}
                onSelecteGarage={setSelectedGarageId}
            />
            {selectedGarageId && <ListProductAtGarage garageId={selectedGarageId} />}
        </>
    )
}
